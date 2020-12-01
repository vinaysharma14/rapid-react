import ora from 'ora';
import { spawn } from 'child_process';

export const run = (
  msg: string,
  success: string,
  cmd: string,
  args: string[],
  cwd?: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const process = spawn(cmd, args, { shell: true, cwd });

    const spinner = ora(`${msg}...`).start();
    spinner.start();

    process.addListener('error', (error) => {
      spinner.fail();
      reject(error);
    })

    process.addListener('exit', () => {
      spinner.succeed(success);
      resolve('');
    })
  })
}