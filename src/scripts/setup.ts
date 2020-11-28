import inquirer from 'inquirer';

import { LANGUAGES, STATE_MANAGEMENT, REDUX_ADDONS } from '../constants';

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
      default: 'my-app',
      message: 'Enter the app name:',
    },
    {
      type: 'confirm',
      default: 'yes',
      name: 'isRoutingNeeded',
      message: 'Do you need routing?',
    },
    {
      type: 'list',
      name: 'stateManagement',
      choices: [STATE_MANAGEMENT.Redux.label, STATE_MANAGEMENT.MobX.label],
      message: 'Choose your preferred state management:',
    },
    {
      type: 'checkbox',
      name: 'reduxAddons',
      choices: [REDUX_ADDONS['Redux Saga'].label, REDUX_ADDONS['Redux Logger'].label, REDUX_ADDONS['Redux Form'].label],
      when: (answers: any) => answers.stateManagement === STATE_MANAGEMENT.Redux.label,
      message: 'Choose any additional dependencies needed for state management:',
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
      default: '@types/react-bootstrap @types/lodash @types/moment',
    },
  ]);
}