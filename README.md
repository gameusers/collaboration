<!-- # [Game Users](https://gameusers.org/) -->
![Game Users Banner](https://gameusers.org/assets/img/social/ogp_image.jpg)


[![node](https://img.shields.io/badge/node-v12.16.1-lightgrey.svg)](https://nodejs.org/ja/)
[![npm](https://img.shields.io/badge/npm-v6.14.4-blue.svg)](https://www.npmjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v4.2.3-green.svg)](https://www.mongodb.com/)
[![David](https://img.shields.io/david/expressjs/express.svg)]()
[![license](https://img.shields.io/badge/license-Game%20Users%20Project-blue.svg)](https://github.com/gameusers/web/blob/master/LICENSE.txt)

Game Users を Node.js に書き換えたい！

Cloud9（IDE） を VPS 上に設定して、ブラウザさえあれば、みんなで開発できる環境を作ってみました。
<br><br>

[開発中のウェブサイト（リアルタイムでコードが反映されます）](http://dev-1.gameusers.org:8080/)
<br><br>

**ゲストアカウント**

- アカウントID：956477059000
- ユーザー名（どちらか）：guest-1, guest-2
- パスワード：Password12345
<br><br>

ゲストアカウントでログインすると以下のページが見れるようになります。管理者がいないときは、ゲストアカウントは Read Only になっています。
<br><br>

- [Cloud9 IDE](https://us-west-2.console.aws.amazon.com/cloud9/ide/7e3fb917694e4ae5b1570f0b0e887090)
- [Mongo Express（Basic認証が表示されますが空欄で入れます）](https://7e3fb917694e4ae5b1570f0b0e887090.vfs.cloud9.us-west-2.amazonaws.com:8081/)
<br><br>

※ ログアウトするときはブラウザを閉じるだけでOKです。ゴミ箱マークは押さないようにしてください。
<br><br>


**マスターアカウント**

プログラマーやデザイナーの方、または HTML ＆ CSS が理解できる方にはマスターアカウントのログイン情報を、IDE のチャット欄で提供しています。マスターアカウントを利用したい方はいつでも言ってください。

マスターアカウント（master-1～5）でログインできる方は、以下の Cloud9 環境も利用できます。
<br><br>

※ 2019/2/23 現在停止中です。
- [開発中のウェブサイト 2](http://dev-1.gameusers.org:8082/)
- [Cloud9 IDE 2](https://us-west-2.console.aws.amazon.com/cloud9/ide/df44294c8853471b8ddd609c09af06f3)
- [開発中のウェブサイト 3](http://dev-1.gameusers.org:8083/)
- [Cloud9 IDE 3](https://us-west-2.console.aws.amazon.com/cloud9/ide/7338aa92de58493393812a0a42b03518)
<br /><br /><br />


## 1. インストール
まずこちらのリポジトリから任意の場所にファイルを Clone（ダウンロード） してください。
そしてターミナルを開き、cd コマンドでファイルが置かれている場所に移動してから、npm を利用してパッケージをインストールしてください。


    npm install
<br />


## 2. 環境変数の設定
パッケージのインストールが終わったら、.env（環境変数を設定する） ファイルを開いて、URL_BASE と URL_API と書かれている部分を、開発環境でアクセスする URL に書き換えて保存してください。


    # URL
    URL_BASE=https://dev-1.gameusers.org/
    URL_API=https://dev-1.gameusers.org/api

デフォルトでは上記の値に設定されていますが、例えば localhost でアクセスする場合は、以下のように変更してください（ポート番号は 8080 です）


    # URL
    URL_BASE=http://localhost:8080/
    URL_API=http://localhost:8080/api
<br />


## 3. データベース
次にデータベースの設定を行います。こちらの開発では MongoDB Ver.4  を利用しています。開発環境にインストールされていない場合、まずインストールを行ってください。MongoDB のトランザクション機能を利用するため、レプリカセット（複数のデータベースを立ち上げて繋げることで安定性を確保する機能）を構築しています。<br /><br />
**参考サイト**<br />
- [MongoDB で 3台構成 の レプリカセット を 構築する 方法](https://garafu.blogspot.com/2018/02/mongodb-3instance-replicaset.html)
- [Deploy a Replica Set for Testing and Development](https://docs.mongodb.com/manual/tutorial/deploy-replica-set-for-testing/)<br /><br />

1. db/server1
2. db/server2
3. db/server3

こちらのディレクトリ内にデータとログが保存されるようになっています。レプリカセットの構築方法を簡単に解説しますが、環境によって変更が必要な箇所がある場合は、置き換えて読んでみてください。<br /><br />

1: ターミナルを3つ開き、各行のコマンドで MongoDB を3つ起動します。これは db/server 内に設置してあるコンフィグファイルを読み込んで、データベースを起動する方法です。


    ターミナル 1
    mongod --config "db/server1/mongod.server1.cfg"
    
    ターミナル 2
    mongod --config "db/server2/mongod.server2.cfg"
    
    ターミナル 3
    mongod --config "db/server3/mongod.server3.cfg"


2: 4つ目のターミナルを開き、Server1 にログインします。


    mongod --host 127.0.0.1:27017


3: レプリカセットを初期化


    rsconf = {
      _id : "rs0",
      members: [
        { _id: 0, host: "127.0.0.1:27017" },
        { _id: 1, host: "127.0.0.1:27018" },
        { _id: 2, host: "127.0.0.1:27019" },
      ]
    }
    rs.initiate(rsconf)


上記のとおりにコマンドを入力するとレプリカセットの設定が完了し、MongoDB でトランザクションが扱えるようになります。上記入力後は4つ目のターミナルから抜けてもらって構いません。
<br /><br />


## 4. 起動する
次に再度新しくターミナルを開き、以下のコマンドを入力してください。


    npm run dev
    

特に問題が起きなければ、アプリケーションが起動します。
<br /><br />


## 5. データベースに初期データを挿入する
データベースの中身は容量の関係上、GitHub 上には掲載されておらず、空のディレクトリと設定ファイルのみになっていますが、以下のページにアクセスすることで簡単に初期データが挿入できるようになっています。<br />


    http://（.env で設定したトップページのアドレス）/initialize
    

「データベース - データ挿入」と書かれたボタンがありますので、押してください。gameusers というデータベースに初期コレクションが挿入されます。<br />

上記ページには、開発している主要なページのリンクも貼られています。
<br /><br />


## 6. mongo-express
データベースの中身を視覚的に把握できる GUI ツールも入っています。ターミナルを開いて、以下を入力してください。mongo-express が起動します。<br />

    npm run mongo-express:start


次に下記アドレスにアクセスすると、Basic 認証が起動します。


    http://（.env で設定したトップページのアドレス [ポート番号だけ変更]）:8081/
    

「ユーザー名：admin」「パスワード：pass」でログインしてください。データベースの構成などを確認する場合に利用すると便利です。<br />

詳しくは [mongo-express](https://github.com/mongo-express/mongo-express) を確認してください。
<br /><br />


## 7. ログイン情報
データベースにデータを挿入すると、ログインできるユーザーが追加されます。ログインが必要なページにアクセスしたい場合は、以下の情報をログインページで入力してください。<br /><br />

1. ログインID：8OM0dhDak　パスワード：8OM0dhDak0
2. ログインID：enPLLYBBEg3y　パスワード：enPLLYBBEg3y0
3. ログインID：nzPR7R9GO　パスワード：nzPR7R9GO0
<br /><br />


## ライセンス

Game Users プロジェクトに帰属します。
<br /><br />


## 開発について

ここで開発について解説していますので、よければチェックしてみてください。

https://gameusers.org/dev/blog/live/
