var gulp     = require('gulp'),
sourcemaps   = require('gulp-sourcemaps'),
sass         = require('gulp-sass'),
watch        = require('gulp-watch'),
livereload   = require('gulp-livereload'),
concat       = require('gulp-concat'),
uglify       = require('gulp-uglify'),
injectReload = require('gulp-inject-reload'),
// minify       = require('gulp-minify-css'),
utils        = require('gulp-util'),
del          = require('del'),
path         = require('path'),
gulpif       = require('gulp-if'),
merge        = require('merge-stream'),
coffee       =   require('gulp-coffee');


var config = {
    dev: true,
    livereloadPort: 35730,      //needs to match the port in base.html.twig
}

var paths = {
    bundleResources: './src/ContentBundle/Resources',
    destination: './web/dist',
    vendor: './src/ContentBundle/Resources/vendor',
    assets_dest: '../../assets',
    assets_src: 'assets'
}

gulp.task('bootcardsStyles', function () {
    return gulp.src([
        'bower_components/bootcards/dist/css/bootcards-android.css',
        'bower_components/bootcards/dist/css/bootcards-desktop.css',
        'bower_components/bootcards/dist/css/bootcards-ios.css'
    ])
    .pipe(concat('bootcards.css'))
    // .pipe((config.dev)?  utils.noop() : minify())
    .pipe(gulp.dest(paths.destination + '/css'))
    .pipe(livereload());
})

gulp.task('styles', function () {
    var cssStream = gulp.src([
        // 'bower_components/bootcards/dist/css/bootcards-android.css',
        // 'bower_components/bootcards/dist/css/bootcards-desktop.css',
        // 'bower_components/bootcards/dist/css/bootcards-ios.css',
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/font-awesome/css/font-awesome.css',
        'bower_components/smartmenus/dist/addons/jquery.smartmenus.bootstrap.css',                      //v16 dropdowns
        paths.vendor + '/**/**/*.css'

        ])
        .pipe(concat('css-files.css'));


    var sassStream = gulp.src(paths.bundleResources + '/sass/*.sass')
        .pipe(sass().on('error', sass.logError))

    merge(cssStream, sassStream)
            .pipe(concat('app.css'))
            // .pipe((config.dev)?  utils.noop() : minify())
            .pipe(gulp.dest(paths.destination + '/css'))
            .pipe(livereload());

    return gulp.src(paths.bundleResources + '/sass/overrides.sass')
            .pipe(sass())    
            .on('error', function (err) { console.log(err.message); })
            // .pipe((config.dev)?  utils.noop() : minify())
            .pipe(gulp.dest(paths.destination + '/css'))
            .pipe(livereload());

});


gulp.task('scripts', function() {

    return gulp.src([
        'bower_components/jquery/dist/jquery.js',               //all versions
        'bower_components/bootstrap/dist/js/bootstrap.js',      //all versions
        'bower_components/modernizer/modernizr.js',             //all versions
        'bower_components/holderjs/holder.js',                      //v1, v2, v3
        'bower_components/jquery-hoverintent/jquery.hoverIntent.js',                      //v3 (dropdown navs)
        'bower_components/jquery-ui/jquery-ui.js',                      //v3 (dropdown navs)
        'bower_components/fastclick/lib/fastclick.js',                      //v10 faculty (requried by bootcards)
        'bower_components/bootcards/dist/js/bootcards.js',                      //v10 faculty
        'bower_components/smartmenus/dist/jquery.smartmenus.js',                      //v16 dropdowns
        'bower_components/smartmenus/dist/addons/bootstrap/jquery.smartmenus.bootstrap.js',                      //v16 dropdowns
        paths.vendor + '/**/**/**/*.js',
        paths.bundleResources + '/coffee/**/*.coffee'  
    	])
        .pipe(gulpif(/[.]coffee$/, coffee({bare: true}).on('error', utils.log)))
        .pipe(concat('app.js'))
        .pipe((config.dev)?  utils.noop() : uglify())
        .pipe(gulp.dest(paths.destination + '/js'))
        .pipe(livereload());;
});


gulp.task('pages', function(){
    return gulp.src([
        paths.bundleResources + '/views/**/*.twig',
        paths.bundleResources + '../Content/**/*.md'
        ])
        .pipe(livereload());
});
gulp.task('fonts', function(){
    return gulp.src([
            'bower_components/font-awesome/fonts/**/*',
            paths.vendor + '/**/fonts/**/*',
            paths.assets_src  + '/fonts/**/*'
        ])
        .pipe(gulp.dest(paths.assets_dest + '/fonts'))
        .pipe(livereload());
});
gulp.task('img', function(){
    return gulp.src([
            paths.assets_src + '/img/**/*' 
        ], {base: paths.assets_src + '/img'})
        .pipe(gulp.dest(paths.assets_dest + '/img'))
        .pipe(livereload());
});


gulp.task('watch', function(){
    config.dev = true;
    livereload.listen({
        port: config.livereloadPort,
    });
    gulp.watch(paths.bundleResources + '/sass/**/*.sass', ['styles']);
    gulp.watch([
        paths.bundleResources + '/js/*.js',
        paths.bundleResources + '/vendor/**/*.js', 
        paths.bundleResources + '/coffee/**/*.coffee'], ['scripts'])
    gulp.watch([
        paths.bundleResources + '/views/**/*.twig',
        './src/ContentBundle/Content/**/*.*'
        ], ['pages']);
    gulp.watch([paths.assets_src + '/img/**/*'], ['img']);
 

});

gulp.task('dev',function(){
	config.dev = true;
	gulp.start(['styles', 'bootcardsStyles', 'scripts','img','fonts'])
})

gulp.task('prod',function(){
	config.dev = false;
	gulp.start(['styles', 'bootcardsStyles', 'scripts','img','fonts'])
})

gulp.task('default', function() {
  gulp.start('prod');
});

gulp.task('build', function() {
  gulp.start('prod');
});
