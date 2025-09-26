import gulp from 'gulp';
import plumber from 'gulp-plumber';
import * as sass from 'sass';
import gulpSass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import postCss from 'gulp-postcss';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import fileInclude from 'gulp-file-include';
import cssnano from 'cssnano';
import cached from 'gulp-cached';
import { deleteSync } from 'del';
import uglify from 'gulp-uglify';
import cleanCss from 'gulp-clean-css';
import babel from 'gulp-babel';

const sassCompiler = gulpSass(sass);
const server = browserSync.create();

const paths = {
  includeHtml: 'src/html/include/**/*.html',
  html: 'src/html/**/*.html',
  scss: 'src/assets/css',
  js: 'src/assets/js/**/*.js',
  vendorJs: 'src/assets/js/vendor/**/*',
  images: 'src/assets/images/**/*',
  dist: 'dist',
  distCss: 'dist/assets/css',
  distJs: 'dist/assets/js',
  distVendorJs: 'dist/assets/js/vendor',
  distImages: 'dist/assets/images',
  fonts: 'src/assets/font/**/*',  // 폰트 경로 추가
  distFonts: 'dist/assets/font',  // 폰트가 복사될 경로 추가
};

// Clean task
function clean() {
  return new Promise((resolve) => {
    deleteSync([paths.dist]);
    resolve();
  });
}

// HTML task
function html() {
  return gulp.src([paths.html, `!${paths.includeHtml}`])
    .pipe(plumber())
    .pipe(fileInclude({ 
      prefix: '@@', 
      basepath: '@file'
    })) 
    .pipe(cached('html'))
    .pipe(gulp.dest(paths.dist))
    .pipe(server.stream());
}

// SCSS task
function styles() {
  return gulp.src(`${paths.scss}/index.scss`, { allowEmpty: true })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(postCss([autoprefixer()]))  // cssnano() 제거
    .pipe(rename('styles.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.distCss))
    .pipe(server.stream());
}

// Minified CSS task
function minifyStyles() {
  return gulp.src(`${paths.scss}/index.scss`, { allowEmpty: true })  // 경로 변경
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(postCss([autoprefixer(), cssnano()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.distCss))
    .pipe(server.stream());
}


// CSS Reset task
function cssReset() {
  return gulp.src(`${paths.scss}/reset.scss`, { allowEmpty: true })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(postCss([autoprefixer(), cssnano()]))
    .pipe(rename('reset.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.distCss));
}

// Minified CSS Reset task
function minifyCssReset() {
  return gulp.src(`${paths.scss}/reset.scss`, { allowEmpty: true })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(postCss([autoprefixer(), cssnano()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.distCss))
    .pipe(server.stream());
}


// JavaScript task
function scripts() {
  return gulp.src([paths.js, `!${paths.vendorJs}`])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['@babel/preset-env'] })) // babel 설정 추가
    .pipe(concat('all.js'))
    .pipe(gulp.dest(paths.distJs))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.distJs))
    .pipe(server.stream());
}

// Fonts task
function fonts() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.distFonts));
}


// Vendor JavaScript task
function vendors() {
  return gulp.src(paths.vendorJs)
    .pipe(gulp.dest(paths.distVendorJs));
}

// Images task
function images() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.distImages));
}

// BrowserSync task
function serve(done) {
  server.init({
    server: {
      baseDir: paths.dist
    }
  });

  gulp.watch(paths.html, gulp.series(html, (done) => { server.reload(); done(); }));
  gulp.watch(`${paths.scss}/**/*.scss`, gulp.series(styles, minifyStyles));
  gulp.watch(paths.js, gulp.series(scripts, (done) => { server.reload(); done(); })); // scripts 함수 변경
  //gulp.watch(paths.vendorJs, gulp.series(vendors, (done) => { server.reload(); done(); })); // vendors 함수 변경
  gulp.watch(paths.images, gulp.series(images, (done) => { server.reload(); done(); })); // images 함수 변경
  done();
}

// Initial build task
const initialBuild = gulp.series(cssReset, minifyCssReset);

// Build task
//const build = gulp.series(clean, initialBuild, gulp.parallel(html, gulp.series(styles, minifyStyles), vendors, scripts, images));

const build = gulp.series(clean, initialBuild, gulp.parallel(html, gulp.series(styles, minifyStyles), vendors, scripts, images, fonts)); // fonts 추가

// Default task
export default gulp.series(build, serve);




export { clean };
