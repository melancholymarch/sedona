var gulp = require("gulp"),
    sync = require("browser-sync"),
    less = require("gulp-less"),
    prefixer = require("gulp-autoprefixer"),
    csso = require("gulp-csso"),
    rename = require("gulp-rename"),
    plumber = require("gulp-plumber"),
    util = require("gulp-util");


gulp.task("observer", function(){
  sync({
    server:{
      baseDir: "../sedona"
    },
    notify: false
  });
});


gulp.task("less", function(){
  return gulp.src("less/style.less")
  .pipe(plumber(function(error){
    util.log(error);
    this.emit("end");
  }))
  .pipe(less())
  .pipe(prefixer(["last 10 versions", "> 1%", "ie 10"], {cascade: true}))
  .pipe(gulp.dest("css"))
  .pipe(sync.reload({stream: true}))
});


gulp.task("cssmin", ["less"], function(){
  gulp.src("css/style.css")
  .pipe(csso())
  .pipe(rename({suffix: ".min"}))
  .pipe(gulp.dest("css"))
  .pipe(sync.reload({stream: true}))
});


gulp.task("watch", ["observer", "cssmin"], function(){
  gulp.watch("less/**/*.less", ["cssmin"]);
  gulp.watch("*.html", sync.reload);
  gulp.watch("js/**/*.js", sync.reload);
});
