module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      options: {
        style: "compressed",
      },
      main: {
        files: {
          '../yam/vendor/assets/stylesheets/share_page/main.css': './src/sass/main.scss',
        }
      },
      bootstrap: {
        files: {
          '../yam/vendor/assets/stylesheets/share_page/customized_bootstrap.css': './src/sass/customized_bootsrap.scss',
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
          server: './build', 
          port: 8000
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
