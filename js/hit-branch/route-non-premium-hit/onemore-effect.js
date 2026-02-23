const ONEMORE_EFFECT_DURATION_MS = 2400;
const ONEMORE_EFFECT_DISPLAY_DELAY_MS = 1000;
const ONEMORE_AUDIO_DEFAULT_VOLUME = 0.6;
const ONEMORE_BONUS_TRIGGER_PROBABILITY = 0.5;
export const ONEMORE_BONUS_TRIGGERED_EVENT_NAME = 'slot:onemore-bonus-triggered';
export const ONEMORE_EFFECT_FINISHED_EVENT_NAME = 'slot:onemore-effect-finished';

let onemoreEffectDelayTimeoutId = null;
let onemoreEffectHideTimeoutId = null;

const onemoreAudio = new Audio('./audio/onemore.wav');

const getOnemoreEffectElement = () => document.querySelector('.js-onemore-effect');
const shouldTriggerOnemoreBonus = () => Math.random() < ONEMORE_BONUS_TRIGGER_PROBABILITY;

const normalizeVolume = (volume) => {
  if (!Number.isFinite(volume)) {
    return ONEMORE_AUDIO_DEFAULT_VOLUME;
  }

  return Math.min(1, Math.max(0, volume));
};

export const setOnemoreAudioVolume = (volume) => {
  const normalizedVolume = normalizeVolume(volume);
  onemoreAudio.volume = normalizedVolume;

  return onemoreAudio.volume;
};

const playOnemoreAudio = () => {
  onemoreAudio.currentTime = 0;

  onemoreAudio
    .play()
    .catch(() => {
      // 自動再生制限などで再生できない場合は処理を継続します。
    });
};

export const resetOnemoreEffect = () => {
  if (onemoreEffectDelayTimeoutId !== null) {
    window.clearTimeout(onemoreEffectDelayTimeoutId);
    onemoreEffectDelayTimeoutId = null;
  }

  if (onemoreEffectHideTimeoutId !== null) {
    window.clearTimeout(onemoreEffectHideTimeoutId);
    onemoreEffectHideTimeoutId = null;
  }

  onemoreAudio.pause();
  onemoreAudio.currentTime = 0;

  const onemoreEffect = getOnemoreEffectElement();

  if (!onemoreEffect) {
    return;
  }

  onemoreEffect.classList.remove('js-onemore-playing');
  onemoreEffect.hidden = true;
};

export const showOnemoreEffect = () => {
  const onemoreEffect = getOnemoreEffectElement();

  if (!onemoreEffect) {
    return;
  }

  if (onemoreEffectDelayTimeoutId !== null) {
    window.clearTimeout(onemoreEffectDelayTimeoutId);
    onemoreEffectDelayTimeoutId = null;
  }

  if (onemoreEffectHideTimeoutId !== null) {
    window.clearTimeout(onemoreEffectHideTimeoutId);
    onemoreEffectHideTimeoutId = null;
  }

  onemoreEffect.classList.remove('js-onemore-playing');
  onemoreEffect.hidden = true;

  onemoreEffectDelayTimeoutId = window.setTimeout(() => {
    onemoreEffect.hidden = false;

    void onemoreEffect.offsetWidth;

    onemoreEffect.classList.add('js-onemore-playing');
    playOnemoreAudio();

    onemoreEffectHideTimeoutId = window.setTimeout(() => {
      onemoreEffect.classList.remove('js-onemore-playing');
      onemoreEffect.hidden = true;

      if (shouldTriggerOnemoreBonus()) {
        window.dispatchEvent(new Event(ONEMORE_BONUS_TRIGGERED_EVENT_NAME));
      }

      window.dispatchEvent(new Event(ONEMORE_EFFECT_FINISHED_EVENT_NAME));

      onemoreEffectHideTimeoutId = null;
    }, ONEMORE_EFFECT_DURATION_MS);

    onemoreEffectDelayTimeoutId = null;
  }, ONEMORE_EFFECT_DISPLAY_DELAY_MS);
};

setOnemoreAudioVolume(ONEMORE_AUDIO_DEFAULT_VOLUME);
window.setOnemoreAudioVolume = setOnemoreAudioVolume;
