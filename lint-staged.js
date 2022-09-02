'use strict'
// Lint Stage Configurtion
module.exports = {
    '*.{js,jsx,ts,tsx}': [
        'eslint --max-warnings=0',
        () => 'tsc-files --noEmit',
    ],
    // eslint-disable-next-line sort-keys
    '*.{css,js,json,jsx,ts,tsx}': ['prettier --write'],
}
