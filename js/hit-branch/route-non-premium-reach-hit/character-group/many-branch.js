const REACH_HIT_EFFECT_FINISHED_EVENT_NAME = 'slot:reach-hit-effect-finished';

// リーチ後キャラ群演出（多）分岐の処理です。
export const runReachCharacterGroupManyBranch = (detail) => {
  const characterGroupVideo = document.querySelector('.js-reach-character-group-effect');
  const cutinImage = document.querySelector('.js-reach-cutin-hit-effect');
  const signboardImage = document.querySelector('.js-signboard-hit-effect');

  if (cutinImage) {
    cutinImage.hidden = true;
  }

  if (signboardImage) {
    signboardImage.hidden = true;
  }

  if (!characterGroupVideo) {
    window.dispatchEvent(
      new CustomEvent(REACH_HIT_EFFECT_FINISHED_EVENT_NAME, {
        detail: {
          ...detail,
          effectType: 'reach-character-group-many',
        },
      }),
    );
    return;
  }

  let isFinished = false;
  const finalize = () => {
    if (isFinished) {
      return;
    }

    isFinished = true;
    characterGroupVideo.hidden = true;
    window.dispatchEvent(
      new CustomEvent(REACH_HIT_EFFECT_FINISHED_EVENT_NAME, {
        detail: {
          ...detail,
          effectType: 'reach-character-group-many',
        },
      }),
    );
  };

  characterGroupVideo.currentTime = 0;
  characterGroupVideo.hidden = false;

  characterGroupVideo.addEventListener('ended', finalize, { once: true });
  characterGroupVideo.addEventListener('error', finalize, { once: true });

  // TODO: 後続対応用（キャラ群（多））
  characterGroupVideo.play().catch(() => {
    finalize();
  });

  console.log('リーチ後当たり演出: キャラ群（多）');
};
