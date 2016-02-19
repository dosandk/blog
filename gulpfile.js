var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Task for serving blog with Browsersync
gulp.task('serve', function () {
    browserSync.init({
        proxy: "localhost:4000/blog/"
    });
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);