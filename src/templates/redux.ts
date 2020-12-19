import { sortArr, toKebabCase, unCapitalizeFirstLetter } from "../utils";
import { MOCK_SAGAS, MOCK_REDUCERS, REDUX_ADDONS } from '../constants';

const reducerTemplates = (customReducers: string[], namedExport: boolean, useForm: boolean) => {
  const useMock = !customReducers.length;
  const reducers = useMock ? MOCK_REDUCERS : customReducers.map(name => unCapitalizeFirstLetter(name));

  // comment in case of mock reducers or whitespace(s) in case of custom ones
  const mockCmt = (whiteSpaces: number) => useMock ? '// ' : ' '.repeat(whiteSpaces);

  const reducerImports = `${namedExport ?
    `${mockCmt(0)}import {
${reducers.map(reducer => `${mockCmt(2)}${reducer}Reducer,`).join('\n')}
${mockCmt(0)}} from './reducers';` :
    `${reducers.map(reducer => `${mockCmt(0)}import ${reducer}Reducer from './reducers/${toKebabCase(reducer)}';`).join('\n')}`}`;

  const rootReducer = `const rootReducer = combineReducers({
${reducers.map(reducer => `  ${mockCmt(0)}${reducer}Reducer,`).join('\n')}${useForm ? '\n  formReducer,' : ''}
});`;

  return {
    rootReducer,
    reducerImports,
  };
};

const sagaTemplates = (customSagas: string[], ts: boolean, namedExport: boolean) => {
  const useMock = !customSagas.length;
  const sagas = useMock ? MOCK_SAGAS : customSagas.map(name => unCapitalizeFirstLetter(name));

  // comment in case of mock sagas or whitespace(s) in case of custom ones
  const mockCmt = (whiteSpaces: number) => useMock ? '// ' : ' '.repeat(whiteSpaces);

  const sagaImports = `import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

${namedExport ?
    `${mockCmt(0)}import {
${sagas.map(saga => `${mockCmt(2)}${saga}Saga,`).join('\n')}
${mockCmt(0)}} from './sagas';` :
    `${sagas.map(saga => `${mockCmt(0)}import ${saga}Saga from './sagas/${toKebabCase(saga)}';`).join('\n')}`}`;

  const rootSaga = `function* rootSaga()${ts ? ': Generator' : ''} {
  yield all([
${sagas.map(saga => `    ${mockCmt(0)}fork(${saga}Saga),`).join('\n')}
  ]);
}`;

  return {
    rootSaga,
    sagaImports,
  };
};

const reduxLoggerTemplate = (useSaga: boolean) => (`
const middleWares: Middleware[] = [${useSaga ? 'sagaMiddleware' : ''}];

// redux action should be logged only in development environment
if (process.env.NODE_ENV === 'development') {
  middleWares.push(createLogger({
    // * all the logs would be collapsed so as to prevent console from being cluttered
    // * you can uncomment the below line or completely line it as per your requirement
    collapsed: true,
    // * you can prevent actions to be logged by specifying their action type
    // * e.g. redux form logs can be blacklisted from being logged by
    // * specifying the type of it's actions, .i.e. '@@redux-form'
    // predicate: (_, action) => !action.type.includes('@@redux-form'),
  }));
}\n`);

export const reduxTemplate = (
  customReducers: string[],
  customSagas: string[],
  ts: boolean,
  namedExport: boolean,
  addons?: [keyof typeof REDUX_ADDONS],
) => {
  const useForm = addons?.includes('Redux Form');
  const formImport = useForm ? `\nimport { reducer as formReducer } from 'redux-form';\n` : '';

  const { reducerImports, rootReducer } = reducerTemplates(customReducers, namedExport, !!useForm);

  let sagaImports = '', rootSaga = '';
  const useSaga = addons?.includes('Redux Saga');

  if (useSaga) {
    const { sagaImports: sgImports, rootSaga: rootSg } = sagaTemplates(customSagas, ts, namedExport);

    sagaImports = sgImports;
    rootSaga = rootSg;
  }

  const useLogger = addons?.includes('Redux Logger');
  const loggerImport = `${useLogger ? `\nimport { createLogger } from 'redux-logger';\n` : ''}`;

  const reduxImports = sortArr([
    'createStore',
    'combineReducers',
    ...useSaga ? ['applyMiddleware'] : [],
    ...useLogger ? ['compose', ...ts ? ['Middleware'] : []] : [],
  ]);

  const storeCreation = useLogger ?
    'compose(applyMiddleware(...middleWares))(createStore)(rootReducer)' :
    `createStore(rootReducer${useSaga ? ', applyMiddleware(sagaMiddleware)' : ''})`;

  return `${reduxImports.length <= 3 ?
    `import { ${reduxImports.join(', ')} } from 'redux';` :
    `import {
${reduxImports.map((importName) => `  ${importName},`).join('\n')}
} from 'redux';`
  }
${loggerImport}${formImport}${useSaga ? `\n${sagaImports}\n` : ''}
${reducerImports}

${rootReducer}
${useSaga ? `\n${rootSaga}

const sagaMiddleware = createSagaMiddleware();` : ''}${useLogger ? reduxLoggerTemplate(!!useSaga) : ''}
${namedExport ? 'export ' : ''}const store = ${storeCreation};
${useSaga ? '\nsagaMiddleware.run(rootSaga);\n' : ''}${namedExport ? '' : '\nexport default store;\n'}${ts ? '\nexport type AppState = ReturnType<typeof rootReducer>;\n' : ''}`;
};
