import chalk from "chalk";

import { toUniqueArray } from "../utils";

import {
  STYLES,
  ROUTING,
  LANGUAGES,
  REDUX_ADDONS,
  DEFAULT_ROUTE,
  STATE_MANAGEMENT,
  DEFAULT_APP_NAME,
  EXPORT_PREFERENCE,
} from "../constants";

interface Answers {
  routes?: string;
  appName: string;
  dependencies: string;
  devDependencies: string;
  isRoutingNeeded: boolean;
  additionalFolders: string;
  predefinedFolders: string[];
  reduxAddons?: [keyof typeof REDUX_ADDONS];
  stateManagement?: keyof typeof STATE_MANAGEMENT;
  exportPreference: keyof typeof EXPORT_PREFERENCE,
  language: typeof LANGUAGES[keyof typeof LANGUAGES];
  stylingPreference: typeof STYLES[keyof typeof STYLES],
}

const mappedAnswers = (answers: Answers) => {
  // TODO: fix any type
  let dependencies: any = [],
    devDependencies: any = [],
    routes: string[] = [],
    folders: string[] = [];

  const warnings: string[] = [];

  const {
    appName,
    language,
    reduxAddons,
    isRoutingNeeded,
    stateManagement,
    exportPreference,
    predefinedFolders,
    additionalFolders,
    stylingPreference,
    routes: routesInput,
    dependencies: setupDependencies,
    devDependencies: setupDevDependencies,
  } = answers;

  // default app name as fallback incase user doesn't enter one
  if(!appName) {
    warnings.push(`App has been named as '${DEFAULT_APP_NAME}' since you didn\'t enter one.`);
  }

  // remove extra white space & duplicates
  if (setupDependencies.length > 0) {
    dependencies = toUniqueArray(setupDependencies);
  }

  // remove extra white space & duplicates
  if (setupDevDependencies.length > 0) {
    devDependencies = toUniqueArray(setupDevDependencies);
  }

  // remove all the types definitions if user has chosen JavaScript
  if (language === 'JavaScript' && devDependencies.length > 0) {
    devDependencies = devDependencies.filter((value: string) => !value.startsWith('@types/'));
  }

  if (isRoutingNeeded) {
    // add routing dependencies
    dependencies.push(ROUTING.lib);
    devDependencies.push(ROUTING.types);

    // construct routes config
    if (routesInput) {
      // remove extra white space & duplicates
      routes = toUniqueArray(routesInput);

      // map routes with capitalized first letter of each
      routes = routes.map((route) => `${route.charAt(0).toUpperCase()}${route.slice(1)}`);
    } else {
      // add a mock route if user doesn't enter any
      routes = [DEFAULT_ROUTE];
      warnings.push(`A mock route '${DEFAULT_ROUTE}' has been added since you didn\'t enter any route(s).`);
    }
  }

  if (stateManagement) {
    // add state management and it's react binding to the list of dependencies
    dependencies = [
      ...dependencies,
      STATE_MANAGEMENT[stateManagement].lib,
      STATE_MANAGEMENT[stateManagement].binding,
    ];

    // add state management types definition to the list of dev dependencies (if exists)
    devDependencies = [
      ...devDependencies,
      ...language === 'Typescript' && STATE_MANAGEMENT[stateManagement].types ?
        [STATE_MANAGEMENT[stateManagement].types] : [],
    ];
  }

  // add redux addons based on whether they are dev dependency or not
  reduxAddons && reduxAddons.forEach((addOn: keyof typeof REDUX_ADDONS) => {
    if (REDUX_ADDONS[addOn].dev) {
      devDependencies.push(REDUX_ADDONS[addOn].lib);
    } else {
      dependencies.push(REDUX_ADDONS[addOn].lib);
    }

    // add types definition for redux addon if user has chosen typescript
    if (language === 'Typescript' && REDUX_ADDONS[addOn].types) {
      devDependencies.push(REDUX_ADDONS[addOn].types);
    }
  });

  // save if user selected any predefined folder(s)
  if (predefinedFolders) {
    folders = predefinedFolders;
  }

  // if user has entered any custom folder(s) combine with the predefined ones
  if (additionalFolders) {
    folders = [...new Set([...folders, ...toUniqueArray(additionalFolders)])];
  }

  // display all warnings to user
  warnings.forEach((warning, i) => console.log(`${!i ? '\n' : ''}${chalk.keyword('orange')(warning)}`));

  return {
    routes,
    folders,
    dependencies,
    devDependencies,
    isRoutingNeeded,
    appName:appName || DEFAULT_APP_NAME,
    scssUsed: stylingPreference === STYLES.scss,
    typescriptUsed: language === LANGUAGES.typescript,
    namedExport: exportPreference === EXPORT_PREFERENCE.named,
  };
};

export {
  mappedAnswers,
};
