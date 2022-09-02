'use strict'
// Lint Stage Configurtion
module.exports = {
    '*.{js,ts}': [
        'react-scripts test -all --bail --coverage --watchAll=false --findRelatedTests --passWithNoTests',
    ],
    // eslint-disable-next-line sort-keys
    '*.{js,jsx,ts,tsx}': [
        'eslint --max-warnings=0',
        () => 'tsc-files --noEmit',
    ],
    // eslint-disable-next-line sort-keys
    '*.{css,js,json,jsx,ts,tsx}': ['prettier --write'],
}
