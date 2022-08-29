"use strict";

module.exports = {
    '*.{css,js,json,jsx,ts,tsx}': ['prettier --write'],
    '*.{js,jsx,ts,tsx}': [
        'eslint --max-warnings=0', 
        'react-scripts test --bail --watchAll=false --findRelatedTests --passWithNoTests',
        () => 'tsc-files --noEmit',
    ]
}