'use strict'

module.exports = {
    '*.{js,jsx,ts,tsx}': [
        'eslint --max-warnings=0',
        'react-scripts test --bail --watchAll=false --findRelatedTests --passWithNoTests',
        () => 'tsc-files --noEmit',
    ],
    '*.{js,jsx,ts,tsx}': [
        'react-scripts test --watchAll=false --coverage --passWithNoTests',
    ],
    // eslint-disable-next-line sort-keys
    '*.{css,js,json,jsx,ts,tsx}': ['prettier --write'],
}
