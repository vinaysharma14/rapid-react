import { MOCK_IMPORTS } from '../constants';
import { toKebabCase, unCapitalizeFirstLetter } from "../utils";

const reducerTemplates = (customReducers: string[], namedExport: boolean) => {
  const useMock = !customReducers.length;
  const reducers = useMock ? MOCK_IMPORTS : customReducers.map(name => unCapitalizeFirstLetter(name));

  // comment in case of mock reducers or whitespace(s) in case of custom ones
  const mockCmt = (whiteSpaces: number) => useMock ? '// ' : ' '.repeat(whiteSpaces);

  const reducerImports = `${namedExport ?
    `${mockCmt(0)}import {
${reducers.map(reducer => `${mockCmt(2)}${reducer}Reducer,`).join('\n')}
${mockCmt(0)}} from './features';` :
    `${reducers.map(reducer => `${mockCmt(0)}import ${reducer}Reducer from './features/${toKebabCase(reducer)}';`).join('\n')}`}`;

  const rootReducer = `reducer: {
${reducers.map(reducer => `    ${mockCmt(0)}${reducer}Reducer,`).join('\n')}
  },`;

  return {
    rootReducer,
    reducerImports,
  };
};

const sagaTemplates = (customReducers: string[], ts: boolean, namedExport: boolean) => {
  const useMock = !customReducers.length;
  const sagas = useMock ? MOCK_IMPORTS : customReducers.map(name => unCapitalizeFirstLetter(name));

  // comment in case of mock sagas or whitespace(s) in case of custom ones
  const mockCmt = (whiteSpaces: number) => useMock ? '// ' : ' '.repeat(whiteSpaces);

  const sagaImports = `import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

${namedExport ?
    `${mockCmt(0)}import {
${sagas.map(saga => `${mockCmt(2)}${saga}Saga,`).join('\n')}
${mockCmt(0)}} from './features';` :
    `${sagas.map(saga => `${mockCmt(0)}import ${saga}Saga from './sagas/${toKebabCase(saga)}';`).join('\n')}`}`;

  const rootSaga = `function* rootSaga()${ts ? ': Generator' : ''} {
  yield all([
${sagas.map(saga => `    ${mockCmt(0)}${saga}Saga,`).join('\n')}
  ]);
}`;

  return {
    rootSaga,
    sagaImports,
  };
};

const reduxLoggerTemplate = () => (`
    ...process.env.NODE_ENV === 'development' ? [ // actions should be logged only during development
      createLogger({
        // * all the logs would be collapsed so as to prevent console from being cluttered
        // * you can uncomment the below line or completely line it as per your requirement
        collapsed: true,
        // * you can prevent actions to be logged by specifying their action type
        // predicate: (_, action) => !action.type.includes('action-type'),
      }),
    ] : [],`
);

const rtkMiddleware = (useSaga: boolean, useLogger:boolean) => {
  const saga = useSaga ? '\n    sagaMiddleware,' : '';
  const logger = useLogger ? reduxLoggerTemplate() : '';

  return !useSaga && !useLogger ? '' : `\n  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),${saga}${logger}
  ],`;
};

export const reduxTemplate = (
  ts: boolean,
  useSaga: boolean,
  useLogger: boolean,
  namedExport: boolean,
  customReducers: string[],
) => {
  const { reducerImports, rootReducer } = reducerTemplates(customReducers, namedExport);

  let sagaImports = '', rootSaga = '';

  if (useSaga) {
    const { sagaImports: sgImports, rootSaga: rootSg } = sagaTemplates(customReducers, ts, namedExport);

    sagaImports = sgImports;
    rootSaga = rootSg;
  }

  const loggerImport = `${useLogger ? `\nimport { createLogger } from 'redux-logger';\n` : ''}`;

  const rtkImports = [
    'configureStore',
    ...!useSaga && ts ? ['Action', 'ThunkAction'] : [],
  ];

  return `${`import { ${rtkImports.join(', ')} } from '@reduxjs/toolkit';`}
${loggerImport}${useSaga ? `\n${sagaImports}\n` : ''}
${reducerImports}
${useSaga ? `\n${rootSaga}

const sagaMiddleware = createSagaMiddleware();\n` : ''}
${namedExport ? 'export ' : ''}const store = configureStore({
  ${rootReducer}${rtkMiddleware(useSaga, useLogger)}
});
${useSaga ? '\nsagaMiddleware.run(rootSaga);\n' : ''}${namedExport ? '' : '\nexport default store;\n'}
${ts ? 'export type RootState = ReturnType<typeof store.getState>;\n' : ''}${!useSaga ? `\nexport type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;\n` : ''}`;
};
