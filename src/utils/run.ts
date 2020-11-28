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

    console.log(message);

    process.addListener('error', (error) => reject(error))

    process.addListener('exit', () => {
      console.log(`${success}\n\n`);
      resolve('');
    })
  })
}