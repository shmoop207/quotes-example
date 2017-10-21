

module.exports = function (grunt) {

    grunt.initConfig({

        mochaTest: {
            e2e: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/spec/e2e.js']
            },
            unit: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/spec/unitSpec.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('test', ['mochaTest:unit','mochaTest:e2e']);

    grunt.registerTask('default', 'test');

};
