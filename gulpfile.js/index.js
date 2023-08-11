const { src, dest, watch, series, parallel } = require("gulp");
const $ = require("gulp-load-plugins")({ lazy: false });
const browserSync = require("browser-sync").create();
const { envOptions } = require("./envOptions");
const sass = require("gulp-sass")(require("sass"));

function copyFile() {
  return src(envOptions.copyFile.src)
    .pipe(dest(envOptions.copyFile.path))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
}

function layoutHTML() {
  return src(envOptions.html.src)
    .pipe($.plumber())
    .pipe($.frontMatter())
    .pipe(
      $.layout((file) => {
        return file.frontMatter;
      })
    )
    .pipe(dest(envOptions.html.path))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
}
function buildStyles() {
  const postcss = require("gulp-postcss");
  return src(envOptions.style.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss())
    .pipe(dest(envOptions.style.path))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
}

function babel() {
  return src(envOptions.javascript.src)
    .pipe(
      $.babel({
        presets: ["@babel/env"],
      })
    )
    .pipe($.concat(envOptions.javascript.concat))
    .pipe(dest(envOptions.javascript.path))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
}

// function vendorsJs() {
//   return src(envOptions.vendors.src)
//     .pipe($.concat(envOptions.vendors.concat))
//     .pipe(dest(envOptions.vendors.path));
// }

function browser() {
  browserSync.init({
    server: {
      baseDir: envOptions.browserDir,
    },
    port: 8080,
  });
}

function clean() {
  return src(envOptions.clean.src, {
    read: false,
    allowEmpty: true,
  }).pipe($.clean());
}

function deploy() {
  return src(envOptions.deploySrc).pipe($.ghPages());
}

function watchTasks() {
  watch(envOptions.html.src, series(layoutHTML, buildStyles));
  watch(envOptions.html.ejsSrc, series(layoutHTML, buildStyles));
  watch(envOptions.javascript.src, series(babel));
  watch(envOptions.img.src, series(copyFile));
  watch(envOptions.style.src, series(buildStyles));
}

exports.deploy = deploy;

exports.clean = clean;

exports.build = series(
  clean,
  copyFile,
  layoutHTML,
  buildStyles,
  babel,
  // vendorsJs
);
exports.default = series(
  clean,
  copyFile,
  layoutHTML,
  buildStyles,
  babel,
  // vendorsJs,
  parallel(browser, watchTasks)
);
