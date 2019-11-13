module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'prettier/prettier': "error", // todos os problemas que o prettier identificar deve retornar um erro no Eslint.
    // o padrão do airbnb so permite que seja escrito codigo jsx em arquivos d extensao jsx
    'react/jsx-filename-extension': [
      'warn',
      { extensions: [ '.jsx', '.js' ]} // essa regra ira fazer com que de um aviso apenas quando o arquivp map fpr de extensao jsx ou js.
    ],
    'import/prefer-default-export': 'off', // desativando regra que obriga quando tenho apenas 1 export esse seja o expórt default
    'react/state-in-constructor': 'off',
    'react/no-unused-state': 'off'
  },

};
