const{src, dest} = require('gulp');

// Конфигурация

const path = require('../config/path.js')
const app = require('../config/app.js')

// Плыгины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso')
const rename = require('gulp-rename');
const size = require('gulp-size');
const shorthand = require('gulp-shorthand');
const groupCssMedia = require('gulp-group-css-media-queries');
const gSass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const webpCss = require('gulp-webp-css');






// Обработка css
const sass = () => {
    return src(path.sass.src, {sourcemaps: app.isDev})
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: "sass",
            message: error.message
        }))
    }))
    .pipe(sassGlob())
    .pipe(gSass())
    .pipe(webpCss())
    .pipe(autoprefixer())
    .pipe(shorthand()) 
    .pipe(groupCssMedia())
    .pipe(size({title:"main.css"}))
    .pipe(dest(path.sass.dest, {sourcemaps: app.isDev}))
    .pipe(rename({ suffix: '.min'}))
    .pipe(csso())
    .pipe(size({title:"main.min.css"}))
    .pipe(dest(path.sass.dest, {sourcemaps: app.isDev}))
    
}

module.exports = sass