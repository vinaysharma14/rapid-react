import chalk from "chalk";

const name = '@react/cli';
const repo = 'https://github.com/vinaysharma14/react-cli/issues';

const messages = {
  welcome: `Welcome to ${chalk.bold(name)}! A zero config lightweight CLI for automating React boilerplate setup.`,
  walkThrough: 'This utility will walk you through steps to configure a React boilerplate as per your requirements.',
  complete: 'Setup is complete! You can check app in',
  thanks: `Thanks for using ${chalk.bold(name)}. Happy Coding! </>`,
  raiseIssue: `Raise an issue here: ${chalk.green(repo)}`,
};

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
};
