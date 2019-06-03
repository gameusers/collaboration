const ja_JP = {
  
  
  // ---------------------------------------------
  //   Common / Form
  // ---------------------------------------------
  
  // 共通
  'Error': 'Error Code: { code }',
  'qnWsuPcrJ': 'その他のエラー',
  
  'uwHIKBy7c': 'フォームの入力内容に問題があります',
  'Gn_vVgSFY': '利用規約に同意してください',
  
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
  
  'xLLNIpo6a': 'ログインする必要があります',
  'ty7z0wml': 'すでにログインしています',
  
  'IPKU3YPP': '送信しました',
  'IUvc-1VM': '保存しました',
  'qyzB8x1J': '編集しました',
  '3q16I-ld': '削除しました',
  
  
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
  'FQgx7kEJN': '現在、利用中のメールアドレスです',
  '5H8rr53kE': '入力したメールアドレスは利用できません',
  
  // /app/@database/users/validations/player-id.js
  '3VjugB9w9': 'プレイヤーページのURLになります',
  
  // /app/@database/users/validations/player-id-server.1.js
  'Xt11v41pR': '入力したプレイヤーIDは利用できません',
  
  
  
  
  // ---------------------------------------------
  //   Login
  // ---------------------------------------------
  
  // /app/login/index/stores/store.js
  '5Gf730Gmz': 'ログインしました',
  
  // /app/login/account/stores/store.js
  'Jje25z6lV': 'アカウントを作成しました。プレイヤーページに移動します。',
  
  // /app/@database/users/api.js
  'RIj4SCt_s': 'ID、またはパスワードが間違っています',
  
  
  
  
  // ---------------------------------------------
  //   Logout
  // ---------------------------------------------
  
  // /app/logout/index/stores/store.js
  'CKQQ_bjmW': 'ログアウトしました',
  
  
  
  
  // ---------------------------------------------
  //   Player / Settings
  // ---------------------------------------------
  
  // /app/pl/settings/stores/store.js
  'nhn2yers2': 'ログイン情報を編集しました',
  '84FmVC7RZ': 'E-Mailを登録しました',
  'hbRy4HpaP': 'E-Mailの登録を解除しました',
  
  
  
  
  // ---------------------------------------------
  //   E-mail / Confirmation
  // ---------------------------------------------
  
  // /app/@api/v1/initial-props.js - endpointID: R9AFOxwEK
  'EAvJztLfH': '確認メールは何度も送信できません。また後日お試しください。',
  
  // /app/@database/email-confirmations/api.js
  'CquCU7BtA': '確認メールを再送信しました',
  'IDT_ufsFV': 'メールアドレスの確認はすでに完了しています',
  
  
  
  
  // ---------------------------------------------
  //   Store / Image & Video
  // ---------------------------------------------
  
  // /app/common/image-and-video/stores/form.js
  'F8CN8ofG': '最新のブラウザを利用してください',
  '7hEpil7k': 'アップロードできるのは JPEG, PNG, GIF, SVG の画像ファイルです',
  'kq3UNeWF': '画像のサイズが大きすぎます',
  'QzXkutIP': '画像を選択してください',
  'lisio9HB': 'すでに同じ画像が追加されています',
  '9msxBlM4': 'アップロードできる画像の枚数を超えています',
  
  
  // ---------------------------------------------
  //   Store / ID Form
  // ---------------------------------------------
  
  // /app/common/id/stores/form.js
  'xCv6uxj7': '編集するIDを選んでください',
  '-agWH-z_': '削除するIDを選んでください',
  
  
  
};

module.exports = ja_JP;