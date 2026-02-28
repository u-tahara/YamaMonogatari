const PROBABILITY_VALUES = {
  judgeSpinResult: 1 / 13.7, // スピン結果が当たりになる基本確率
  createHitNumbersPremium: 0.1, // 当たり成立時にプレミア7揃いへ分岐する確率
  shouldShowMissReach: 0.3, // ハズレ時にリーチ形を生成する確率

  routeNonPremiumHitSignboard: 0.25, // 通常当たりで看板演出へ分岐する確率
  routeNonPremiumHitCutIn: 0.7, // 通常当たりでカットイン演出へ分岐する確率
  routeNonPremiumHitCutInWhite: 0.05, // 通常当たりカットインが白になる確率
  routeNonPremiumHitCutInBlue: 0.15, // 通常当たりカットインが青になる確率
  routeNonPremiumHitCutInGreen: 0.4, // 通常当たりカットインが緑になる確率
  routeNonPremiumHitCutInRed: 0.35, // 通常当たりカットインが赤になる確率
  routeSignboardVeryHot: 0.25, // 通常当たり看板が激アツになる確率
  routeSignboardHot: 0.3, // 通常当たり看板がアツになる確率
  routeSignboardSlightlyHot: 0.35, // 通常当たり看板がちょいアツになる確率

  routeNonPremiumReachHitCutIn: 0.65, // リーチ当たりでカットインへ分岐する確率
  routeNonPremiumReachHitCharacterGroup: 0.25, // リーチ当たりで群演出へ分岐する確率
  routeNonPremiumReachHitSuzuBackground: 0.05, // リーチ当たりでスズ背景へ分岐する確率
  routeReachCutInWhite: 0.05, // リーチ当たりカットインが白になる確率
  routeReachCutInBlue: 0.05, // リーチ当たりカットインが青になる確率
  routeReachCutInGreen: 0.2, // リーチ当たりカットインが緑になる確率
  routeReachCutInRed: 0.55, // リーチ当たりカットインが赤になる確率
  routeReachCharacterGroupMany: 0.4, // リーチ当たり群演出が「多い」になる確率
  routeReachCharacterGroupFew: 0.2, // リーチ当たり群演出が「少ない」になる確率

  routeMissNoReachSignboard: 0.15, // ハズレ非リーチ時に看板演出へ分岐する確率
  routeMissNoReachCutIn: 0.2, // ハズレ非リーチ時にカットイン演出へ分岐する確率
  routeMissCutInWhite: 0.35, // ハズレ非リーチカットインが白になる確率
  routeMissCutInBlue: 0.3, // ハズレ非リーチカットインが青になる確率
  routeMissCutInGreen: 0.3, // ハズレ非リーチカットインが緑になる確率
  routeMissCutInRed: 0.04, // ハズレ非リーチカットインが赤になる確率
  routeMissSignboardVeryHot: 0.01, // ハズレ非リーチ看板が激アツになる確率
  routeMissSignboardHot: 0.01, // ハズレ非リーチ看板がアツになる確率
  routeMissSignboardSlightlyHot: 0.25, // ハズレ非リーチ看板がちょいアツになる確率

  routeMissReachCutIn: 0.2, // ハズレリーチ時にカットイン演出へ分岐する確率
  routeMissReachCharacterGroup: 0.2, // ハズレリーチ時に群演出へ分岐する確率
  routeMissReachCutInWhite: 0.45, // ハズレリーチカットインが白になる確率
  routeMissReachCutInBlue: 0.25, // ハズレリーチカットインが青になる確率
  routeMissReachCutInGreen: 0.25, // ハズレリーチカットインが緑になる確率
  routeMissReachCutInRed: 0.04, // ハズレリーチカットインが赤になる確率

  routeMissReachLeverOnSignboard: 0.2, // レバーON後ハズレリーチ時に看板演出へ分岐する確率
  routeMissReachLeverOnCutIn: 0.25, // レバーON後ハズレリーチ時にカットイン演出へ分岐する確率
  routeMissReachLeverOnCutInWhite: 0.4, // レバーON後ハズレリーチカットインが白になる確率
  routeMissReachLeverOnCutInBlue: 0.35, // レバーON後ハズレリーチカットインが青になる確率
  routeMissReachLeverOnCutInGreen: 0.14, // レバーON後ハズレリーチカットインが緑になる確率
  routeMissReachLeverOnCutInRed: 0.1, // レバーON後ハズレリーチカットインが赤になる確率
  routeMissReachLeverOnSignboardVeryHot: 0.01, // レバーON後ハズレリーチ看板が激アツになる確率
  routeMissReachLeverOnSignboardHot: 0.1, // レバーON後ハズレリーチ看板がアツになる確率
  routeMissReachLeverOnSignboardSlightlyHot: 0.3, // レバーON後ハズレリーチ看板がちょいアツになる確率

  shouldTriggerOnemoreBonus: 0.5, // ONE MORE演出後にボーナスへ遷移する確率
  reachMissUnchangeBlue: 0.05, // リーチミス青カットイン時にunchangeへ置換する確率
  reachMissUnchangeGreen: 0.1, // リーチミス緑カットイン時にunchangeへ置換する確率
  reachMissUnchangeRed: 0.7, // リーチミス赤カットイン時にunchangeへ置換する確率
  reachMissUnchangeGold: 1, // リーチミス金カットイン時にunchangeへ置換する確率
  reachMissUnchangeCharacterGroupMany: 0.4, // リーチミス群（多い）時にunchangeへ置換する確率
  reachMissUnchangeCharacterGroupFew: 0.3, // リーチミス群（少ない）時にunchangeへ置換する確率
  reachMissUnchangeCharacterGroupComment: 0.2, // リーチミス群（コメント）時にunchangeへ置換する確率
};

// 画面内の演出抽選はこの辞書を参照して確率を取得します。
// 各値は 0〜1 の割合で定義し、キーは getProbabilityValue に渡す識別子です。
export const getProbabilityValue = (key) => PROBABILITY_VALUES[key];
