module.exports = function (grunt) {
    grunt.initConfig({

        watch: {
            css: {
                files: ['src/less/**/**/*.less'],
                tasks: ['less', 'autoprefixer', 'csso', 'concat'],
                options: {
                    reload: true
                }
            },
            /*html: {
                files: ['**!/!*.html']
            },*/
            js: {
                files: ['src/js/plugins/*.js', 'src/js/pages/**/*.js'],
                tasks: ['concat']
            },
            images: {
                files: ['src/less/**/images/*.{png,gif,jpg,jpeg,svg}'],
                tasks: ['copy']
            },
            fonts: {
                files: ['src/fonts/**'],
                tasks: ['copy']
            }
        },

        combine_mq: {
            default_options: {
                expand: true,
                cwd: 'dist/css/',
                src: '*.css',
                dest: 'dist/css/'
            }
        },

        less: {
            development: {
                options: {
                    paths: ["src/less/**"],
                    compress: false,
                    optimization: 2,
                    modifyVars: {
                        root: '"<%= grunt.option(\'distRoot\') %><%= grunt.option(\'distTarget\') %>"'
                    }
                },
                files: {
                    "dist/css/style.css": [
                        "src/less/common/reset.less",
                        "src/less/common/fonts.less",
                        "!src/less/common/variables.less",
                        "src/less/common/common.less",
                        "src/less/pages/**/*.less",
                        "src/less/assets/**/*.less"
                    ]
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 10 versions', 'ie 9']
            },
            prefixing: {
                src: 'dist/css/style.css',
                dest: 'dist/css/style.css'
            }
        },

        csso: {
            compress: {
                options: {
                    report: 'gzip'
                },
                files: {
                    'dist/css/style.min.css': ['dist/css/style.css']
                }
            }
        },

        copy: {
            images: {
                expand: true,
                flatten: true,
                cwd: '',
                src: ['src/less/**/images/*.{png,gif,jpg,jpeg,svg}'],
                dest: 'dist/images/'
            },
            fonts: {
                expand: true,
                cwd: 'src/fonts',
                src: '**',
                dest: 'dist/fonts/'
            }
        },

        /*uglify: {
           options: {
               mangle: false
           },
           js: {
               files: {
                   'dist/js/plugins.min.js': ['src/js/plugins/!*.js'],
                   'dist/js/main.min.js': ['src/js/pages/!**!/!*.js']
               }
           }
        },*/

        concat: {
            options: {
                separator: ' '
            },
            javascript: {
                files: {
                    'dist/js/plugins.js': ['src/js/plugins/*.js'],
                    'dist/js/main.js': ['src/js/pages/**/*.js']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-combine-mq');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('compile', ['less', 'combine_mq', 'autoprefixer', 'csso', 'copy', 'concat']);
};