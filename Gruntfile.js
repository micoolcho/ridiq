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

    concat: {
      jsVendor: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          // 'bower_components/bootstrap-sass/assets/javascripts/bootstrap/modal.js',
          'bower_components/react/react.min.js',
          'bower_components/react/react-dom.min.js',
        ],
        dest: 'build/js/vendor.js',
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

  grunt.registerInitTask('vendor', [
    'sass:bootstrap',
    'concat:jsVendor',
  ]);

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
};