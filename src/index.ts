#!/usr/bin/env node
import chalk from 'chalk';
import figlet from 'figlet';
import { platform } from 'os';

import { commands } from './constants';
import { run, getFileExtensions } from './utils';
import { name, messages, features } from './messages';

import {
  notify,
  mapAnswers,
  handleSetup,
  checkUpdate,
  MAPPED_ANSWERS,
  writeFolderStructure,
  generateScaffoldConfig,
} from './scripts';

const { version } = require('../package.json');

const init = async () => {
  const { thanks, welcome, complete, raiseIssue, walkThrough } = messages;

  const winPlatform = platform() === 'win32';
  const asciiArt = figlet.textSync(name, { font: 'ANSI Shadow' });

  // greetings
  console.log(`\n${chalk.cyan(asciiArt)}`);
  console.log(chalk.green(`(v${version})\n`));

  await checkUpdate();

  console.log(`${welcome}\n`);
  features.forEach(value => console.log(`${chalk.green(winPlatform ? '√' : '✔')} ${value}`));
  console.log(`\n${chalk.cyan(walkThrough)}\n`);

  try {
    // ask user for app information via an interactive setup
    const inputs = await handleSetup();

    // map the raw input in a proper structure
    mapAnswers(inputs);

    // get mapped answer as required
    const { ts, name, scss, dependencies, devDependencies } = MAPPED_ANSWERS;

    // directory where app would be installed
    const directory = `${process.cwd()}/${name}`;

    // get extension of component, stylesheet and general files
    const fileExtensions = getFileExtensions(ts, scss);

    // generate folder structure scaffold
    const scaffoldConfig = generateScaffoldConfig(fileExtensions);

    // notify user about the directory
    console.log(`\nSetting up a new React app in ${chalk.green(directory)}\n`);

    const { installReact, installDependencies, installDevDependencies } = commands;

    // create a react app with the given name and typescript template flag conditionally
    await run(installReact, [name, ...ts ? ['--template typescript'] : []]);

    // write the folder structure in project directory using the scaffold config
    await writeFolderStructure(name, scaffoldConfig, fileExtensions);

    // install dependencies in the project directory
    await run(installDependencies, dependencies, name);

    // install dev dependencies in the project directory
    await run(installDevDependencies, devDependencies, name);

    // ending note
    console.log(`\n${complete} ${chalk.green(directory)}\n`);
    console.log(thanks);
    console.log(`${raiseIssue}\n`);
    await notify(winPlatform);
  } catch (error) {
    console.error(error.message);
  }
};

init();
