import { toKebabCase } from "../utils";
import { MOCK_SAGAS, MOCK_REDUCERS, REDUX_ADDONS } from '../constants';

const reducerTemplates = (customReducers: string[], namedExport: boolean, useForm: boolean) => {
  const useMock = !customReducers.length;
  const reducers = useMock ? MOCK_REDUCERS : customReducers;

  // comment in case of mock reducers or whitespace(s) in case of custom ones
  const mockCmt = (whiteSpaces: number) => useMock ? '// ' : ' '.repeat(whiteSpaces);

  const reducerImports = `${namedExport ?
    `${mockCmt(0)}import {
${reducers.map(reducer => `${mockCmt(2)}${reducer},`).join('\n')}
${mockCmt(0)}} from './reducers';` :
    `${reducers.map(reducer => `${mockCmt(0)}import ${reducer} from './reducers/${toKebabCase(reducer)}';`).join('\n')}`}`;

  const rootReducer = `const rootReducer = combineReducers({
${reducers.map(reducer => `  ${mockCmt(0)}${reducer},`).join('\n')}${useForm ? '\n  formReducer,' : ''}
});`;

  return {
    rootReducer,
    reducerImports,
  };
};

const sagaTemplates = (customSagas: string[], ts: boolean, namedExport: boolean) => {
  const useMock = !customSagas.length;
  const sagas = useMock ? MOCK_SAGAS : customSagas;

  // comment in case of mock sagas or whitespace(s) in case of custom ones
  const mockCmt = (whiteSpaces: number) => useMock ? '// ' : ' '.repeat(whiteSpaces);

  const sagaImports = `import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

${namedExport ?
    `${mockCmt(0)}import {
${sagas.map(saga => `${mockCmt(2)}${saga},`).join('\n')}
${mockCmt(0)}} from './sagas';` :
    `${sagas.map(saga => `${mockCmt(0)}import ${saga} from './sagas/${toKebabCase(saga)}';`).join('\n')}`}`;

  const rootSaga = `function* rootSaga()${ts ? ': Generator' : ''} {
  yield all([
${sagas.map(saga => `    ${mockCmt(0)}fork(${saga}),`).join('\n')}
  ]);
}`;

  return {
    rootSaga,
    sagaImports,
  };
};

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

  if(useSaga) {
    const { sagaImports: sgImports, rootSaga: rootSg } = sagaTemplates(customSagas, ts, namedExport);

    sagaImports = sgImports;
    rootSaga = rootSg;
  }

  return `import { createStore, combineReducers${useSaga ? ', applyMiddleware' : ''} } from 'redux';
${formImport}${useSaga ? `\n${sagaImports}\n` : ''}
${reducerImports}

${rootReducer}
${useSaga ? `\n${rootSaga}

const sagaMiddleware = createSagaMiddleware();` : ''}
${namedExport ? 'export ' : ''}const store = createStore(rootReducer${useSaga ? ', applyMiddleware(sagaMiddleware)' : ''});
${useSaga ? '\nsagaMiddleware.run(rootSaga);\n' : ''}${namedExport ? '' : '\nexport default store;\n'}${ts ? '\nexport type AppState = ReturnType<typeof rootReducer>;\n' : ''}`;
};
