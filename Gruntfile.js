/**
 * Created by Elaine on 4/29/15.
 */
module.exports = function(grunt) {

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
                    'index.html': 'map.html'
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

    //minify assets
    grunt.registerTask('minify', ['uglify','cssmin','htmlmin','jsonmin']);

    // Default task(s).
    grunt.registerTask('default', ['merge-json','copy','uglify','cssmin','htmlmin','jsonmin']);

};

