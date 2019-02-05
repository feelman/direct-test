"use strict";

module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "src",
          src: [
            "css/**",
            "fonts/**/*.{woff,woff2}",
            "img/**",
            "js/**",
            "*.html",
            "php/*.php"
          ],
          dest: "build"
        }]
      },
      html: {
        files: [{
          expand: true,
          cwd: "src",
          src: ["*.html"],
          dest: "build"
        }]
      },
      php: {
        files: [{
          expand: true,
          cwd: "src",
          src: ["php/*.php"],
          dest: "build"
        }]
      },
      image: {
        files: [{
          expand: true,
          cwd: "src",
          src: ["img/**"],
          dest: "build"
        }]
      },
      js: {
        files: [{
          expand: true,
          cwd: "src",
          src: ["js/**"],
          dest: "build"
        }]
      }
    },

    clean: {
      build: ["build"]
    },

    less: {
      style: {
        files: {
          "build/css/style.css": "src/less/style.less"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")({browsers: [
              "last 1 version",
              "last 2 Chrome versions",
              "last 2 Firefox versions",
              "last 2 Opera versions",
              "last 2 Edge versions"
            ]})
          ]
        },
        src: "build/css/*.css"
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif}"]
        }]
      }
    },

    php: {
        dist: {
            options: {
                hostname: 'localhost',
                port: 3000,
                base: 'build', // Project root
                keepalive: false,
                open: false
            }
        }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "*.html",
            "php/*.php",
            "css/*.css"
          ]
        },
        options: {
          server: "build",
          watchTask: true,
          notify: false,
          open: true,
          ui: false
        }
      }
    },

    watch: {
      html: {
        files: ["src/*.html"],
        tasks: ["copy:html"]
      },
      php: {
        files: ["src/php/*.php"],
        tasks: ["copy:php"]
      },
      style: {
        files: ["src/less/**/*.less"],
        tasks: ["less", "postcss", "csso"],
        options: {
          spawn: false
        }
      },
      image: {
        files: ["src/img/**"],
        tasks: ["copy:image"]
      },
      js: {
        files: ["src/js/**"],
        tasks: ["copy:js"]
      }
    }
  });

  grunt.registerTask("serve", ["php:dist", "browserSync", "watch"]);
  grunt.registerTask("build", [
    "clean",
    "copy",
    "less",
    "postcss",
    "csso",
    "imagemin"
  ]);
};
