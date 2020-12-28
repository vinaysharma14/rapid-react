import inquirer from 'inquirer';

import {
  STYLES,
  FOLDERS,
  LANGUAGES,
  REDUX_ADDONS,
  STATE_MANAGEMENT,
  DEFAULT_APP_NAME,
  EXPORT_PREFERENCE,
} from '../constants';

export const handleSetup = async () => {
  return await inquirer.prompt([
    {
      type: 'list',
      name: 'language',
      choices: [LANGUAGES.typescript, LANGUAGES.javascript],
      message: 'Choose your preferred language:',
    },
    {
      type: 'input',
      name: 'appName',
      default: DEFAULT_APP_NAME,
      message: 'Enter the app name:',
    },
    {
      type: 'list',
      name: 'exportPreference',
      message: 'Choose preferred export:',
      choices: [EXPORT_PREFERENCE.named, EXPORT_PREFERENCE.default],
    },
    {
      type: 'list',
      name: 'stylingPreference',
      choices: [STYLES.scss, STYLES.css],
      message: 'Choose preferred style scripting:',
    },
    {
      type: 'confirm',
      default: 'yes',
      name: 'isRoutingNeeded',
      message: 'Do you need routing?',
    },
    {
      type: 'input',
      name: 'routes',
      default: 'home login about',
      message: 'Enter space separated route names:',
      when: (answers: any) => answers.isRoutingNeeded,
    },
    {
      type: 'confirm',
      default: 'yes',
      name: 'isStateManagementNeeded',
      message: 'Do you need state management?',
    },
    {
      type: 'list',
      name: 'stateManagement',
      choices: [STATE_MANAGEMENT.Redux.label, STATE_MANAGEMENT.MobX.label],
      message: 'Choose your preferred state management:',
      when: (answers: any) => answers.isStateManagementNeeded,
    },
    {
      type: 'input',
      name: 'stores',
      message: 'Enter space separated MobX stores you\'d like to have:',
      when: (answers: any) => answers.stateManagement === STATE_MANAGEMENT.MobX.label,
    },
    {
      type: 'checkbox',
      name: 'reduxAddons',
      choices: [REDUX_ADDONS['Redux Saga'].label, REDUX_ADDONS['Redux Logger'].label],
      when: (answers: any) => answers.stateManagement === STATE_MANAGEMENT.Redux.label,
      message: 'Would you like to install any of these additional dependencies usually needed for redux?',
    },
    {
      type: 'input',
      name: 'reducers',
      message: 'Enter space separated reducer(s) you\'d like to have:',
      when: (answers: any) => answers.stateManagement === STATE_MANAGEMENT.Redux.label,
    },
    {
      type: 'input',
      name: 'sagas',
      message: 'Enter space separated saga(s) you\'d like to have:',
      when: (answers: any) => answers?.reduxAddons?.includes(REDUX_ADDONS['Redux Saga'].label),
    },
    {
      type: 'checkbox',
      name: 'predefinedFolders',
      choices: FOLDERS,
      message: 'Choose from commonly used folders(s):',
    },
    {
      type: 'input',
      name: 'additionalFolders',
      message: 'Enter space separated additional folder(s) you\'d like to have:',
    },
    {
      type: 'input',
      name: 'dependencies',
      default: 'react-bootstrap lodash moment',
      message: 'Enter space separated required dependencies:',
    },
    {
      type: 'input',
      name: 'devDependencies',
      message: 'Enter space separated required dev dependencies:',
      default: 'prettier husky lint-staged',
    },
  ]);
};
