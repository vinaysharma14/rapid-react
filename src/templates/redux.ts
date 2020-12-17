import { toKebabCase } from "../utils";

export const reduxTemplate = (customReducers: string[], ts: boolean, namedExport: boolean) => {
  const useMock = !customReducers.length;
  const mockReducers = ['reducerA', 'reducerB', 'reducerC', 'reducerD', 'reducerE'];

  const reducers = useMock ? mockReducers : customReducers;

  return `import { createStore, combineReducers } from 'redux';

${namedExport ?
    `${useMock ? '// ' : ''}import {
${reducers.map(reducer => `${useMock ? '// ' : '  '}${reducer},`).join('\n')}
${useMock ? '// ' : ''}} from './reducers';` :
    `${reducers.map(reducer => `${useMock ? '// ' : ''}import ${reducer} from './reducers/${toKebabCase(reducer)}';`).join('\n')}`
}

const rootReducer = combineReducers({
${reducers.map(reducer => `${useMock ? '// ' : '  '}${reducer},`).join('\n')}
});

${namedExport ? 'export ' : ''}const store = createStore(rootReducer);
${namedExport ? '' : '\nexport default store;\n'}${ts ? '\nexport type AppState = ReturnType<typeof rootReducer>;\n' : ''}`;
};
