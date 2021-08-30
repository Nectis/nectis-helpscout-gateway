/**
 * @author Jonathan Terrell <jonathan.terrell@springbrook.es>
 * @copyright Copyright (c) 2019-2021 Springbrook S.L.
 * @license "MIT"
 */

// Webpack required because rollup does not support dynamic imports with names in variables.

const path = require('path');

// -------------------------------------------------------------------------------------------------------------------------------
// Exports
// -------------------------------------------------------------------------------------------------------------------------------

module.exports = [
    {
        entry: './src/index.js',
        experiments: { outputModule: true },
        mode: 'development', // Fails if this is changed to 'production'. It appears to be linked to dynamic import of notebooks.
        output: {
            // chunkFormat: 'module',
            filename: 'index.js',
            library: { type: 'module' },
            path: path.resolve(__dirname, 'dist')
        }
    },
    {
        entry: './src/index.js',
        mode: 'development', // Fails if this is changed to 'production'. It appears to be linked to dynamic import of notebooks.
        output: {
            // chunkFormat: 'module',
            filename: 'index-umd.js',
            library: { name: 'NectisHelpScoutGateway', type: 'umd' },
            path: path.resolve(__dirname, 'dist')
        }
    }
];
