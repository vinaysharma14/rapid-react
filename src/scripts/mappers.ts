import chalk from "chalk";

import { stringToArray, removeDuplicatesFromArr } from "../utils";

import {
  STYLES,
  ROUTING,
  LANGUAGES,
  REDUX_ADDONS,
  STATE_MANAGEMENT,
  EXPORT_PREFERENCE
} from "../constants";

interface Answers {
  routes?: string;
  appName: string;
  dependencies: string;
  devDependencies: string;
  isRoutingNeeded: boolean;
  reduxAddons?: [keyof typeof REDUX_ADDONS];
  stateManagement?: keyof typeof STATE_MANAGEMENT;
  exportPreference: keyof typeof EXPORT_PREFERENCE,
  language: typeof LANGUAGES[keyof typeof LANGUAGES];
  stylingPreference: typeof STYLES[keyof typeof STYLES],
}

const mappedAnswers = (answers: Answers) => {
  // TODO: fix any type
  let dependencies: any = [], devDependencies: any = [], routes: string[] = [];

  const {
    appName,
    language,
    reduxAddons,
    isRoutingNeeded,
    stateManagement,
    exportPreference,
    stylingPreference,
    routes: routesInput,
    dependencies: setupDependencies,
    devDependencies: setupDevDependencies,
  } = answers;

  // remove extra white space and duplicates in dependencies
  if (setupDependencies.length > 0) {
    let dependenciesArr = stringToArray(setupDependencies);
    dependencies = removeDuplicatesFromArr(dependenciesArr);
  }

  // remove extra white space and duplicates in dev dependencies
  if (setupDevDependencies.length > 0) {
    let devDependenciesArr = stringToArray(setupDevDependencies);
    devDependencies = removeDuplicatesFromArr(devDependenciesArr);
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
      // remove extra white space and duplicates in routes
      let routesArr = stringToArray(routesInput);
      routes = removeDuplicatesFromArr(routesArr);

      // map routes with capitalized first letter of each
      routes = routes.map((route) => `${route.charAt(0).toUpperCase()}${route.slice(1)}`);
    } else {
      // add a dummy route if user doesn't enter any
      routes = ['Foo'];
      console.log(chalk.cyan('\nA dummy route \'Foo\' has been added since you didn\'t enter any route(s)'))
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
      devDependencies.push(REDUX_ADDONS[addOn].lib)
    } else {
      dependencies.push(REDUX_ADDONS[addOn].lib)
    }

    // add types definition for redux addon if user has chosen typescript
    if (language === 'Typescript' && REDUX_ADDONS[addOn].types) {
      devDependencies.push(REDUX_ADDONS[addOn].types);
    }
  })

  return {
    routes,
    appName,
    dependencies,
    devDependencies,
    isRoutingNeeded,
    scssUsed: stylingPreference === STYLES.scss,
    typescriptUsed: language === LANGUAGES.typescript,
    namedExport: exportPreference === EXPORT_PREFERENCE.named,
  }
}

export {
  mappedAnswers,
}