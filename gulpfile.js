const gulp =  require('gulp');
const concat = require('gulp-concat');
const webserver = require('gulp-webserver');
const mock = require('mockjs');
const path = require('path');
const fs = require('fs');
//mock数据
function getMock (res) {
    var arr = [];
    for(var i=1;i<=8;i++) {
        var foo = mock.mock({
            'name': "@Cname",
            "title": "@title",
            "img":"./Content/images/img1.jpg"
        })
        arr.push(foo);
    }
    res.end(JSON.stringify(arr));
}
//普通数据
function index (res, file) {
    fs.exists(file, function (exit) {
        if (!exit) {
            return;
        }
        fs.readFile(file, function (err, data) {
            if (err) {
                res.end('error');
            } else {
                res.end(data);
            }
        });
    });
}
gulp.task('web', function () {
    gulp.src('.')
        .pipe(webserver({
            host: 'localhost',
            port: 8080,
            fallback: 'index.html'
        }))
});
gulp.task('server', function () {
    gulp.src('.')
        .pipe(webserver({
            host: 'localhost',
            port: 8008,
            fallback: 'index.html',
            livereload:true,
            middleware: function (req, res, next) {
                var pathname = req.url.split('/')[1];
                var file = path.join(process.cwd(), 'Data', pathname + '.json');
                res.writeHead(200, {
                    'Content-Type': "text/json;charset=utf8",
                    "Access-Control-Allow-Origin": "*"
                })
                switch(pathname) {
                    case 'mock' :
                        getMock (res);
                        break;
                    case 'index':
                        index(res, file);
                        break;
                }
            }
        }))
});
gulp.task('default', function () {
    gulp.start(['web', 'server']);
});