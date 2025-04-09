const gulp = require(`gulp`);
const eslint = require(`gulp-eslint`);
const stylelint = require(`gulp-stylelint`);
const babel = require(`gulp-babel`);
const browserSync = require(`browser-sync`).create();
const postcss = require(`gulp-postcss`);
const cssnano = require(`cssnano`);
const uglify = require(`gulp-uglify`);
const { src, dest, parallel, series } = require(`gulp`);

function lintCSS() {
    return src(`styles/*.css`).pipe(
        stylelint({
            configFile: `.stylelintrc.json`,
            reporters: [{ formatter: `string`, console: true }],
        })
    );
}

function lintJS() {
    return src(`scripts/*.js`)
        .pipe(eslint({ useEslintrc: true }))
        .pipe(eslint.format());
}

function transpileJS() {
    return src(`scripts/main.js`)
        .pipe(babel({ presets: [`@babel/preset-env`] }))
        .pipe(dest(`dist/`));
}

function serve() {
    browserSync.init({ server: `./` });
    gulp.watch(`styles/*.css`, gulp.series(lintCSS, reload));
    gulp.watch(`scripts/*.js`, gulp.series(lintJS, transpileJS, reload));
}

function reload(done) {
    browserSync.reload();
    done();
}

function buildCSS() {
    return src(`styles/main.css`)
        .pipe(postcss([cssnano()]))
        .pipe(dest(`prod/styles`));
}

function buildJS() {
    return src(`scripts/main.js`)
        .pipe(babel({ presets: [`@babel/preset-env`] }))
        .pipe(uglify())
        .pipe(dest(`prod/scripts`));
}

function copyHTML() {
    return src(`index.html`).pipe(dest(`prod`));
}

exports.default = series(parallel(lintCSS, lintJS), transpileJS, serve);
exports.build = series(parallel(buildCSS, buildJS), copyHTML);
