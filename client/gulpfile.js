// Los packages que vamos a usar
var gulp  = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	cssnano = require('gulp-cssnano'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	bower = require('gulp-bower'),
	browserSync = require('browser-sync').create();
	modRewrite = require('connect-modrewrite');
	gettext = require('gulp-angular-gettext');


// Compilar SASS, poner auto-prefijos, minimizar
gulp.task('styles', function() {
	return gulp.src('./bootstrap.scss') // ¿Dónde están los archivos fuentes?
		.pipe(plumber(function(error) { // Así podemos ver errores en el terminal
				gutil.log(gutil.colors.red(error.message));
				this.emit('end');
		}))
		.pipe(sourcemaps.init()) // Start Sourcemaps
		.pipe(sass())
		.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
		}))

		//.pipe(gulp.dest('./build/css/'))
		.pipe(gulp.dest('/var/www/html/activak/build/css/'))
		//.pipe(rename({suffix: '.min'}))
		//.pipe(cssnano())
		//.pipe(sourcemaps.write('.')) // Creates sourcemaps for minified styles
		//.pipe(gulp.dest('./build/css/'))
});
		
// JSHint, concat, and minify JavaScript
gulp.task('app-js', function() {
	return gulp.src([	
		
	// Grab your custom scripts
	'services/*.js',
	'components/app.js',
	'components/**/*.js',
				
	])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(concat('app.js'))
		//.pipe(gulp.dest('./build/js'))
		.pipe(gulp.dest('/var/www/html/activak/build/js/'))
		//.pipe(rename({suffix: '.min'}))
		//.pipe(uglify({mangle: false}))
		//.pipe(sourcemaps.write('.')) // Creates sourcemap for minified JS
		//.pipe(gulp.dest('./dist/js'))
});    

// JSHint, concat, and minify JavaScript
gulp.task('vendor-js', function() {
	return gulp.src([	
		
	// Grab your custom scripts

	'./node_modules/angular/angular.js',
    './node_modules/angular-ui-router/release/angular-ui-router.js',
    './node_modules/ngstorage/ngStorage.js',
    './node_modules/jquery/dist/jquery.js',
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './node_modules/angular-bootstrap/ui-bootstrap-tpls.js',
    './node_modules/angular-route/angular-route.js',
    './node_modules/sweetalert/dist/sweetalert.min.js',
    './node_modules/angular-scroll/angular-scroll.js',
    './node_modules/angular-xeditable/dist/js/xeditable.js',
    './node_modules/responsive-bootstrap-toolkit/src/bootstrap-toolkit.js',
    './node_modules/bootstrap-touchspin/src/jquery.bootstrap-touchspin.js',
    './node_modules/angular-resource/angular-resource.js',
    './node_modules/ngmap/build/scripts/ng-map.min.js',
    './node_modules/angular-gettext/dist/angular-gettext.min.js',
    './node_modules/angular-dynamic-locale/dist/tmhDynamicLocale.js',
    './node_modules/angular-un-svg/dist/un-svg.js',
    './node_modules/angularjs-slider/dist/rzslider.js',
    './node_modules/angular-input-stars-directive/angular-input-stars.js',
    './node_modules/angular-sanitize/angular-sanitize.js',
				
	])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(concat('vendor.js'))
		//.pipe(gulp.dest('./build/js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(sourcemaps.write('.')) // Creates sourcemap for minified JS
		//.pipe(gulp.dest('./build/js'))
		.pipe(gulp.dest('/var/www/html/activak/build/js/'))
}); 



// Watch files for changes (without Browser-Sync)
gulp.task('watch', function() {

	gulp.watch('./components/app.js', ['app-js']);
	gulp.watch('./components/**/*.js', ['app-js']);
	gulp.watch('./components/**/*.html', ['html']);
	gulp.watch('./components/**/*.scss', ['styles']);
	gulp.watch('./variables.scss', ['styles']);
	
}); 



// Run styles, site-js and bootstrap-js
gulp.task('default', function() {
	gulp.start('styles', 'app-js', 'vendor-js');
});


//Languages 

gulp.task('pot', function () {
    return gulp.src(['./src/component/**/*.html','src/component/**/*.js'])
        .pipe(gettext.extract('template.pot', {
            // options to pass to angular-gettext-tools...
        }))

        .pipe(gulp.dest('./po/'));
});

gulp.task('translations', function () {
    return gulp.src('./po/*.po')
        .pipe(gettext.compile({
            // options to pass to angular-gettext-tools...
            format: 'javascript'
        }))
        .pipe(gulp.dest('./dist/translations/'));
});

gulp.task('html',function(){
    gulp.src('./components/**/*.html')
    //.pipe(gulp.dest('./build/html'));
    .pipe(gulp.dest('/var/www/html/activak/build/html'));
});
