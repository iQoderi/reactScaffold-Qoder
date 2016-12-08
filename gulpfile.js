/**
 * Created by qoder on 16-12-9.
 */
'use strict';

const gulp = require('gulp');
const qiniu = require('gulp-qiniu');
const sftp = require('gulp-sftp');
const gzip = require('gulp-gzip');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const runSequence = require('run-sequence');
const inject = require('gulp-inject');
const open = require('open');


const config = {
    qiniu: {
        ak: process.env.QINIUAK || "[YOURQINIUAK]",
        sk: process.env.QINIUSK || "[YOURQINIUSK]",
        bucket: '[YOURQINIUBUCKET]',
        url: '[YOURQINIUURL]',
        dir: '[YOUQINIIUDIR]'
    }
};

const basePaths = {
    'src': 'src',
    'dist': 'dist'
};

const remoteServer = {
    host: '[HOST]',
    port: 22,
    user: process.env.RSUSER || "[USER]",
    pass: process.env.RSPWD || "[USER]",
    remoteDir: '[REMOTEDIR]',
};

const path = {
    image: './src/images/*',
    minifyImage: './src/images/minify',
    spriteImage: './src/images/sprites',
    spriteCss: './src/style/sprite',
    packageJson: './package.json',
    pm2process: './process.json',
    server: './app.server.js',
    setUp: './setup.js',
};


const distFile = {
    assets: './dist/assets/',
    static: './dist/assets/*.*',
    html: './dist/views/index.html',
    js: './dist/assets/*.js',
    dist: './dist/*',
    views: './dist/views/*',
    serverRenderImg: './dist/images/*'
};


var ftpOption = {
    host: remoteServer.host,
    user: remoteServer.user,
    pass: remoteServer.pass,
    port: remoteServer.port,
    remotePath: remoteServer.remoteDir
};


//插入标签到html
gulp.task('inject', ()=> {
    const sources = gulp.src([distFile.assets + 'vendor.*.js', distFile.assets + 'app.*.js', distFile.assets + 'style.*.css']);
    return gulp.src(distFile.html)
        .pipe(inject(sources, {
            transform: (filepath)=> {
                if (filepath.slice(-4) === '.css') {
                    return `<link rel="stylesheet" href='${config.qiniu.url}${config.qiniu.dir}${filepath.split('/')[filepath.split('/').length - 1]}'/>`
                }
                if (filepath.slice(-3) === '.js') {
                    return `<script src='${config.qiniu.url}${config.qiniu.dir}${filepath.split('/')[filepath.split('/').length - 1]}'></script>`
                }
            }
        }))
        .pipe(gulp.dest(basePaths.dist + '/views'));
});


//上传静态文件到七牛
gulp.task('uploadStatic', ()=> {
    return gulp.src([distFile.static])
        .pipe(qiniu({
            accessKey: config.qiniu.ak,
            secretKey: config.qiniu.sk,
            bucket: config.qiniu.bucket,
            private: false
        }, {
            dir: config.qiniu.dir
        }))
});


//上传html
gulp.task('uploadHtml', ['inject'], ()=> {
    return gulp.src(distFile.html, {
        buffer: false
    })
        .pipe(sftp(ftpOption))
});


//上传配置文件
gulp.task('upJson', ()=> {
    return gulp.src([path.pm2process], {
        buffer: false
    })
        .pipe(sftp(ftpOption))
});

//上传打包文件
gulp.task('upDist', ()=> {
    var ftpDistFile = JSON.parse(JSON.stringify(ftpOption));
    ftpDistFile.remotePath = ftpDistFile.remotePath + '/dist';
    return gulp.src(distFile.dist, {
        buffer: false
    })
        .pipe(sftp(ftpDistFile))
});


//上传服务端文件
gulp.task('upServerFile', ()=> {
    return gulp.src([path.server, path.setUp], {
        buffer: false
    })
        .pipe(sftp(ftpOption))
});

//上传views
gulp.task('upViews', ['inject'], ()=> {
    const viewsFtpOptions = JSON.parse(JSON.stringify(ftpOption));
    viewsFtpOptions.remotePath = viewsFtpOptions.remotePath + '/dist/views';
    return gulp.src(distFile.views)
        .pipe(sftp(viewsFtpOptions));
});

//上传前端文件
gulp.task('uploadFe', ()=> {
    runSequence(
        'upViews',
        ['upDist']
    )
});

//上传服务端渲染文件
gulp.task('uploadBe', ()=> {
    runSequence(
        'upServerFile'
    )
});


//上传
gulp.task('upload', function (callback) {
    runSequence(
        'uploadHtml',
        ['uploadStatic'],
        callback)
});


//压缩图片
gulp.task('minifyImage', ()=> {
    return gulp.src(path.image)
        .pipe(imagemin())
        .pipe(gulp.dest(path.minifyImage))
});


gulp.task('default', ()=> {

});
