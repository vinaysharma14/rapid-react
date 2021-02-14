const player = require('play-sound')();

export const notify = () => {
  player.play(`${__dirname.replace('scripts', 'assets/notification.mp3')}`, function(error: string) {
    error && console.error(error);
  });
};
