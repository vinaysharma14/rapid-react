import { stringToArray, removeDuplicatesFromArr } from "../utils";
import { LANGUAGES, STATE_MANAGEMENT, REDUX_ADDONS, ROUTING } from "../constants";

interface Answers {
  appName: string;
  dependencies: string;
  devDependencies: string;
  isRoutingNeeded: boolean;
  reduxAddons?: [keyof typeof REDUX_ADDONS];
  stateManagement: keyof typeof STATE_MANAGEMENT;
  language: typeof LANGUAGES[keyof typeof LANGUAGES];
}

const mappedAnswers = (answers: Answers) => {
  // TODO: fix any type
  let dependencies: any = [], devDependencies: any = [];

  const {
    appName,
    language,
    reduxAddons,
    isRoutingNeeded,
    stateManagement,
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

  // add routing dependencies if chosen
  if (isRoutingNeeded) {
    dependencies.push(ROUTING.lib);
    devDependencies.push(ROUTING.types);
  }

  // add state management and it's binding to the list of dependencies
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

  // next line left blank before spinners kick in
  console.log('\n');

  return {
    appName,
    language,
    dependencies,
    devDependencies,
    isRoutingNeeded,
  }
}

export {
  mappedAnswers,
}