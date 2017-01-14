// main dependencies
var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util');

// styling dependencies
var sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename');

// code dependencies
var browserify = require('browserify'),
    babelify = require('babelify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream');

// docker
var Docker = require('dockerode'),
    spawn = require('child_process').spawn;

// check if set to build for production
var production = process.env.NODE_ENV === 'production';

// Webbhook operation
var request = require('request'),
    moment = require('moment');

// compile sass files
gulp.task('styles', function() {
    return gulp.src('frontend/app/stylesheets/*.sass')
        .pipe(plumber())
        .pipe(sass())
        // .pipe(gulpif(production, cssmin()))
        // .pipe(gulpif(production, rename({'suffix': '.min'})))
        .pipe(gulp.dest('public/css'));
});

// watch and recompile styles on the fly
gulp.task('styles-watch', function() {
    gulp.watch('frontend/app/stylesheets/**/*.sass', ['styles']);
});

/**
 * 3rd party libraries used on front-end
 * We compile them separately to skip babelify process
 */

var dependencies = [
    'alt',
    'react',
    'react-dom',
    'react-router',
    'underscore',
];

/**
 * Gather all the dependencies into one vendor file
 * - get all the dependencies
 * - pack them into one file
 * - convert browserify text stream to vinyl for gulp to pipe them further
 * - OPTIONAL: add uglify for prod
 * - move to public
 */
gulp.task('browserify-vendor', function() {
    return browserify()
        .require(dependencies)
        .bundle()
        .pipe(source('vendor.bundle.js'))
        .pipe(gulp.dest('public/js'));
});

/**
 * Babelify and concat the source code of our React app
 * - mark dependencies to be an extarnal file (skip them)
 * - transform the rest with babelify
 * - pack them into one file
 * - convert browserify text stream to vinyl for gulp to pipe them further
 * - OPTIONAL: add uglify for prod
 * - move to public
 */
gulp.task('browserify', ['browserify-vendor'], function() {
    return browserify('frontend/app/main.js')
        .external(dependencies)
        .transform(babelify, {'presets': ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('public/js'));
});

/**
 * Babelify and concat the source code of our React app while watching for changes
 */
gulp.task('browserify-watch', ['browserify-vendor'], function() {
    // build a bundler to run our task continiously with watchify
    var bundler = watchify(browserify('frontend/app/main.js', watchify.args));
    bundler.external(dependencies);
    bundler.transform(babelify, {'presets': ['es2015', 'react']});
    bundler.on('update', rebundle);
    return rebundle();

    function rebundle() {
        var start = Date.now();
        return bundler.bundle()
            .on('error', function(err) {
                gutil.log(gutil.colors.red(err.toString()));
            })
            .on('end', function() {
                gutil.log(gutil.colors.green('Finished rebuilding in', (Date.now() - start + 'ms.')));
            })
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('public/js'))
    }
});

// configure default tasks
gulp.task('default', ['styles', 'browserify-watch', 'styles-watch']);
gulp.task('build', ['styles', 'browserify'], function() {
    gulp.src('public/js/bundle.js');
});

// simple service function
function execCommand(command, args, cb) {
    var ctx = spawn(command, args);
    ctx.stdout.on('data', function(data) {
        process.stdout.write(data);
    });
    ctx.stderr.on('data', function(data) {
        process.stderr.write(data);
    });
    ctx.on('close', function(code) {
        if(cb){cb(code === 0 ? null : code);}
    })
}

var options = {
    'method': 'POST',
    'uri': process.env.gulpDiscordHook,
    'headers': {
        'Content-Type': 'application/json'
    },
    'body': {
        'username': 'Gulp',
        'avatar_url': 'http://i.imgur.com/58BHyM5.jpg',
        'embeds': [
            {
                'title': 'Red-Portal docker build started',
                'color': 4839423,
                'footer': {
                    'text': ''
                }
            }
        ]
    },
    'json': true
};

// Docker build
var docker = new Docker(),
    imageName = 'orels1/red-portal',
    containerName = 'red-portal';

gulp.task('docker-build', function(cb) {
    execCommand('docker', ['build', '-t', imageName, '.'], cb);
});

gulp.task('docker-push', function(cb) {
    execCommand('docker', ['push', imageName], cb);
});

gulp.task('kubernetes-update', function(cb) {
    execCommand('kubectl', ['rolling-update', containerName, '--image=' + imageName, '--image-pull-policy=Always'], cb);
});

gulp.task('kubernetes-proxy', function(cb) {
    execCommand('kubectl', ['proxy'], cb);
});

gulp.task('deploy', ['build'], function(cb) {
    // send to webhook
    var t1 = Date.now(),
        t0 = moment();
    options.body.embeds[0].footer.text = t0.format('[At] HH:mm:ss');
    request(options, function(err, resp) {
        if (err) console.log(err);
    });

    execCommand('docker', ['build', '-t', imageName, '.'], function() {
        // send to webhook
        var t2 = Date.now();
        options.body.embeds[0].title = 'Red-Portal docker build finished';
        options.body.embeds[0].color = 9240393;
        options.body.embeds[0].footer.text = 'After ' + moment.duration(t2-t1).humanize();
        request(options, function(err, resp) {
            if (err) console.log(err);
        });

        // send to webhook
        t1 = Date.now();
        t0 = moment();
        options.body.embeds[0].title = 'Red-Portal deploy started';
        options.body.embeds[0].color = 4839423;
        options.body.embeds[0].footer.text = t0.format('[At] HH:mm:ss');
        request(options, function(err, resp) {
            if (err) console.log(err);
        });
        execCommand('docker', ['push', imageName], function() {
            execCommand('kubectl', ['rolling-update', containerName, '--image=' + imageName, '--image-pull-policy=Always'], function(){
                // send to webhook
                var t2 = Date.now();
                options.body.embeds[0].title = 'Red-Portal deployed';
                options.body.embeds[0].url = 'https://cogs.red';
                options.body.embeds[0].description = 'Changes are live now';
                options.body.embeds[0].color = 9240393;
                options.body.embeds[0].footer.text = 'After ' + moment.duration(t2-t1).humanize();
                request(options, function(err, resp) {
                    if (err) console.log(err);
                });

                cb();
            });
        });
    });
});

