'use strict'
// Lint Stage Configurtion
module.exports = {
    '*.{js,jsx,ts,tsx}': [
        'eslint --max-warnings=0',
        'react-scripts test --bail --watchAll=false --findRelatedTests --passWithNoTests',
        () => 'tsc-files --noEmit',
    ],
    '*.{js,ts}': ['react-scripts test --coverage --watchAll=false'],
    // eslint-disable-next-line sort-keys
    '*.{css,js,json,jsx,ts,tsx}': ['prettier --write'],
}
