import boxen from 'boxen';
import chalk from 'chalk';
import semver from 'semver';
import pkgJson from 'package-json';
import semverDiff from 'semver-diff';

import { capitalizeFirstLetter } from '../utils';

const { name, version } = require('../../package.json');

export const checkUpdate = async() => {
  const { version: latestVersion } = await pkgJson(name);
  const updateAvailable = semver.lt(version, latestVersion as string);

  if(updateAvailable){
    let updateType = '';
    let verDiff = semverDiff(version, latestVersion as string);

    if(verDiff) {
      updateType = capitalizeFirstLetter(verDiff);
    }

    const msg = {
      runUpdate: `Run ${chalk.green(`npm update ${name} -g`)} to update.`,
      updateAvailable: `${chalk.bold(updateType)} update available ${chalk.red(version)} → ${chalk.green(latestVersion)}`,
      changelog: `${chalk.yellow('Changelog:')} ${chalk.cyan(`https://github.com/vinaysharma14/rapid-react/releases/tag/${latestVersion}`)}`,
    };

    console.log(boxen(`${msg.updateAvailable}\n${msg.runUpdate}\n\n${msg.changelog}`, {
      margin: 1,
      padding: 1,
      align: 'center',
      borderStyle: 'round',
    }));
  }
};

