import chalk from "chalk";
const { name, bugs } = require('../package.json');

const messages = {
  welcome: `Welcome to ${chalk.bold(name)}! A zero config lightweight CLI for automating React boilerplate setup.`,
  walkThrough: 'This utility will walk you through steps to configure a React boilerplate as per your requirements.',
  complete: 'Setup is complete! You can check app in',
  thanks: `Thanks for using ${chalk.bold(name)}. Happy Coding! </>`,
  raiseIssue: `Raise an issue here: ${chalk.green(bugs.url)}`,
}

const features = [
  'Supports both JavaScript and TypeScript',
  'Installs both Dependencies and Dev Dependencies',
  'Folder structure setup',
  'Routing Setup',
  'Store Setup',
];

export {
  messages,
  features,
}