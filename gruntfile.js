/**
 * @author Jonathan Terrell <jonathan.terrell@springbrook.es>
 * @copyright Copyright (c) 2019-2021 Springbrook S.L.
 * @license "MIT"
 */

const webpackConfig = require('./webpack.config');

// -------------------------------------------------------------------------------------------------------------------------------
// Exports
// -------------------------------------------------------------------------------------------------------------------------------

module.exports = (grunt) => {
    // Initialise configuration.
    grunt.initConfig({
        // Bump configuration.
        bump: {
            options: {
                commitFiles: ['-a'],
                commitMessage:
                    '<%if(grunt.config("commitMessage")){%><%=grunt.config("commitMessage")%><%}else{%>Release v%VERSION%<%}%>',
                pushTo: 'origin'
            }
        },

        // Run configuration.
        run: {
            audit: { args: ['npm', 'audit'], cmd: 'npx' },
            install: { args: ['npm', 'install'], cmd: 'npx' },
            licenseChecker: {
                args: ['license-checker', '--production', '--json', '--out', 'LICENSES.json'],
                cmd: 'npx'
            },
            licenseNLF: { args: ['nlf', '-d'], cmd: 'npx' },
            lint: { args: ['eslint', 'src/**/*.js'], cmd: 'npx' },
            outdated: { args: ['npm', 'outdated'], cmd: 'npx' },
            publish: { args: ['publish'], cmd: 'npx' },
            test: { args: ['WARNING: No tests implemented.'], cmd: 'echo' },
            update: { args: ['npm-check-updates', '-u'], cmd: 'npx' }
        },

        // Webpack configuration.
        webpack: {
            myConfig: webpackConfig
        }
    });
    // Load external tasks.
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks('grunt-webpack');

    // Register local tasks.
    grunt.registerTask('audit', ['run:audit']);
    grunt.registerTask('build', ['webpack']);
    grunt.registerTask('licenseCheck', ['run:licenseChecker', 'run:licenseNLF']);
    grunt.registerTask('lint', ['run:lint']);
    grunt.registerTask('outdated', ['run:outdated']);
    grunt.registerTask('release', ['webpack', 'bump', 'run:publish']);
    grunt.registerTask('test', ['run:test']);
    grunt.registerTask('sync', ['bump']);
    grunt.registerTask('update', ['run:update', 'run:install']);
};
