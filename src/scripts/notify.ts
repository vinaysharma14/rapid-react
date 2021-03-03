import os from 'os';
import { run } from '../utils';
import { Command } from '../types';

const player = require('play-sound')();

export const notify = () => {
  const assetPath = __dirname.replace('scripts', 'assets/notification.mp3');

  if (os.platform() === 'win32') {
    const winCmd: Command = {
      cmd: 'start',
      args: [assetPath],
      msg: '',
      err: '',
      success: '',
    };

    run(winCmd, []);
  } else {
    player.play(assetPath, function(error: string) {
      error && console.error(error);
    });
  }
};
