import ora from 'ora';
import { spawn } from 'child_process';

import { Command } from '../types';

export const run = (
  command: Command,
  additionalArgs: Command['args'],
  cwd?: string,
): Promise<string> => {
  const { msg, cmd, success, args } = command;

  return new Promise((resolve, reject) => {
    const process = spawn(cmd, [...args, ...additionalArgs], { shell: true, cwd });

    const spinner = ora(`${msg}...`).start();
    spinner.start();

    process.addListener('error', (error) => {
      spinner.fail();
      reject(error);
    });

    process.addListener('exit', () => {
      spinner.succeed(success);
      resolve('');
    });
  });
};
