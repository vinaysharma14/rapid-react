import { CommandCollection } from "../types";

export const commands: CommandCollection = {
  installReact: {
    cmd: 'npx',
    args: ['create-react-app'],
    msg: 'Installing create-react-app',
    err: 'Create react app installation failed.',
    success: 'Create react app successfully installed!',
  },
  installDependencies: {
    cmd: 'npm',
    args: ['i'],
    msg: 'Installing dependencies',
    err: 'Dependencies installation failed.',
    success: 'Dependencies successfully installed!',
  },
  installDevDependencies: {
    cmd: 'npm',
    args: ['i', '-D'],
    msg: 'Installing dev dependencies',
    err: 'Dev dependencies installation failed.',
    success: 'Dev dependencies successfully installed!',
  },
};
