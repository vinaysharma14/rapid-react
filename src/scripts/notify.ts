import { exec } from 'child_process';

const player = require('play-sound')();
const asyncExec = require('util').promisify(exec);

export const notify = async(winPlatform: boolean) => {
  const assetPath = __dirname.replace('scripts', 'assets/notification.mp3');

  if (winPlatform) {
    // handle audio playback on windows machine explicitly
    // code reference has been taken from https://github.com/nomadhoc/sound-play

    const command = 'powershell -c';
    const playAudio = '$player.Play();';
    const setVolume = '$player.Volume = 1;';
    const loadAudioFile = `$player.open('${assetPath}');`;
    const addPresentationCore = 'Add-Type -AssemblyName presentationCore;';
    const createMediaPlayer = '$player = New-Object system.windows.media.mediaplayer;';
    const stopAudio = 'Start-Sleep 1; Start-Sleep -s $player.NaturalDuration.TimeSpan.TotalSeconds;Exit;';

    await asyncExec( `${command} ${addPresentationCore} ${createMediaPlayer} ${loadAudioFile} ${setVolume} ${playAudio} ${stopAudio}`);
  } else {
    player.play(assetPath, function(error: string) {
      error && console.error(error);
    });
  }
};
