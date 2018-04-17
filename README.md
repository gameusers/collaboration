<!-- # [Game Users](https://gameusers.org/) -->
![Game Users Banner](https://gameusers.org/assets/img/social/ogp_image.jpg)


[![node](https://img.shields.io/badge/node-v8.11.1-lightgrey.svg)](https://nodejs.org/ja/)
[![npm](https://img.shields.io/badge/npm-v5.6.0-blue.svg)](https://www.npmjs.com/)
[![David](https://img.shields.io/david/expressjs/express.svg)]()
[![license](https://img.shields.io/badge/license-Game%20Users%20Project-blue.svg)](https://github.com/gameusers/web/blob/master/LICENSE.txt)

Game Users を Node.js に書き換えたい！

Cloud9（IDE） を VPS 上に設定して、ブラウザさえあれば、みんなで開発できる環境を作ってみました。
<br><br>

[開発中のウェブサイト（リアルタイムでコードが反映されます）](http://35.203.143.160:8080/)
<br><br>

- アカウントID：956477059000
- ユーザー名（どちらか）：guest-1, guest-2
- パスワード：Password12345
<br><br>

ゲストアカウントでログインすると以下のページが見れるようになります。
<br><br>

- [Cloud9 IDE](https://us-west-2.console.aws.amazon.com/cloud9/ide/df44294c8853471b8ddd609c09af06f3)
- [Mongo Express（Basic認証が表示されますが空欄で入れます）](https://df44294c8853471b8ddd609c09af06f3.vfs.cloud9.us-west-2.amazonaws.com:8081/)
<br><br>

※ ログアウトするときはブラウザを閉じるだけでOKです。ゴミ箱マークは押さないようにしてください。
<br><br>

ここで開発について解説していますのでチェックしてみてください。
記事にパスワードが表示されている時は 1979 を入力してください。

https://gameusers.org/dev/blog/live/
<br><br>


## データベース
MongoDB を使っています。<br /><br />
db/mongodb ここの場所のデータを利用していますが、GitHub 上にデータをちゃんと移せているか不明です。正常に動作しない場合は、mongodb 内を空にしてください。<br /><br />
スタートさせるときは以下のコマンドを利用してください。

`mongod --dbpath db/mongodb`
<br /><br />

## ライセンス

Game Users プロジェクトに帰属します。
<br /><br />


## 開発情報

開発についての情報をブログにまとめていきます。React & Node.jsで開発していくので、参考になる情報も掲載していきたいです。

[Game Users 開発ノート](https://gameusers.org/dev/blog/)
