#!/bin/bash

# コンテナ起動
docker-compose up -d

# レプリカセットの設定
docker-compose exec mongo1 mongo --host localhost /src/docker/mongo/init-replica-set.js

# 遅延処理　次の処理をすぐに実行すると、レプリカセットのセカンダリにデータを書き込むことになってエラーが起きるので遅延している
echo "Wait 20 seconds!"
sleep 20s

# MongoDB にユーザーを追加する
# この部分でまれにエラーが出るので、その場合は docker-compose down でコンテナを停止してから
# 再度、このシェルスクリプトを実行してみてください
# それでもエラーが出る場合は以下の1行をコメントアウトしてください。MongoDB のユーザーを追加しなくても動作には影響ありません
docker-compose exec mongo1 mongo --host localhost /src/docker/mongo/init-user.js

# Node.js スタート
docker exec -it gameusers-node npm run dev

exit 0