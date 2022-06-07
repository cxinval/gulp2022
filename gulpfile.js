const{watch, series, parallel} = require('gulp');
const browserSync = require('browser-sync').create();


// Конфигурация

const path = require('./config/path.js')
const app = require('./config/app.js')

// Задачи

const clear = require('./task/clear.js')
const pug = require('./task/pug.js')
const sass = require('./task/sass.js')
const js = require('./task/js.js')
const img = require('./task/img.js')
const font = require('./task/font.js')


// Сервер
const server = () => {
    browserSync.init({
        server: {
            baseDir: path.root
        }
    })
}

// Наблюдатель

const watcher = () => {
    watch(path.pug.watch, pug).on('all', browserSync.reload);
    watch(path.sass.watch, sass).on('all', browserSync.reload);
    watch(path.js.watch, js).on('all', browserSync.reload);
    watch(path.img.watch, img).on('all', browserSync.reload);
    watch(path.font.watch, font).on('all', browserSync.reload);
}

const build = series(
    clear,
    parallel(pug,sass,js,img,font)
)

const dev = series(
    build,
    parallel(watcher, server) 
);


exports.pug = pug;
exports.sass = sass;
exports.js = js;
exports.img = img;
exports.font = font;
// exports.watch = watcher;
// exports.clear =clear;

exports.default = app.isProd
    ? build
    : dev;
// exports.dev = dev;
// exports.build = build;


