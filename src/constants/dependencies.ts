const LANGUAGES = {
  typescript: 'Typescript',
  javascript: 'JavaScript',
} as const;

const ROUTING = {
  lib: 'react-router-dom',
  types: '@types/react-router-dom',
};

const EXPORT_PREFERENCE = {
  named: 'Named',
  default: 'Default',
};

const STYLES = {
  css: 'CSS',
  scss: 'SCSS',
} as const;

const STATE_MANAGEMENT = {
  MobX: {
    lib: 'mobx',
    label: 'MobX',
    types: undefined,
    binding: 'mobx-react',
  },
  Redux: {
    lib: 'redux',
    label: 'Redux',
    binding: 'react-redux',
    types: '@types/react-redux',
  },
} as const;

const REDUX_ADDONS = {
  'Redux Saga': {
    dev: false,
    types: undefined,
    lib: 'redux-saga',
    label: 'Redux Saga',
  },
  'Redux Toolkit': {
    dev: false,
    types: undefined,
    lib: '@reduxjs/toolkit',
    label: 'Redux Toolkit',
  },
  'Redux Logger': {
    dev: true,
    lib: 'redux-logger',
    label: 'Redux Logger',
    types: '@types/redux-logger',
  },
  'Redux Thunk': {
    lib: '',
    dev: false,
    types: undefined,
    label: 'Redux Thunk',
  },
} as const;

const FOLDERS = [
  'assets',
  'components',
  'data',
  'errors',
  'fallbacks',
  'hooks',
  'layouts',
  'services',
  'types',
  'utils',
  'validations',
];

const DEFAULT_ROUTE = 'Foo';
const DEFAULT_APP_NAME = 'my-app';

const LANG_CONFIG = {
  ts: 'tsconfig.json',
  js: 'jsconfig.json',
};

const MOCK_IMPORTS = ['foo', 'bar'];

export {
  STYLES,
  ROUTING,
  FOLDERS,
  LANGUAGES,
  LANG_CONFIG,
  MOCK_IMPORTS,
  REDUX_ADDONS,
  DEFAULT_ROUTE,
  DEFAULT_APP_NAME,
  STATE_MANAGEMENT,
  EXPORT_PREFERENCE,
};
