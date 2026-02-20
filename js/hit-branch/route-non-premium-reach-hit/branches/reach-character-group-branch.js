// リーチ後キャラ群演出の分岐先処理です。
export const runReachCharacterGroupBranch = (detail) => {
  window.dispatchEvent(new CustomEvent('slot:hit-effect-reach-character-group', { detail }));
  window.dispatchEvent(
    new CustomEvent('slot:reach-hit-effect-finished', {
      detail: {
        ...detail,
        effectType: 'character-group',
      },
    }),
  );
  console.log('リーチ後当たり演出: キャラ群');
};
