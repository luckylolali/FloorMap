/**
 * Created by Elaine on 4/29/15.
 */
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        "merge-json": {
            "library": {
                src: [ "json/**/*.json" ],
                dest: "roomInfo.json"
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, flatten: true, src: ['img/**'], dest: 'images/', filter: 'isFile'}
                ]
            }
        },
        uglify: {
            my_target: {
                files: {
                    'js/main.min.js': ['js/main.js']
                }
            }
        },
        cssmin: {
            css:{
                files: {
                    'css/main.min.css': ['css/main.css']
                }
            }
        },
        htmlmin: {
            options: {                        // Target options
                removeComments: true,
                collapseWhitespace: true
            },                                // Task
            dev: {
                files: {
                    'index.html': 'map.html',
                    'dest/DrexelFloor1.svg': 'SVGOrigin/DrexelFloor1.svg'
                }
            }
        },
        jsonmin: {
            stripAll: {
                options: {
                    stripWhitespace: true,
                    stripComments: true
                },
                files: {
                    'rooms.json': 'roomInfo.json'
                }
            }
        },
        svgmin: {
            options: {
                plugins: [
                    { removeViewBox: false },               // don't remove the viewbox atribute from the SVG
                    { removeUselessStrokeAndFill: false },  // don't remove Useless Strokes and Fills
                    { removeEmptyAttrs: false },
                    { cleanupIDs: false }
                ]
            },
            dist: {
                files: {
                    'SVG/DrexelFloor1.svg': 'SVGOrigin/DrexelFloor1.svg',
                    'SVG/DrexelFloor2.svg': 'SVGOrigin/DrexelFloor2.svg',
                    'SVG/DrexelFloor3.svg': 'SVGOrigin/DrexelFloor3.svg',
                    'SVG/PostFloor1.svg': 'SVGOrigin/PostFloor1.svg',
                    'SVG/PostFloor2.svg': 'SVGOrigin/PostFloor2.svg',
                    'SVG/PostFloor3.svg': 'SVGOrigin/PostFloor3.svg'
                }
            }
        },
        watch: {
            merge: {
                files: ['json/*.json'],
                tasks: ['merge-json']

            }
        }
    });
    //copy images to one folder
    grunt.loadNpmTasks('grunt-contrib-copy');

    //load the plug-in that provide the "merge-json" task
    grunt.loadNpmTasks('grunt-merge-json');

    //watch the change and merge json automatically
    grunt.loadNpmTasks('grunt-contrib-watch');

    //minify js file
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //minify css file
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //minify html file
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    //minify json file
    grunt.loadNpmTasks('grunt-jsonmin');

    //minify svg
    grunt.registerTask('minifysvg', ['svgmin']);

    //minify assets
    grunt.registerTask('minify', ['uglify','cssmin','htmlmin','jsonmin','svgmin']);

    // Default task(s).
    grunt.registerTask('default', ['merge-json','copy','uglify','cssmin','htmlmin','jsonmin','svgmin']);

};

