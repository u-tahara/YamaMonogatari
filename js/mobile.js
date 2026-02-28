// ユーザーエージェント情報からスマホ・タブレット端末かを判定します。
const isSmartphoneOrTablet = () => {
  const userAgent = navigator.userAgent || '';
  const isIPhone = /iPhone/i.test(userAgent);
  const isIPad = /iPad/i.test(userAgent);
  const isAndroidMobile = /Android/i.test(userAgent) && /Mobile/i.test(userAgent);
  const isAndroidTablet = /Android/i.test(userAgent) && !/Mobile/i.test(userAgent);
  const isIPadOS =
    navigator.platform === 'MacIntel' && typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1;

  return isIPhone || isIPad || isAndroidMobile || isAndroidTablet || isIPadOS;
};

if (isSmartphoneOrTablet()) {
  document.documentElement.classList.add('js-mobile-device');
}
