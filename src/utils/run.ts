import ora from 'ora';
import { spawn } from 'child_process';

export const run = (
  message: string,
  command: string,
  args: string[],
  success: string,
  cwd?: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { shell: true, cwd });

    const spinner = ora(`${message}...`).start();
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