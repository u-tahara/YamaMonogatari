const PROBABILITY_VALUES = {
  judgeSpinResult: 1 / 13.7,
  createHitNumbersPremium: 0.1,
  shouldShowMissReach: 0.3,
  routeNonPremiumHitSignboard: 0.25,
  routeNonPremiumHitCutIn: 0.7,
  routeNonPremiumHitCutInWhite: 0.05,
  routeNonPremiumHitCutInBlue: 0.15,
  routeNonPremiumHitCutInGreen: 0.4,
  routeNonPremiumHitCutInRed: 0.35,
  routeSignboardVeryHot: 0.25,
  routeSignboardHot: 0.3,
  routeSignboardSlightlyHot: 0.35,
  routeNonPremiumReachHitCutIn: 0.65,
  routeNonPremiumReachHitCharacterGroup: 0.25,
  routeNonPremiumReachHitSuzuBackground: 0.05,
  routeReachCutInWhite: 0.05,
  routeReachCutInBlue: 0.05,
  routeReachCutInGreen: 0.2,
  routeReachCutInRed: 0.55,
  routeReachCharacterGroupMany: 0.4,
  routeReachCharacterGroupFew: 0.2,
  routeMissNoReachSignboard: 0.15,
  routeMissNoReachCutIn: 0.2,
  routeMissCutInWhite: 0.35,
  routeMissCutInBlue: 0.3,
  routeMissCutInGreen: 0.3,
  routeMissCutInRed: 0.04,
  routeMissSignboardVeryHot: 0.01,
  routeMissSignboardHot: 0.01,
  routeMissSignboardSlightlyHot: 0.25,
  routeMissReachCutIn: 0.2,
  routeMissReachCharacterGroup: 0.2,
  routeMissReachCutInWhite: 0.45,
  routeMissReachCutInBlue: 0.25,
  routeMissReachCutInGreen: 0.25,
  routeMissReachCutInRed: 0.04,
  routeMissReachLeverOnSignboard: 0.2,
  routeMissReachLeverOnCutIn: 0.25,
  routeMissReachLeverOnCutInWhite: 0.4,
  routeMissReachLeverOnCutInBlue: 0.35,
  routeMissReachLeverOnCutInGreen: 0.14,
  routeMissReachLeverOnCutInRed: 0.1,
  routeMissReachLeverOnSignboardVeryHot: 0.01,
  routeMissReachLeverOnSignboardHot: 0.1,
  routeMissReachLeverOnSignboardSlightlyHot: 0.3,
  shouldTriggerOnemoreBonus: 0.5,
  reachMissUnchangeBlue: 0.05,
  reachMissUnchangeGreen: 0.1,
  reachMissUnchangeRed: 0.7,
  reachMissUnchangeGold: 1,
  reachMissUnchangeCharacterGroupMany: 0.4,
  reachMissUnchangeCharacterGroupFew: 0.3,
  reachMissUnchangeCharacterGroupComment: 0.2,
};

export const getProbabilityValue = (key) => PROBABILITY_VALUES[key];

// 確率を管理している関数と値の一覧を返します。
// 値は 0.0〜1.0（割合）で統一し、必要に応じて「残り確率（else）」も明記しています。
export const getProbabilitySummary = () => [
  {
    // スロット全体の当たり判定（約 7.30%）
    functionName: 'judgeSpinResult',
    probability: 1 / 13.7,
    description: 'スピン結果が当たりになる基本確率。',
  },
  {
    // 当たり時にプレミア（7揃い）を選ぶ確率
    functionName: 'createHitNumbers',
    probability: 0.1,
    description: '当たり成立時にプレミア7揃いへ分岐する確率。',
  },
  {
    // ハズレ時にリーチ形を作る確率
    functionName: 'shouldShowMissReach',
    probability: 0.3,
    description: 'ハズレ時に左右同数のリーチ配列を生成する確率。',
  },
  {
    // ハズレ時に非リーチ形を作る確率（上記の残り）
    functionName: 'createMissNumbers (slotCount === 3)',
    probability: 0.7,
    description: 'ハズレ時に左右不一致の非リーチ配列を生成する確率。',
  },

  {
    // 非プレミア当たり: 看板演出
    functionName: 'routeNonPremiumHit',
    probability: 0.25,
    description: '通常当たりで看板演出へ分岐する確率。',
  },
  {
    // 非プレミア当たり: カットイン演出
    functionName: 'routeNonPremiumHit',
    probability: 0.7,
    description: '通常当たりでカットイン演出へ分岐する確率。',
  },
  {
    // 非プレミア当たり: 何もなし（残り）
    functionName: 'routeNonPremiumHit',
    probability: 0.05,
    description: '通常当たりで無演出へ分岐する確率（else）。',
  },

  {
    // 通常当たりカットイン: 白
    functionName: 'routeCutInBranch',
    probability: 0.05,
    description: '通常当たりカットインが白になる確率。',
  },
  {
    // 通常当たりカットイン: 青
    functionName: 'routeCutInBranch',
    probability: 0.15,
    description: '通常当たりカットインが青になる確率。',
  },
  {
    // 通常当たりカットイン: 緑
    functionName: 'routeCutInBranch',
    probability: 0.4,
    description: '通常当たりカットインが緑になる確率。',
  },
  {
    // 通常当たりカットイン: 赤
    functionName: 'routeCutInBranch',
    probability: 0.35,
    description: '通常当たりカットインが赤になる確率。',
  },
  {
    // 通常当たりカットイン: 金（残り）
    functionName: 'routeCutInBranch',
    probability: 0.05,
    description: '通常当たりカットインが金になる確率（else）。',
  },

  {
    // 通常当たり看板: 激アツ
    functionName: 'routeSignboardBranch',
    probability: 0.25,
    description: '通常当たり看板が激アツになる確率。',
  },
  {
    // 通常当たり看板: アツ
    functionName: 'routeSignboardBranch',
    probability: 0.3,
    description: '通常当たり看板がアツになる確率。',
  },
  {
    // 通常当たり看板: ちょいアツ
    functionName: 'routeSignboardBranch',
    probability: 0.35,
    description: '通常当たり看板がちょいアツになる確率。',
  },
  {
    // 通常当たり看板: チャンス（残り）
    functionName: 'routeSignboardBranch',
    probability: 0.1,
    description: '通常当たり看板がチャンスになる確率（else）。',
  },

  {
    // リーチ当たり: カットイン
    functionName: 'routeNonPremiumReachHit',
    probability: 0.65,
    description: 'リーチ当たりでカットインへ分岐する確率。',
  },
  {
    // リーチ当たり: 群
    functionName: 'routeNonPremiumReachHit',
    probability: 0.25,
    description: 'リーチ当たりで群演出へ分岐する確率。',
  },
  {
    // リーチ当たり: スズ背景
    functionName: 'routeNonPremiumReachHit',
    probability: 0.05,
    description: 'リーチ当たりでスズ背景へ分岐する確率。',
  },
  {
    // リーチ当たり: 何もなし（残り）
    functionName: 'routeNonPremiumReachHit',
    probability: 0.05,
    description: 'リーチ当たりで無演出へ分岐する確率（else）。',
  },

  {
    // リーチ当たりカットイン: 白
    functionName: 'routeReachCutInBranch',
    probability: 0.05,
    description: 'リーチ当たりカットインが白になる確率。',
  },
  {
    // リーチ当たりカットイン: 青
    functionName: 'routeReachCutInBranch',
    probability: 0.05,
    description: 'リーチ当たりカットインが青になる確率。',
  },
  {
    // リーチ当たりカットイン: 緑
    functionName: 'routeReachCutInBranch',
    probability: 0.2,
    description: 'リーチ当たりカットインが緑になる確率。',
  },
  {
    // リーチ当たりカットイン: 赤
    functionName: 'routeReachCutInBranch',
    probability: 0.55,
    description: 'リーチ当たりカットインが赤になる確率。',
  },
  {
    // リーチ当たりカットイン: 金（残り）
    functionName: 'routeReachCutInBranch',
    probability: 0.15,
    description: 'リーチ当たりカットインが金になる確率（else）。',
  },

  {
    // リーチ当たり群: 多い
    functionName: 'routeReachCharacterGroupBranch (hit)',
    probability: 0.4,
    description: 'リーチ当たり群演出で「多い」が選ばれる確率。',
  },
  {
    // リーチ当たり群: 少ない
    functionName: 'routeReachCharacterGroupBranch (hit)',
    probability: 0.2,
    description: 'リーチ当たり群演出で「少ない」が選ばれる確率。',
  },
  {
    // リーチ当たり群: コメント（残り）
    functionName: 'routeReachCharacterGroupBranch (hit)',
    probability: 0.4,
    description: 'リーチ当たり群演出で「コメント」が選ばれる確率（else）。',
  },

  {
    // ミス（リーチなし）: 看板
    functionName: 'routeMissNoReach',
    probability: 0.15,
    description: 'ミス（リーチなし）で看板へ分岐する確率。',
  },
  {
    // ミス（リーチなし）: カットイン
    functionName: 'routeMissNoReach',
    probability: 0.2,
    description: 'ミス（リーチなし）でカットインへ分岐する確率。',
  },
  {
    // ミス（リーチなし）: 何もなし（残り）
    functionName: 'routeMissNoReach',
    probability: 0.65,
    description: 'ミス（リーチなし）で無演出へ分岐する確率（else）。',
  },

  {
    // ミス（リーチあり）: カットイン
    functionName: 'routeMissReach',
    probability: 0.2,
    description: 'ミス（リーチあり）でカットインへ分岐する確率。',
  },
  {
    // ミス（リーチあり）: 群
    functionName: 'routeMissReach',
    probability: 0.2,
    description: 'ミス（リーチあり）で群演出へ分岐する確率。',
  },
  {
    // ミス（リーチあり）: 何もなし（残り）
    functionName: 'routeMissReach',
    probability: 0.6,
    description: 'ミス（リーチあり）で無演出へ分岐する確率（else）。',
  },

  {
    // レバーオン後ミスリーチ: 看板
    functionName: 'routeMissReachLeverOn',
    probability: 0.2,
    description: 'レバーオン後ミスリーチで看板へ分岐する確率。',
  },
  {
    // レバーオン後ミスリーチ: カットイン
    functionName: 'routeMissReachLeverOn',
    probability: 0.25,
    description: 'レバーオン後ミスリーチでカットインへ分岐する確率。',
  },
  {
    // レバーオン後ミスリーチ: 何もなし（残り）
    functionName: 'routeMissReachLeverOn',
    probability: 0.55,
    description: 'レバーオン後ミスリーチで無演出へ分岐する確率（else）。',
  },

  {
    // ミス（リーチなし）カットイン: 白
    functionName: 'routeMissNoReachCutInBranch',
    probability: 0.35,
    description: 'ミス（リーチなし）カットインが白になる確率。',
  },
  {
    // ミス（リーチなし）カットイン: 青
    functionName: 'routeMissNoReachCutInBranch',
    probability: 0.3,
    description: 'ミス（リーチなし）カットインが青になる確率。',
  },
  {
    // ミス（リーチなし）カットイン: 緑
    functionName: 'routeMissNoReachCutInBranch',
    probability: 0.3,
    description: 'ミス（リーチなし）カットインが緑になる確率。',
  },
  {
    // ミス（リーチなし）カットイン: 赤
    functionName: 'routeMissNoReachCutInBranch',
    probability: 0.04,
    description: 'ミス（リーチなし）カットインが赤になる確率。',
  },
  {
    // ミス（リーチなし）カットイン: 金（残り）
    functionName: 'routeMissNoReachCutInBranch',
    probability: 0.01,
    description: 'ミス（リーチなし）カットインが金になる確率（else）。',
  },

  {
    // ミス（リーチあり）カットイン: 白
    functionName: 'routeMissReachCutInBranch',
    probability: 0.45,
    description: 'ミス（リーチあり）カットインが白になる確率。',
  },
  {
    // ミス（リーチあり）カットイン: 青
    functionName: 'routeMissReachCutInBranch',
    probability: 0.25,
    description: 'ミス（リーチあり）カットインが青になる確率。',
  },
  {
    // ミス（リーチあり）カットイン: 緑
    functionName: 'routeMissReachCutInBranch',
    probability: 0.25,
    description: 'ミス（リーチあり）カットインが緑になる確率。',
  },
  {
    // ミス（リーチあり）カットイン: 赤
    functionName: 'routeMissReachCutInBranch',
    probability: 0.04,
    description: 'ミス（リーチあり）カットインが赤になる確率。',
  },
  {
    // ミス（リーチあり）カットイン: 金（残り）
    functionName: 'routeMissReachCutInBranch',
    probability: 0.01,
    description: 'ミス（リーチあり）カットインが金になる確率（else）。',
  },

  {
    // レバーオン後ミスリーチカットイン: 白
    functionName: 'routeMissReachLeverOnCutInBranch',
    probability: 0.4,
    description: 'レバーオン後ミスリーチのカットインが白になる確率。',
  },
  {
    // レバーオン後ミスリーチカットイン: 青
    functionName: 'routeMissReachLeverOnCutInBranch',
    probability: 0.35,
    description: 'レバーオン後ミスリーチのカットインが青になる確率。',
  },
  {
    // レバーオン後ミスリーチカットイン: 緑
    functionName: 'routeMissReachLeverOnCutInBranch',
    probability: 0.14,
    description: 'レバーオン後ミスリーチのカットインが緑になる確率。',
  },
  {
    // レバーオン後ミスリーチカットイン: 赤
    functionName: 'routeMissReachLeverOnCutInBranch',
    probability: 0.1,
    description: 'レバーオン後ミスリーチのカットインが赤になる確率。',
  },
  {
    // レバーオン後ミスリーチカットイン: 金（残り）
    functionName: 'routeMissReachLeverOnCutInBranch',
    probability: 0.01,
    description: 'レバーオン後ミスリーチのカットインが金になる確率（else）。',
  },

  {
    // ミス（リーチなし）看板: 激アツ
    functionName: 'routeMissNoReachSignboardBranch',
    probability: 0.01,
    description: 'ミス（リーチなし）看板が激アツになる確率。',
  },
  {
    // ミス（リーチなし）看板: アツ
    functionName: 'routeMissNoReachSignboardBranch',
    probability: 0.01,
    description: 'ミス（リーチなし）看板がアツになる確率。',
  },
  {
    // ミス（リーチなし）看板: ちょいアツ
    functionName: 'routeMissNoReachSignboardBranch',
    probability: 0.25,
    description: 'ミス（リーチなし）看板がちょいアツになる確率。',
  },
  {
    // ミス（リーチなし）看板: チャンス（残り）
    functionName: 'routeMissNoReachSignboardBranch',
    probability: 0.73,
    description: 'ミス（リーチなし）看板がチャンスになる確率（else）。',
  },

  {
    // レバーオン後ミスリーチ看板: 激アツ
    functionName: 'routeMissReachLeverOnSignboardBranch',
    probability: 0.01,
    description: 'レバーオン後ミスリーチ看板が激アツになる確率。',
  },
  {
    // レバーオン後ミスリーチ看板: アツ
    functionName: 'routeMissReachLeverOnSignboardBranch',
    probability: 0.1,
    description: 'レバーオン後ミスリーチ看板がアツになる確率。',
  },
  {
    // レバーオン後ミスリーチ看板: ちょいアツ
    functionName: 'routeMissReachLeverOnSignboardBranch',
    probability: 0.3,
    description: 'レバーオン後ミスリーチ看板がちょいアツになる確率。',
  },
  {
    // レバーオン後ミスリーチ看板: チャンス（残り）
    functionName: 'routeMissReachLeverOnSignboardBranch',
    probability: 0.59,
    description: 'レバーオン後ミスリーチ看板がチャンスになる確率（else）。',
  },

  {
    // ミス（リーチあり）群: 多い
    functionName: 'routeReachCharacterGroupBranch (miss)',
    probability: 0.4,
    description: 'ミス（リーチあり）群演出で「多い」が選ばれる確率。',
  },
  {
    // ミス（リーチあり）群: 少ない
    functionName: 'routeReachCharacterGroupBranch (miss)',
    probability: 0.2,
    description: 'ミス（リーチあり）群演出で「少ない」が選ばれる確率。',
  },
  {
    // ミス（リーチあり）群: コメント（残り）
    functionName: 'routeReachCharacterGroupBranch (miss)',
    probability: 0.4,
    description: 'ミス（リーチあり）群演出で「コメント」が選ばれる確率（else）。',
  },

  {
    // ワンモア演出の発火判定
    functionName: 'shouldTriggerOnemoreBonus',
    probability: 0.5,
    description: '非プレミア当たり時にワンモア演出が発火する確率。',
  },

  {
    // リーチミス時の unchange 置換率: 青カットイン
    functionName: 'shouldRunReachMissMovieSequence (blue-cutin)',
    probability: 0.05,
    description: '青カットイン時に unchange へ置換する確率。',
  },
  {
    // リーチミス時の unchange 置換率: 緑カットイン
    functionName: 'shouldRunReachMissMovieSequence (green-cutin)',
    probability: 0.1,
    description: '緑カットイン時に unchange へ置換する確率。',
  },
  {
    // リーチミス時の unchange 置換率: 赤カットイン
    functionName: 'shouldRunReachMissMovieSequence (red-cutin)',
    probability: 0.7,
    description: '赤カットイン時に unchange へ置換する確率。',
  },
  {
    // リーチミス時の unchange 置換率: 金カットイン
    functionName: 'shouldRunReachMissMovieSequence (gold-cutin)',
    probability: 1,
    description: '金カットイン時に unchange へ置換する確率。',
  },
  {
    // リーチミス時の unchange 置換率: 群（多い）
    functionName: 'shouldRunReachMissMovieSequence (many-character-group)',
    probability: 0.4,
    description: '群（多い）演出時に unchange へ置換する確率。',
  },
  {
    // リーチミス時の unchange 置換率: 群（少ない）
    functionName: 'shouldRunReachMissMovieSequence (few-character-group)',
    probability: 0.3,
    description: '群（少ない）演出時に unchange へ置換する確率。',
  },
  {
    // リーチミス時の unchange 置換率: 群（コメント）
    functionName: 'shouldRunReachMissMovieSequence (comment-character-group)',
    probability: 0.2,
    description: '群（コメント）演出時に unchange へ置換する確率。',
  },
];
