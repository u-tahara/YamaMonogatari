const REACH_HIT_EFFECT_FINISHED_EVENT_NAME = 'slot:reach-miss-effect-finished';
const CHARACTER_GROUP_COMMENT_MOVIE_PATH = './movie/niconico.webm';

// リーチ後キャラ群演出（コメント群）分岐の処理です。
export const runReachCharacterGroupCommentBranch = (detail) => {
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
          effectType: 'reach-character-group-comment',
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
          effectType: 'reach-character-group-comment',
        },
      }),
    );
  };

  if (characterGroupVideo.getAttribute('src') !== CHARACTER_GROUP_COMMENT_MOVIE_PATH) {
    characterGroupVideo.setAttribute('src', CHARACTER_GROUP_COMMENT_MOVIE_PATH);
    characterGroupVideo.load();
  }

  characterGroupVideo.currentTime = 0;
  characterGroupVideo.hidden = false;

  characterGroupVideo.addEventListener('ended', finalize, { once: true });
  characterGroupVideo.addEventListener('error', finalize, { once: true });

  // TODO: 後続対応用（コメント群）
  characterGroupVideo.play().catch(() => {
    finalize();
  });

  console.log('リーチ後外れ演出: コメント群');
};
