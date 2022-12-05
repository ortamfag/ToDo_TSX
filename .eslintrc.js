module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'airbnb-typescript',
    ],
    overrides: [
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: 'true',
        },
        project: ['./tsconfig.json'],
        tsconfigRootDir: './',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        indent: 'off',
        'linebreak-style': 0,
        '@typescript-eslint/indent': 'off',
        'react/jsx-indent': 'off',
        quotes: ['off'],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'react/jsx-uses-vars': 'error',
        'react/jsx-uses-react': 'error',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'react/jsx-indent-props': 'off',
        'max-len': ['error', { code: 120 }],
        'react/function-component-definition': [
            2,
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
};
