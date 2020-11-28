import { run } from './utils';
import { handleSetup, mappedAnswers } from './scripts';

const init = async () => {
  console.log('Welcome to CRA Setup!\n');

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
    await run('\nCreating React app...', 'npx', ['create-react-app', appName, ...language === 'Typescript' ? ['--template typescript'] : []], 'React app has been successfully created!');

    // install dependencies in the app directory
    await run('Installing dependencies...', 'npm', ['i', ...dependencies], 'Dependencies have been successfully installed!', appName);

    // install dev dependencies in the app directory
    await run('Installing dev dependencies...', 'npm', ['i', '-D', ...devDependencies], 'Dependencies have been successfully installed!', appName);
  } catch (error) {
    console.error(error.message);
  }
}

init();