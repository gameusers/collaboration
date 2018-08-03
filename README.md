<!-- # [Game Users](https://gameusers.org/) -->
![Game Users Banner](https://gameusers.org/assets/img/social/ogp_image.jpg)


[![node](https://img.shields.io/badge/node-v8.11.3-lightgrey.svg)](https://nodejs.org/ja/)
[![npm](https://img.shields.io/badge/npm-v6.3.0-blue.svg)](https://www.npmjs.com/)
[![David](https://img.shields.io/david/expressjs/express.svg)]()
[![license](https://img.shields.io/badge/license-Game%20Users%20Project-blue.svg)](https://github.com/gameusers/web/blob/master/LICENSE.txt)

Game Users を Node.js に書き換えたい！

Cloud9（IDE） を VPS 上に設定して、ブラウザさえあれば、みんなで開発できる環境を作ってみました。
<br><br>

[開発中のウェブサイト（リアルタイムでコードが反映されます）](http://35.203.143.160:8080/)
<br><br>

**ゲストアカウント**

- アカウントID：956477059000
- ユーザー名（どちらか）：guest-1, guest-2
- パスワード：Password12345
<br><br>

ゲストアカウントでログインすると以下のページが見れるようになります。管理者がいないときは、ゲストアカウントは Read Only になっています。
<br><br>

- [Cloud9 IDE](https://us-west-2.console.aws.amazon.com/cloud9/ide/df44294c8853471b8ddd609c09af06f3)
- [Mongo Express（Basic認証が表示されますが空欄で入れます）](https://df44294c8853471b8ddd609c09af06f3.vfs.cloud9.us-west-2.amazonaws.com:8081/)
<br><br>

※ ログアウトするときはブラウザを閉じるだけでOKです。ゴミ箱マークは押さないようにしてください。
<br><br>


**マスターアカウント**

プログラマーやデザイナーの方、または HTML ＆ CSS が理解できる方にはマスターアカウントのログイン情報を、IDE のチャット欄で提供しています。マスターアカウントを利用したい方はいつでも言ってください。

マスターアカウント（master-1～5）でログインできる方は、以下の Cloud9 環境も利用できます。
<br><br>

- [開発中のウェブサイト 2](http://35.203.143.160:8082/)
- [Cloud9 IDE 2](https://us-west-2.console.aws.amazon.com/cloud9/ide/df44294c8853471b8ddd609c09af06f3)
- [開発中のウェブサイト 3](http://35.203.143.160:8083/)
- [Cloud9 IDE 3](https://us-west-2.console.aws.amazon.com/cloud9/ide/7338aa92de58493393812a0a42b03518)
<br><br>


## 開発について

ここで開発について解説していますのでチェックしてみてください。
記事にパスワードが表示されている時は 1979 を入力してください。

https://gameusers.org/dev/blog/live/

<span style="color: red; ">※ GitHub 上の Wiki も参照してください。</span>
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


## ブログ

開発についての情報をブログにまとめていきます。React & Node.jsで開発していくので、参考になる情報も掲載していきたいです。

[Game Users 開発ノート](https://gameusers.org/dev/blog/)
