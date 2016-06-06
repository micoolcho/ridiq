module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      main: {
        files: {
          './build/css/main.css': './src/sass/main.scss',
        }
      },
      bootstrap: {
        files: {
          './build/css/customized_bootstrap.css': './src/sass/customized_bootsrap.scss',
        },
      }
    },

    watch: {
      sass: {
        files: ['src/sass/**/*.scss'],
        tasks: ['sass:main'],
      },
    },

    browserSync: {
      dev: {
        bsFiles: {
          src : [
            './build/css/*.css',
            './build/*.html',
            './build/js/*.js',
          ]
        },
        options: {
          watchTask: true,
          server: './build'
        }
      }
    }
  });

  grunt.registerTask('serve', [
    'browserSync',
    'watch'
  ]);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
};