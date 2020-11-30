// TODO: move below to a messages folder

import chalk from "chalk";

const heading = 'Welcome to CRA Setup! A zero config lightweight CLI for automating CRA boilerplate setup.';

const features = [
  'Supports both JavaScript and TypeScript',
  'Installs both Dependencies and Dev Dependencies',
  'Folder structure setup',
  'Routing Setup',
  'Store Setup',
];

const info = 'This utility will walk you through steps to configure a CRA boilerplate as per your requirements.';

const completeIn = 'Setup is complete! You can check app in';

const thanks = 'Thanks for using CRA Setup. Happy Coding! </>';

const issues = `Raise an issue here: ${chalk.green('https://github.com/vinaysharma14/cra-setup/issues')}`;

export {
  info,
  thanks,
  issues,
  heading,
  features,
  completeIn,
}