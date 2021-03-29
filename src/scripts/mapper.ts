import chalk from "chalk";

import { capitalizeFirstLetter, toUniqueArray } from "../utils";

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
  stores?: string;
  appName?: string;
  reducers: string;
  useLogger: boolean;
  dependencies: string;
  devDependencies: string;
  isRoutingNeeded: boolean;
  additionalFolders: string;
  predefinedFolders: string[];
  stateManagement?: keyof typeof STATE_MANAGEMENT;
  exportPreference: keyof typeof EXPORT_PREFERENCE,
  language: typeof LANGUAGES[keyof typeof LANGUAGES];
  stylingPreference: typeof STYLES[keyof typeof STYLES],
  middleware: Exclude<keyof typeof REDUX_ADDONS, 'Redux Logger' | 'Redux Toolkit'>,
}

interface MappedAnswers {
  ts: boolean;
  name: string;
  scss: boolean;
  routes: string[];
  folders: string[];
  sagaUsed: boolean;
  useLogger: boolean;
  namedExport: boolean;
  dependencies: string[];
  devDependencies: string[];
  isRoutingNeeded: boolean;
  storesOrReducers: string[];
  stateManagement?: keyof typeof STATE_MANAGEMENT;
}

export let MAPPED_ANSWERS: MappedAnswers;

export const mapAnswers = ({
  appName,
  language,
  useLogger,
  middleware,
  isRoutingNeeded,
  stateManagement,
  exportPreference,
  predefinedFolders,
  additionalFolders,
  stylingPreference,
  routes: routesInput,
  stores: storesInput,
  reducers: reducersInput,
  dependencies: setupDependencies,
  devDependencies: setupDevDependencies,
}: Answers) => {
  let stores: string[] = [];
  let routes: string[] = [];
  let folders: string[] = [];
  let reducers: string[] = [];
  const warnings: string[] = [];
  let dependencies: string[] = [];
  let devDependencies: any[] = [];

  const ts = language === 'Typescript';
  const name = appName || DEFAULT_APP_NAME;
  const sagaUsed = middleware === 'Redux Saga';
  const scss = stylingPreference === STYLES.scss;
  const storesOrReducers = stores.length ? stores : reducers;
  const namedExport = exportPreference === EXPORT_PREFERENCE.named;

  // default app name as fallback incase user doesn't enter one
  if (!appName) {
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

  // sass needs to be installed explicitly
  scss && dependencies.push('sass');

  if (isRoutingNeeded) {
    // add routing dependencies
    dependencies.push(ROUTING.lib);
    devDependencies.push(ROUTING.types);

    // construct routes config
    if (routesInput) {
      // remove extra white space & duplicates
      routes = toUniqueArray(routesInput, true);

      // map routes with capitalized first letter of each
      routes = routes.map((route) => capitalizeFirstLetter(route));
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
      ...stateManagement === 'Redux' ? [REDUX_ADDONS['Redux Toolkit'].lib] : [],
    ];

    // add state management types definition to the list of dev dependencies (if exists)
    devDependencies = [
      ...devDependencies,
      ...ts && STATE_MANAGEMENT[stateManagement].types ?
        [STATE_MANAGEMENT[stateManagement].types] : [],
    ];

    // remove extra white space & duplicates
    stores = toUniqueArray(storesInput, true);
    reducers = toUniqueArray(reducersInput, true);

    // add redux logger
    if (useLogger) {
      const { lib, types } = REDUX_ADDONS['Redux Logger'];

      dependencies = [...dependencies, lib];
      devDependencies = [...devDependencies, ...ts ? [types] : []];
    }

    // thunk doesn't need to be installed
    // as an additional dependency
    if (sagaUsed) {
      dependencies.push(REDUX_ADDONS[middleware].lib);
    }
  }

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

  MAPPED_ANSWERS = {
    ts, name, scss, routes, folders, sagaUsed, useLogger, namedExport,
    dependencies, devDependencies, isRoutingNeeded, stateManagement, storesOrReducers,
  };
};
