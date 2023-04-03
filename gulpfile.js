import gulp from "gulp";
import browsersync from "browser-sync";
import del from "del";
import concat from "gulp-concat";
import autoprefixer from "gulp-autoprefixer";
import fileinclude from "gulp-file-include";
import group_media from "gulp-group-css-media-queries";
import htmlmin from "gulp-htmlmin";
import rename from "gulp-rename";
import uglify from "gulp-uglify";
import dartSass from "sass";
import gulpSass from "gulp-sass";

const { src, dest, watch, series, parallel } = gulp;
const sass = gulpSass(dartSass);

const project_folder = "dist";
const source_folder = "src";

const path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/",
  },
  src: {
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    css: source_folder + "/scss/style.scss",
    js: source_folder + "/js/script.js",
    img: source_folder + "/img/**/*",
    fonts: source_folder + "/fonts/**/*",
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.*",
    fonts: source_folder + "/fonts/**/*",
  },
};

export const deleteDist = () => del(project_folder);

export const html = () =>
  src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());

export const css = () =>
  src(path.src.css)
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(group_media())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true,
      })
    )
    .pipe(dest(path.build.css))
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());

export const js = () =>
  src("src/js/*.js")
    .pipe(concat("script.js"))
    .pipe(dest(path.build.js))
    .pipe(fileinclude())
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());

export const img = () =>
  src(path.src.img).pipe(dest(path.build.img)).pipe(browsersync.stream());

export const fonts = () =>
  src(path.src.fonts).pipe(dest(path.build.fonts)).pipe(browsersync.stream());

export const watchFiles = () => {
  watch([path.watch.html], build, html);
  watch([path.watch.css], build, css);
  watch([path.watch.js], build, js);
  watch([path.watch.img], build, img);
  watch([path.watch.fonts], build, fonts);
};

export const sync = () =>
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/",
    },
    port: 3000,
    notify: false,
  });

const build = series(deleteDist, parallel(html, css, js, img, fonts));

export default series(build, parallel(watchFiles, sync));
