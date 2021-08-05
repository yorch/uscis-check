module.exports = {
    arrowParens: 'always',
    bracketSpacing: true,
    semi: true,
    singleQuote: true,
    trailingComma: 'es5',
    tabWidth: 4,
    overrides: [
        {
            files: '*.json',
            options: {
                tabWidth: 2,
            },
        },
        {
            files: '*.yml',
            options: {
                tabWidth: 2,
            },
        },
    ],
    editorconfig: true,
};
