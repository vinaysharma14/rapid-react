import chalk from 'chalk';

import { run } from './utils';
import { handleSetup, mappedAnswers } from './scripts';
import { info, heading, features, done, issues } from './constants';

const init = async () => {
  // heading
  console.log(`${heading}\n`);

  // features
  features.forEach((value, index) => console.log(`${chalk.green('✔')} ${value} ${index === features.length - 1 ? '\n' : ''}`));

  // info
  console.log(`${chalk.blue('ℹ')} ${info}\n`)

  try {
    // ask user for app information via an interactive setup
    const inputs = await handleSetup();

    // map the raw input in a proper structure
    const {
      appName,
      language,
      dependencies,
      devDependencies,
    } = mappedAnswers(inputs);

    // create a react app with the name and typescript template flag conditionally
    await run('Installing CRA boilerplate', 'npx', ['create-react-app', appName, ...language === 'Typescript' ? ['--template typescript'] : []], 'CRA boilerplate successfully installed!');

    // install dependencies in the app directory
    await run('Installing dependencies', 'npm', ['i', ...dependencies], 'Dependencies successfully installed!', appName);

    // install dev dependencies in the app directory
    await run('Installing dev dependencies', 'npm', ['i', '-D', ...devDependencies], 'Dev dependencies successfully installed!', appName);

    // ending note
    console.log(done);
    console.log(issues);
  } catch (error) {
    console.error(error.message);
  }
}

init();