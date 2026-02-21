const LEVER_ON_AUDIO_EVENT_NAME = 'slot:lever-on';
const STOP_BUTTON_AUDIO_EVENT_NAME = 'slot:stop-button-pressed';
const REEL_STOP_AUDIO_EVENT_NAME = 'slot:reel-stop-confirmed';
const EFFECT_AUDIO_VOLUME = 0.3;

const bgmAudio = new Audio('./audio/bgm.mp3');
bgmAudio.loop = true;
bgmAudio.volume = 0.1;

const leverAudio = new Audio('./audio/lever.mp3');
const buttonAudio = new Audio('./audio/button.mp3');
const stopAudio = new Audio('./audio/stop.mp3');

[leverAudio, buttonAudio, stopAudio].forEach((effectAudio) => {
  effectAudio.volume = EFFECT_AUDIO_VOLUME;
});

const playBgm = () => {
  bgmAudio
    .play()
    .catch(() => {
      // ユーザー操作前の自動再生制限時は、後続の入力イベントで再試行します。
    });
};

const playEffect = (audio) => {
  audio.currentTime = 0;

  audio
    .play()
    .catch(() => {
      // 再生できない場合は次の入力で再試行されます。
    });
};

const resumeBgmOnce = () => {
  playBgm();
};

window.addEventListener('DOMContentLoaded', () => {
  playBgm();

  const bgmResumeEvents = ['pointerdown', 'keydown', 'touchstart'];

  bgmResumeEvents.forEach((eventName) => {
    window.addEventListener(eventName, resumeBgmOnce, { once: true });
  });
});

window.addEventListener(LEVER_ON_AUDIO_EVENT_NAME, () => {
  playEffect(leverAudio);
});

window.addEventListener(STOP_BUTTON_AUDIO_EVENT_NAME, () => {
  playEffect(buttonAudio);
});

window.addEventListener(REEL_STOP_AUDIO_EVENT_NAME, () => {
  playEffect(stopAudio);
});
