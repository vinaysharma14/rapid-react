#!/usr/bin/env node
import chalk from 'chalk';
import figlet from 'figlet';

import { commands } from './constants';
import { run, getFileExtensions } from './utils';
import { name, messages, features } from './messages';

import {
  notify,
  handleSetup,
  checkUpdate,
  mappedAnswers,
  writeFolderStructure,
  generateScaffoldConfig,
} from './scripts';

const init = async () => {
  const {
    welcome,
    walkThrough,
    complete,
    thanks,
    raiseIssue,
  } = messages;

  const asciiArt = figlet.textSync(name, { font: 'ANSI Shadow' });

  // greetings
  console.log(`\n${chalk.cyan(asciiArt)}`);

  await checkUpdate();

  console.log(`${welcome}\n`);
  features.forEach((value, index) => console.log(`${chalk.green('✔')} ${value} ${index === features.length - 1 ? '\n' : ''}`));
  console.log(`${chalk.cyan(walkThrough)}\n`);

  try {
    // ask user for app information via an interactive setup
    const inputs = await handleSetup();

    // map the raw input in a proper structure
    const {
      tsUsed,
      routes,
      appName,
      folders,
      scssUsed,
      sagaUsed,
      useLogger,
      namedExport,
      dependencies,
      stateManagement,
      devDependencies,
      storesOrReducers,
    } = mappedAnswers(inputs);

    // directory where app would be installed
    const directory = `${process.cwd()}/${appName}`;

    // get extension of component, stylesheet and general files
    const fileExtensions = getFileExtensions(tsUsed, scssUsed);

    // generate folder structure scaffold
    const scaffoldConfig = generateScaffoldConfig(
      tsUsed,
      routes,
      folders,
      sagaUsed,
      useLogger,
      namedExport,
      fileExtensions,
      stateManagement ? { type: stateManagement, storesOrReducers } : undefined,
    );

    // notify user about the directory
    console.log(`\nSetting up a new React app in ${chalk.green(directory)}\n`);

    const {
      installReact,
      installDependencies,
      installDevDependencies,
    } = commands;

    // create a react app with the given name and typescript template flag conditionally
    await run(installReact, [appName, ...tsUsed ? ['--template typescript'] : []]);

    // write the folder structure in project directory using the scaffold config
    await writeFolderStructure(
      appName,
      scaffoldConfig,
      fileExtensions,
      !!routes.length,
      namedExport,
      stateManagement,
    );

    // install dependencies in the project directory
    await run(installDependencies, dependencies, appName);

    // install dev dependencies in the project directory
    await run(installDevDependencies, devDependencies, appName);

    // ending note
    console.log(`\n${complete} ${chalk.green(directory)}\n`);
    console.log(thanks);
    console.log(`${raiseIssue}\n`);
    await notify();
  } catch (error) {
    console.error(error.message);
  }
};

init();
