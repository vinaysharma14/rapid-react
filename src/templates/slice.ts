import { commonTemplates } from "./common";
import { capitalizeFirstLetter, unCapitalizeFirstLetter } from "../utils";

export const sliceTemplate = (name: string, ts: boolean, namedExport: boolean) => {
  const typePrefix = capitalizeFirstLetter(name);
  const reducerPrefix = unCapitalizeFirstLetter(name);

  const stateType = `${typePrefix}State`;
  const stateSuffix = ts ? `: ${stateType}` : '';
  const reducerReturnType = ts ? `: ${stateType}` : '';

  const typeDeclaration = ts ? `interface ${stateType} {
  value: number;
}\n\n` : '';

  const { cmpExport } = commonTemplates(`${reducerPrefix}Slice`, ts, namedExport);

  const actionPayloadComment = ts ? '// Use the PayloadAction type to declare the contents of \`action.payload\`\n    ' : '';

  return `import { createSlice${ts ? ', PayloadAction' : ''} } from '@reduxjs/toolkit';

${typeDeclaration}const initialState${reducerReturnType} = {
  // all properties in this state would be passed to the
  // reducer for the first time when Redux initializes
  value: 0,
};

${namedExport ? 'export ' : ''}const ${reducerPrefix}Slice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state${stateSuffix}) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state${stateSuffix}) => {
      state.value -= 1;
    },
    ${actionPayloadComment}incrementByAmount: (state${stateSuffix}, action${ts ? ': PayloadAction<number>' : ''}) => {
      state.value += action.payload;
    },
  },
});
${cmpExport}`;
};
