const LANGUAGES = {
  typescript: 'Typescript',
  javascript: 'JavaScript',
} as const;

const ROUTING = {
  lib: 'react-router-dom',
  types: '@types/react-router-dom',
}

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
    types: '@types/react-redux'
  },
} as const;

const REDUX_ADDONS = {
  'Redux Saga': {
    dev: false,
    types: undefined,
    lib: 'redux-saga',
    label: 'Redux Saga',
  },
  'Redux Form': {
    dev: false,
    lib: 'redux-form',
    label: 'Redux Form',
    types: '@types/redux-form'
  },
  'Redux Logger': {
    dev: true,
    lib: 'redux-logger',
    label: 'Redux Logger',
    types: '@types/redux-logger'
  },
} as const;

export {
  ROUTING,
  LANGUAGES,
  REDUX_ADDONS,
  STATE_MANAGEMENT,
}