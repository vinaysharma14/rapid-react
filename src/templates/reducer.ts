import { commonTemplates } from "./common";
import { capitalizeFirstLetter, unCapitalizeFirstLetter } from "../utils";

export const reducerTemplate = (name: string, ts: boolean, namedExport: boolean) => {
  const typePrefix = capitalizeFirstLetter(name);
  const reducerPrefix = unCapitalizeFirstLetter(name);

  const stateType = `${typePrefix}State`;
  const actionsType = `${typePrefix}Actions`;
  const reducerReturnType = ts ? `: ${stateType}` : '';
  const typeImports = ts ? `import { ${stateType}, ${actionsType} } from './types';\n\n` : '';

  const { cmpExport } = commonTemplates(`${reducerPrefix}Reducer`, ts, namedExport);

  return `${typeImports}const ${reducerPrefix}State${reducerReturnType} = {
  // all properties in this state would be passed to your
  // reducer for the first time when Redux initializes
};

${namedExport ? 'export ' : ''}const ${reducerPrefix}Reducer = (state = ${reducerPrefix}State, action${ts ? `: ${actionsType}` : ''})${reducerReturnType} => {
  switch (action.type) {
    case '${reducerPrefix}/ACTION_FOO': {
      const { valueA } = action.payload;

      return {
        ...state,
        valueA,
      };
    }

    case '${reducerPrefix}/ACTION_BAR': {
      const { valueB } = action.payload;

      return {
        ...state,
        valueB,
      };
    }

    default: {
      return state;
    }
  }
};
${cmpExport}`;
};
