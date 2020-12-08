#!/usr/bin/env node
import chalk from 'chalk';

import { commands } from './constants';
import { messages, features } from './messages';
import { run, getFileExtensions } from './utils';

import {
  handleSetup,
  mappedAnswers,
  writeFolderStructure,
  generateScaffoldConfig
} from './scripts';

const init = async () => {
  const {
    welcome,
    walkThrough,
    complete,
    thanks,
    raiseIssue,
  } = messages;

  // greetings
  console.log(`\n${welcome}\n`);
  features.forEach((value, index) => console.log(`${chalk.green('✔')} ${value} ${index === features.length - 1 ? '\n' : ''}`));
  console.log(`${chalk.cyan(walkThrough)}\n`)

  try {
    // ask user for app information via an interactive setup
    const inputs = await handleSetup();

    // map the raw input in a proper structure
    const {
      routes,
      appName,
      scssUsed,
      namedExport,
      dependencies,
      devDependencies,
      typescriptUsed: ts,
    } = mappedAnswers(inputs);

    // directory where app would be installed
    const directory = `${process.cwd()}/${appName}`;

    // get extension of component, stylesheet and general files
    const fileExtensions = getFileExtensions(ts, scssUsed);

    // generate folder structure scaffold
    const scaffoldConfig = generateScaffoldConfig(routes, ts, namedExport, fileExtensions);

    // notify user about the directory
    console.log(`\nSetting up a new React app in ${chalk.green(directory)}\n`);

    const {
      installReact,
      installDependencies,
      installDevDependencies,
    } = commands;

    // create a react app with the given name and typescript template flag conditionally
    await run(installReact, [appName, ...ts ? ['--template typescript'] : []]);

    // write the folder structure in project directory using the scaffold config
    await writeFolderStructure(appName, scaffoldConfig, fileExtensions, !!routes.length, namedExport);

    // install dependencies in the project directory
    await run(installDependencies, dependencies, appName);

    // install dev dependencies in the project directory
    await run(installDevDependencies, devDependencies, appName);

    // ending note
    console.log(`\n${complete} ${chalk.green(directory)}\n`);
    console.log(thanks);
    console.log(`${raiseIssue}\n`);
  } catch (error) {
    console.error(error.message);
  }
}

init();