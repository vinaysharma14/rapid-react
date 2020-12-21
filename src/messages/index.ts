import chalk from "chalk";

const name = 'Rapid React';
const repo = 'https://github.com/vinaysharma14/rapid-react/issues';

const messages = {
  welcome: `Welcome to ${chalk.bold(name)}! A light weight interactive CLI Automation Tool 🛠️  for rapid scaffolding of React apps with Create React App under the hood. ⚛️`,
  walkThrough: 'This utility will walk you through steps to configure a React boilerplate as per your requirements.',
  complete: 'Setup is complete! You can check app in',
  thanks: `Thanks for using ${chalk.bold(name)}. Happy Coding! </>`,
  raiseIssue: `Found an issue? Raise here: ${chalk.green(repo)}`,
};

const features = [
  'Supports both JavaScript and TypeScript',
  'Installs both Dependencies and Dev Dependencies',
  'Folder structure setup',
  'Routing Setup',
  'Store Setup',
];

export {
  name,
  messages,
  features,
};
