const player = require('play-sound')();

export const notify = () => {
  const [dir] = __dirname.split('rapid-react/')[1].split('/');

  player.play(`${dir}/assets/notification.mp3`, function(error: string) {
    error && console.error(error);
  });
};
