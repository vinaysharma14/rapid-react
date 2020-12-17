import { toKebabCase } from "../utils";
import { MOCK_REDUCERS } from '../constants';

const reducerTemplates = (customReducers: string[], namedExport: boolean) => {
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
${reducers.map(reducer => `  ${mockCmt(0)}${reducer},`).join('\n')}s
});`;

  return {
    rootReducer,
    reducerImports,
  };
};

export const reduxTemplate = (
  customReducers: string[],
  ts: boolean,
  namedExport: boolean,
) => {
  const { reducerImports, rootReducer } = reducerTemplates(customReducers, namedExport);

  return `import { createStore, combineReducers } from 'redux';

${reducerImports}

${rootReducer}

${namedExport ? 'export ' : ''}const store = createStore(rootReducer);
${namedExport ? '' : '\nexport default store;\n'}${ts ? '\nexport type AppState = ReturnType<typeof rootReducer>;\n' : ''}`;
};
