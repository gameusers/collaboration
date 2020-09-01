#!/bin/bash

# コンテナ起動
docker-compose up -d

# レプリカセット開始
docker-compose exec mongo1 mongo --host localhost /src/docker/mongo/init-replica-set.js

# 遅延処理　次の処理をすぐに実行すると、レプリカセットのセカンダリにデータを書き込むことになってエラーが起きるので遅延している
echo "Wait 20 seconds!"
sleep 20s

# ユーザーを追加する
docker-compose exec mongo1 mongo --host localhost /src/docker/mongo/init-user.js

# Node.js スタート
docker exec -it gameusers-node npm run dev

exit 0