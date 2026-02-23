const LEVER_ON_AUDIO_EVENT_NAME = 'slot:lever-on';
const LEVER_ON_CUTIN_CENTER_EVENT_NAME = 'slot:lever-on-cutin-center';
const STOP_BUTTON_AUDIO_EVENT_NAME = 'slot:stop-button-pressed';
const REEL_STOP_AUDIO_EVENT_NAME = 'slot:reel-stop-confirmed';
const SIGNBOARD_UP_AUDIO_EVENT_NAME = 'slot:signboard-up';
const SIGNBOARD_DOWN_AUDIO_EVENT_NAME = 'slot:signboard-down';
const EFFECT_AUDIO_VOLUME = 0.3;
const HELP_AUDIO_DEFAULT_VOLUME = 1;
const SIGNBOARD_AUDIO_DEFAULT_VOLUME = 0.3;
const LEVER_ON_CUTIN_MOVIE_DEFAULT_VOLUME = 0.3;
const REACH_CHARACTER_GROUP_DEFAULT_VOLUME = 1;
const REACH_CHANGE_MOVIE_DEFAULT_VOLUME = 0.6;
const PUSH_BUTTON_MOVIE_DEFAULT_VOLUME = 0.2;
const PREMIUM_BLACKOUT_MOVIE_DEFAULT_VOLUME = 0.4;
const PREMIUM_CHANGE_MOVIE_DEFAULT_VOLUME = 0.5;
const CHEERS_AUDIO_DEFAULT_VOLUME = 0.6;

const bgmAudio = new Audio('./audio/bgm.mp3');
bgmAudio.loop = true;
bgmAudio.volume = 0.07;

const leverAudio = new Audio('./audio/lever.mp3');
const buttonAudio = new Audio('./audio/button.mp3');
const stopAudio = new Audio('./audio/stop.mp3');
const helpAudio = new Audio('./audio/help.wav');
const signboardUpAudio = new Audio('./audio/up.mp3');
const signboardDownAudio = new Audio('./audio/down.mp3');
const cheersAudio = new Audio('./audio/cheers.mp3');


const setLeverOnCutinMovieVolume = (volume) => {
  const normalizedVolume = Number.isFinite(volume) ? Math.min(1, Math.max(0, volume)) : LEVER_ON_CUTIN_MOVIE_DEFAULT_VOLUME;
  const cutinMovie = document.querySelector('.js-lever-on-cutin-movie-effect');

  if (!cutinMovie) {
    return normalizedVolume;
  }

  cutinMovie.muted = false;
  cutinMovie.volume = normalizedVolume;

  return cutinMovie.volume;
};

const setReachCharacterGroupVolume = (volume) => {
  const normalizedVolume = Number.isFinite(volume) ? Math.min(1, Math.max(0, volume)) : REACH_CHARACTER_GROUP_DEFAULT_VOLUME;
  const characterGroupMovie = document.querySelector('.js-reach-character-group-effect');

  if (!characterGroupMovie) {
    return normalizedVolume;
  }

  characterGroupMovie.muted = false;
  characterGroupMovie.volume = normalizedVolume;

  return characterGroupMovie.volume;
};


const setReachChangeMovieVolume = (volume) => {
  const normalizedVolume = Number.isFinite(volume) ? Math.min(1, Math.max(0, volume)) : REACH_CHANGE_MOVIE_DEFAULT_VOLUME;
  const reachChangeMovie = document.querySelector('.js-reach-change-movie');

  if (!reachChangeMovie) {
    return normalizedVolume;
  }

  reachChangeMovie.muted = false;
  reachChangeMovie.volume = normalizedVolume;

  return reachChangeMovie.volume;
};

const setPushButtonMovieVolume = (volume) => {
  const normalizedVolume = Number.isFinite(volume) ? Math.min(1, Math.max(0, volume)) : PUSH_BUTTON_MOVIE_DEFAULT_VOLUME;
  const pushButtonMovie = document.querySelector('.js-push-button-movie');

  if (!pushButtonMovie) {
    return normalizedVolume;
  }

  pushButtonMovie.muted = false;
  pushButtonMovie.volume = normalizedVolume;

  return pushButtonMovie.volume;
};


const setPremiumBlackoutMovieVolume = (volume) => {
  const normalizedVolume = Number.isFinite(volume) ? Math.min(1, Math.max(0, volume)) : PREMIUM_BLACKOUT_MOVIE_DEFAULT_VOLUME;
  const premiumBlackoutMovie = document.querySelector('.js-premium-blackout-movie');

  if (!premiumBlackoutMovie) {
    return normalizedVolume;
  }

  premiumBlackoutMovie.muted = false;
  premiumBlackoutMovie.volume = normalizedVolume;

  return premiumBlackoutMovie.volume;
};

const setPremiumChangeMovieVolume = (volume) => {
  const normalizedVolume = Number.isFinite(volume) ? Math.min(1, Math.max(0, volume)) : PREMIUM_CHANGE_MOVIE_DEFAULT_VOLUME;
  const premiumChangeMovie = document.querySelector('.js-premium-change-movie');

  if (!premiumChangeMovie) {
    return normalizedVolume;
  }

  premiumChangeMovie.muted = false;
  premiumChangeMovie.volume = normalizedVolume;

  return premiumChangeMovie.volume;
};

const setHelpAudioVolume = (volume) => {
  const normalizedVolume = Number.isFinite(volume) ? Math.min(1, Math.max(0, volume)) : HELP_AUDIO_DEFAULT_VOLUME;

  helpAudio.volume = normalizedVolume;

  return helpAudio.volume;
};

const setSignboardAudioVolume = (volume) => {
  const normalizedVolume = Number.isFinite(volume) ? Math.min(1, Math.max(0, volume)) : SIGNBOARD_AUDIO_DEFAULT_VOLUME;

  signboardUpAudio.volume = normalizedVolume;
  signboardDownAudio.volume = normalizedVolume;

  return normalizedVolume;
};


const setCheersAudioVolume = (volume) => {
  const normalizedVolume = Number.isFinite(volume) ? Math.min(1, Math.max(0, volume)) : CHEERS_AUDIO_DEFAULT_VOLUME;

  cheersAudio.volume = normalizedVolume;

  return cheersAudio.volume;
};

const playCheersAudio = () => {
  playEffect(cheersAudio);
};

const pauseBgm = () => {
  bgmAudio.pause();
};

const stopBgm = () => {
  bgmAudio.pause();
  bgmAudio.currentTime = 0;
};

const resumeBgm = () => {
  playBgm();
};

window.setHelpAudioVolume = setHelpAudioVolume;
window.setSignboardAudioVolume = setSignboardAudioVolume;
window.setLeverOnCutinMovieVolume = setLeverOnCutinMovieVolume;
window.setReachCharacterGroupVolume = setReachCharacterGroupVolume;
window.setReachChangeMovieVolume = setReachChangeMovieVolume;
window.setPushButtonMovieVolume = setPushButtonMovieVolume;
window.setPremiumBlackoutMovieVolume = setPremiumBlackoutMovieVolume;
window.setPremiumChangeMovieVolume = setPremiumChangeMovieVolume;
window.setCheersAudioVolume = setCheersAudioVolume;
window.playCheersAudio = playCheersAudio;
window.pauseBgm = pauseBgm;
window.stopBgm = stopBgm;
window.resumeBgm = resumeBgm;

[leverAudio, buttonAudio, stopAudio].forEach((effectAudio) => {
  effectAudio.volume = EFFECT_AUDIO_VOLUME;
});
setHelpAudioVolume(HELP_AUDIO_DEFAULT_VOLUME);
setSignboardAudioVolume(SIGNBOARD_AUDIO_DEFAULT_VOLUME);
setLeverOnCutinMovieVolume(LEVER_ON_CUTIN_MOVIE_DEFAULT_VOLUME);
setReachCharacterGroupVolume(REACH_CHARACTER_GROUP_DEFAULT_VOLUME);
setReachChangeMovieVolume(REACH_CHANGE_MOVIE_DEFAULT_VOLUME);
setPushButtonMovieVolume(PUSH_BUTTON_MOVIE_DEFAULT_VOLUME);
setPremiumBlackoutMovieVolume(PREMIUM_BLACKOUT_MOVIE_DEFAULT_VOLUME);
setPremiumChangeMovieVolume(PREMIUM_CHANGE_MOVIE_DEFAULT_VOLUME);
setCheersAudioVolume(CHEERS_AUDIO_DEFAULT_VOLUME);

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

window.addEventListener(LEVER_ON_CUTIN_CENTER_EVENT_NAME, () => {
  playEffect(helpAudio);
});

window.addEventListener(STOP_BUTTON_AUDIO_EVENT_NAME, () => {
  playEffect(buttonAudio);
});

window.addEventListener(REEL_STOP_AUDIO_EVENT_NAME, () => {
  playEffect(stopAudio);
});

window.addEventListener(SIGNBOARD_UP_AUDIO_EVENT_NAME, () => {
  playEffect(signboardUpAudio);
});

window.addEventListener(SIGNBOARD_DOWN_AUDIO_EVENT_NAME, () => {
  playEffect(signboardDownAudio);
});
