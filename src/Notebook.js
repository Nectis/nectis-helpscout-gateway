/**
 * @author Jonathan Terrell <jonathan.terrell@springbrook.es>
 * @copyright Copyright (c) 2019-2021 Springbrook S.L.
 * @license "MIT"
 */

import { Inspector, Runtime } from '@observablehq/runtime';

// -------------------------------------------------------------------------------------------------------------------------------
// Load
// -------------------------------------------------------------------------------------------------------------------------------

const cellTypeMap = new Map([
    ['h1', { label: 'Level 1 Header' }],
    ['h2', { label: 'Level 2 Header' }],
    ['n', { label: 'Narrative' }],
    ['t', { label: 'Tile' }],
    ['v', { label: 'Visual' }]
]);
const urlPrefix = 'https://api.observablehq.com/@jonathan-terrell/';
const urlSuffix = '.js?v=3';

const load = (notebookId, elementRef) =>
    new Promise((resolve, reject) => {
        // NOTES: Do not convert import to await. Some combination of await and async results in an error. Linked to webpack dev/prod.
        import(/* webpackIgnore: true */ `${urlPrefix}${notebookId}${urlSuffix}`)
            .then((moduleNamespace) => {
                const notebook = moduleNamespace.default;

                let containerElement;
                if (elementRef) {
                    containerElement = typeof elementRef === 'object' ? elementRef : document.getElementById(elementRef);
                    while (containerElement.firstChild) containerElement.removeChild(containerElement.lastChild);
                } else {
                    containerElement = document.createElement('div');
                }

                const runtime = new Runtime();
                const observableModule = runtime.module(notebook, (name) => {
                    if (!name) return true; // Run side-effects.

                    const cellType = cellTypeMap.get(name.split('_')[0]);
                    if (!cellType) return true; // Run side-effects.

                    const element = document.createElement('div');
                    containerElement.appendChild(element);
                    return new Inspector(element);
                });
                observableModule.redefine('embedded', true);

                resolve(containerElement);
            })
            .catch((error) => reject(error));
    });

// -------------------------------------------------------------------------------------------------------------------------------
// Exports
// -------------------------------------------------------------------------------------------------------------------------------

export default { load };
