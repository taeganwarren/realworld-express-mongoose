import globals from 'globals';
import pluginJs from '@eslint/js';
import mochaPlugin from 'eslint-plugin-mocha';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
    {
        languageOptions: {
            globals: globals.node
        }
    },
    {
        plugins: {
            '@stylistic/js': stylisticJs
        },
        rules: {
            '@stylistic/js/indent': ['error', 4],
            '@stylistic/js/quotes': ['error', 'single'],
            '@stylistic/js/semi': ['error', 'always'],
            '@stylistic/js/comma-dangle': 'error',
            '@stylistic/js/semi-style': ['error', 'last'],
            '@stylistic/js/semi-spacing': 'error',
            '@stylistic/js/arrow-spacing': 'error',
            '@stylistic/js/object-curly-spacing': ['error', 'always'],
            '@stylistic/js/brace-style': ['error', '1tbs'],
            '@stylistic/js/object-curly-newline': ['error', 'always'],
            '@stylistic/js/no-confusing-arrow': 'error',
            '@stylistic/js/block-spacing': 'error',
            '@stylistic/js/arrow-parens': 'error',
            'curly': 'error',
            'arrow-body-style': ['error', 'always']
        }
    },
    pluginJs.configs.recommended,
    mochaPlugin.configs.flat.recommended
];