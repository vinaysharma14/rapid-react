import { run, input } from './utils';

const init = async () => {
  console.log('Welcome to CRA Setup!\n');

  try {
    // ask user for app name
    const appName = await input('Let\'s start with your app name:');

    // create a react app with the name
    await run('\nCreating React app...', 'npx', ['create-react-app', appName], 'React app has been successfully created!');

    //TODO: replace hardcoded dependencies by dynamic ones

    // install dependencies in the app directory
    await run('Installing dependencies...', 'npm', ['i', 'moment', 'lodash'], 'Dependencies have been successfully installed!', appName);
  } catch (error) {
    console.error(error.message);
  }
}

init();