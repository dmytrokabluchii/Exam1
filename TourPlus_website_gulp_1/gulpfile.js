const { watch } =       require('gulp');
const gulp =            require('gulp');
const browserSync =     require('browser-sync').create();
const sass =            require('gulp-sass')(require('sass'));
// Для очистки и минификации файлов
const cleanCSS =        require('gulp-clean-css');
// Для слития нескольких файло в один
const concat =          require('gulp-concat');
// Для переименования файлов в min версии
const rename =          require('gulp-rename');
// для управления браузерными префиксами в проекте(устанавливать префиксы для CSS3-свойств и тд)
const autoprefixer =    require('gulp-autoprefixer');
// Позволяет вставлять файлы друг в друга
const fileInclude =     require('gulp-file-include');
// Для удаления файлов
const del =             require('del');
// Для пережатия картинок
const imgmin =          require('gulp-imagemin');
// Для минификации js файлов
const uglify =          require('gulp-uglify-es').default;
// GIT-Page
const ghPages = require('gulp-gh-pages');

const ASSETS = "src/assets/";
const ASSETS_DIST = "dist/assets/";

// task serve отслеживает изменения в js, scss и html файлах
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
    // вызывая при этом серии таксов которые должны выполнится, 
    // их можно передавать через , (как в примере ниже) или в виде массивов
    gulp.watch(ASSETS+"js/**/*.js", gulp.series('prepare-js', 'move-js'));
    gulp.watch(ASSETS+"scss/**/*.scss", gulp.series('sass', 'minify-css', 'move-css'));
    gulp.watch("src/**/*.html", gulp.series('build-html'));
});

gulp.task('sass', function(){
    return gulp
        .src(ASSETS+"scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(ASSETS+".tmp/css"));
});

// Берет все собранные .css файлы, прогоняет их через autoprefixer
gulp.task('minify-css', () => {
    return gulp
        .src(ASSETS+'.tmp/css/*.css')
        .pipe(autoprefixer({
            grid:true,
            flex:true,
            overrideBrowserslist:["last 5 versions"],
            cascade: true
        }))
        // очищает с учетом особенностей IE
        .pipe(cleanCSS({compatibility: '*'}))
        // добавляет окончание .min
        .pipe(rename({suffix:".min"}))
        // и складывает в папку css
        .pipe(gulp.dest(ASSETS+'css'));
});

gulp.task('build-html', ()=>{
    return gulp
    // в src обрабатывает все файлы с расширением .html которые нах. в корне
        .src("src/*.html")
        .pipe(fileInclude({
            // распределяет инклуды
            prefix: '@@',
            basepath: '@file'
        }))
        // куда распределяет, в папку dist в корень
        .pipe(gulp.dest("dist/"))
        // и вызывается .pipe который обновляет всё это в browserSync
        .pipe(browserSync.stream());
});

// этот таск просто вызывает del и удаляет все содержимое(по *) папки dist, 
// т.е. все почистил(чтобы там не хранился мусор)
gulp.task('clear', (done)=>{
    del(['./dist/*']);
    done();
});

// очищает все содержимое в папке dist
gulp.task('clear', (done)=>{
    del(['./dist/*']);
    done();
});

// очищает все содержимое в папке assets .tmp
gulp.task('cleartmp', (done)=>{
    del([ASSETS+'.tmp/*']);
    done();
});

gulp.task('move-css', (done)=>{
    gulp
        .src(ASSETS+'css/**/*')
        .pipe(gulp.dest(ASSETS_DIST+'css/'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('imgmin', (done)=>{
    gulp
        .src(ASSETS+'images/**/*')
        .pipe(imgmin())
        .pipe(gulp.dest(ASSETS_DIST+'images/'));
    done();
});

gulp.task('prepare-js', ()=>{
    return gulp
        .src(ASSETS+'js/**/*.js')
        .pipe(uglify())
        .pipe(concat("all.js"))
        .pipe(rename("all.min.js"))
        .pipe(gulp.dest(ASSETS+'.tmp/js'));
});

gulp.task('move-js', ()=>{
    return gulp
        .src(ASSETS+'.tmp/js/all.min.js')
        .pipe(gulp.dest(ASSETS_DIST+'js/'))
        .pipe(browserSync.stream());
});

gulp.task('move-plugins', ()=>{
    return gulp
        .src(ASSETS+'plugins/**/*')
        .pipe(gulp.dest(ASSETS_DIST+'plugins/'));
});

gulp.task('move-json', ()=>{
    return gulp
        .src(ASSETS+'common/**/*')
        .pipe(gulp.dest(ASSETS_DIST+'common/'));
});

gulp.task('move-favicon', ()=>{
    return gulp.src(ASSETS+'favicon/*')
    .pipe(gulp.dest(ASSETS_DIST + 'favicon/'));
});

gulp.task('move-fonts', ()=>{
    return gulp
        .src(ASSETS+'fonts/**/*')
        .pipe(gulp.dest(ASSETS_DIST+'fonts/'));
});

gulp.task('move-svg', ()=>{
    return gulp
        .src(ASSETS+'images/svg/*')
        .pipe(gulp.dest(ASSETS_DIST+'images/svg/'));
});

// gulp.task('move-seo', ()=>{
//     return gulp
//         .src(['robots.txt', 'sitemap.xml'])
//         .pipe(gulp.dest('dist/'));
// });

gulp.task('move', 
gulp.parallel('move-css', 'move-js', 'move-plugins', 'move-json', 'move-favicon', 'move-fonts', 'move-svg'));
// , 'move-svg','move-seo'

// таск 'build' создает сбилденный проект, он выполняет здесь серию тасков:
// 'cleartmp', 'clear' - все очистили(чтобы не было лишнего мусора)
// 'sass' - преобразование sass файлов в .css
// потом в паралель выполняем 3 таска, когда они ('build-html',  'minify-css', 'prepare-js') одновременно закончили
// выполняться, выполняется таск 'imgmin' минификации изображений
// и таск 'move' который все это закидывает в папку dist
gulp.task('build', gulp.series('cleartmp', 'clear', 'sass', 
gulp.parallel('build-html',  'minify-css', 'prepare-js'), 'imgmin', 'move'));

// GIT-Page task
gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
      .pipe(ghPages());
  });
