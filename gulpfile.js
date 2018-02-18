var gulp = require('gulp'), // Подключаем Gulp
	less = require('gulp-less'),  //Подключаем Less пакет
	browserSync = require('browser-sync'), // Подключаем Browser Sync
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleancss = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer');


gulp.task('less', function() { // Создаем таск Less
	return gulp.src('app/less/*.less') // Берем источник
		.pipe(less()) // Преобразуем Less в CSS посредством gulp-less
		.pipe(autoprefixer(['last 15 versions', '> 1%'], { cascade: true}))
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('scripts', function() {
	return gulp.src([
			'app/libs/jquery/jquery-1.11.1.min.js',
			'app/libs/fancybox/jquery.fancybox.pack.js',
			'app/libs/owl-carousel/owl.carousel.min.js',
			'app/libs/less.min.js',
			'js/common.js'
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('css-libs', ['less'], function() {
	return gulp.src('app/css/libs.css')
	.pipe(cleancss())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function() {  // Создаем таск browser-sync
	browserSync({ // Выполняем browser Sync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		}
	});
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('clear', function() {
	return cache.clearAll();
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('start', ['browser-sync', 'css-libs', 'scripts'], function() {
	gulp.watch('app/less/*.less', ['less']); // Наблюдение за less файлами
	gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});

gulp.task('build', ['clean', 'img', 'less', 'scripts'], function() {
	var buildCSS = gulp.src([ // Переносим библиотеки в продакшен
		'app/css/*',
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

	var buildFA = gulp.src('app/libs/font-awesome-4.7.0/**/*')
	.pipe(gulp.dest('dist/fonts'))

	var buildJS = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
});