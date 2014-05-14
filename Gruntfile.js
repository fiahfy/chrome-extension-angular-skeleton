'use strict';

module.exports = function (grunt) {

  require('time-grunt')(grunt);

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    bower: {
      install: {
        options: {
          targetDir: 'app/libs',
          layout: 'byComponent',
          cleanTargetDir: true,
          cleanBowerDir: true
        }
      }
    },

    watch: {
      js: {
        files: ['app/js/**.js'],
        tasks: ['newer:jshint:all']
      },
      jsTest: {
        files: ['test/unit/**.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'app/js/**.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/unit/**.js']
      }
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    clean: {
      dist: {
        src: [
          '.tmp', 'dist'
        ]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app',
          dest: 'dist',
          src: [
            '*',
            'data/**',
            'html/**',
            'img/**',
            'js/{analytics,content_scripts}.js',
            'libs/**',
            'partials/**'
          ]
        }]
      }
    },

    useminPrepare: {
      html: 'app/html/**.html',
      options: {
        dest: 'dist/html'
      }
    },
    usemin: {
      html: 'dist/html/*.html'
    },

    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/js',
          src: '**.js',
          dest: '.tmp/js'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: 'dist/html',
          src: ['**.html'],
          dest: 'dist/html'
        }]
      }
    },

//    autoprefixer: {
//      options: {
//        browsers: ['last 1 version']
//      },
//      dist: {
//        files: [{
//          expand: true,
//          cwd: '.tmp/css',
//          src: '**.css',
//          dest: '.tmp/css'
//        }]
//      }
//    },

//    rev: {
//      dist: {
//        files: {
//          src: [
//            'dist/js/**.js',
//            'dist/css/**.css',
//            'dist/img/**.{png,jpg,jpeg,gif,webp,svg}'
//          ]
//        }
//      }
//    }
  });

  grunt.registerTask('init', [
    'clean',
    'bower'
  ]);

  grunt.registerTask('test', [
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean',
    'bower',
    'useminPrepare',
    'copy',
    'concat',
//    'autoprefixer',
    'ngmin',
    'cssmin',
    'uglify',
//    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'init'
  ]);
};