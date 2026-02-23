const ONEMORE_EFFECT_DURATION_MS = 2400;

let onemoreEffectTimeoutId = null;

const getOnemoreEffectElement = () => document.querySelector('.js-onemore-effect');

export const resetOnemoreEffect = () => {
  if (onemoreEffectTimeoutId !== null) {
    window.clearTimeout(onemoreEffectTimeoutId);
    onemoreEffectTimeoutId = null;
  }

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

  if (onemoreEffectTimeoutId !== null) {
    window.clearTimeout(onemoreEffectTimeoutId);
    onemoreEffectTimeoutId = null;
  }

  onemoreEffect.classList.remove('js-onemore-playing');
  onemoreEffect.hidden = false;

  void onemoreEffect.offsetWidth;

  onemoreEffect.classList.add('js-onemore-playing');

  onemoreEffectTimeoutId = window.setTimeout(() => {
    onemoreEffect.classList.remove('js-onemore-playing');
    onemoreEffect.hidden = true;
    onemoreEffectTimeoutId = null;
  }, ONEMORE_EFFECT_DURATION_MS);
};
