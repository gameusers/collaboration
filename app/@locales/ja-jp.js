const ja_JP = {
  
  
  // ---------------------------------------------
  //   Error / @validation
  // ---------------------------------------------
  
  // 共通
  'Error': 'Error Code: { code }',
  'qnWsuPcrJ': 'その他のエラー',
  
  'uwHIKBy7c': 'フォームの入力内容に問題があります',
  
  'cFbXmuFVh': '入力してください',
  'xdAU7SgoO': '1文字以上、20文字以内で入力してください',
  '9c6Lprg6n': '1文字以上、30文字以内で入力してください',
  'yhgyXHqZu': '1文字以上、50文字以内で入力してください',
  'Uh3rnK7Dk': '1文字以上、100文字以内で入力してください',
  'eASl8OdnD': '1文字以上、500文字以内で入力してください',
  'pLES2ZGM2': '1文字以上、3000文字以内で入力してください',
  'ilE2NcYjI': '3文字以上、32文字以内で入力してください',
  'yKjojKAxy': '6文字以上、32文字以内で入力してください',
  '_BnyJl8Xz': '8文字以上、32文字以内で入力してください',
  
  'PH8jcw-VF': '正しい値が選ばれていません',
  'bT9TGtVck': '正しい日付ではありません',
  'McbWUO45b': '正しい時間ではありません',
  'Bv79Cmo2s': '正しいURLではありません',
  'vplWXcVvo': '曜日を選んでください',
  'dmja16xDh': '曜日が選ばれていません',
  
  'Nbu_IqorV': '範囲内の数字ではありません',
  'c9T-0LONy': '配列ではありません',
  
  'JBkjlGQMh': '入力できるのは半角英数字とハイフン( - )アンダースコア( _ )です',
  
  
  // ---------------------------------------------
  //   Error / Login
  // ---------------------------------------------
  
  'xLLNIpo6a': 'ログインする必要があります',
  // 'WiQ3kBaeL': 'ログイン中は処理できません',
  
  
  // /app/pl/settings/stores/store.js
  
  
  
  // ---------------------------------------------
  //   Error / Validation / DB card-players
  // ---------------------------------------------
  
  // /app/@database/card-players/validations/name.js
  'l1Nr3Di-O': '公開される名前です',
  
  // /app/@database/card-players/validations/status.js
  'RuqHo4jGS': 'ハンドルネームの横に表示される文字です',
  
  // /app/@database/card-players/validations/age.js
  '4T_kAMjFU': '誕生日から年齢が自動で計算されます',
  
  // /app/@database/card-players/validations/age-alternative-text.js
  'Qo5IGidJY': '例えば17歳と入力すると、ずっと17歳に固定されます',
  
  // /app/@database/card-players/validations/sex-alternative-text.js
  '2FWoSprRW': '他の値を表示したい場合はこちらに入力してください',
  
  // /app/@database/card-players/validations/address.js
  'GguXb4Xxo': '詳しい住所は載せないようにしてください',
  
  // /app/@database/card-players/validations/gaming-experience.js
  'fCsp5ULCG': '始めた日からゲーム歴が自動で計算されます',
  
  // /app/@database/card-players/validations/gaming-experience-alternative-text.js
  'wfVpYnnq-': '例えば3年と入力すると、ずっと3年に固定されます',
  
  // /app/@database/card-players/validations/smartphone-model.js
  // /app/@database/card-players/validations/tablet-model.js
  'KGJvD0Fj3': 'モデル名、機種名などを入力してください',
  
  // /app/@database/card-players/validations/activity-time.js
  'vKhuy_98i': 'ゲームを開始する時間を選んでください',
  'h7yr2vkyk': 'ゲームを終了する時間を選んでください',
  
  // /app/@database/card-players/validations/link.js
  'sOgKU3gS9': 'リンクのタイトルを入力してください',
  'CAhUTCx7B': 'URLを入力してください',
  
  
  // ---------------------------------------------
  //   Error / Validation / DB games
  // ---------------------------------------------
  
  
  // ---------------------------------------------
  //   Error / Validation / DB ids
  // ---------------------------------------------
  
  // /app/@database/ids/validations/platform.js
  'dJzAwAva3': 'IDに関係のあるプラットフォームを選んでください',
  
  // /app/@database/ids/validations/label.js
  'ZlyG1tegW': 'IDの左側に太字で表示されます ({ numberOfCharacters }文字)',
  
  // /app/@database/ids/validations/id.js
  'oWwTCtWxC': 'IDを入力してください ({ numberOfCharacters }文字)',
  
  // /app/@database/ids/validations/public-setting.js
  'TogSfI8lD': 'IDを公開する相手を選んでください',
  
  // /app/@database/ids/api.js
  'NRO3Y1hnC': 'IDの保存可能件数を超えています',
  
  
  // ---------------------------------------------
  //   Error / Validation / DB users
  // ---------------------------------------------
  
  // /app/@database/users/validations/login-id.js
  'Xrf-TLIEN': 'ログインIDを入力してください',
  
  // /app/@database/users/validations/login-id-server.js
  'Y1J-vK0hW': '入力したログインIDは利用できません',
  
  // /app/@database/users/validations/login-password.js
  'gJz51M8Pf': 'ログインパスワードを入力してください',
  'tmEi1Es0v': 'パスワードの強度が足りません',
  'NHTq1_JhE': 'IDとパスワードを同じ文字列にすることはできません',
  
  // /app/@database/users/validations/login-password-confirmation.js
  'KBFOZp6kv': '同じパスワードをもう一度入力してください',
  '9jFs2LU6e': 'パスワードが一致しません',
  
  // /app/@database/users/validations/email.js
  'I6k9-tUpp': 'メールアドレスを入力してください',
  '5O4K1an7k': '正しいメールアドレスではありません',
  
  // /app/@database/users/validations/email-server.js
  '5H8rr53kE': '入力したメールアドレスは利用できません',
  
  
  
  
  // ---------------------------------------------
  //   Player / Settings
  // ---------------------------------------------
  
  // /app/pl/settings/stores/store.js
  'nhn2yers2': 'ログイン情報を編集しました',
  '84FmVC7RZ': 'E-Mailを編集しました',
  
  
  
  
};

module.exports = ja_JP;

// export default ja_JP;