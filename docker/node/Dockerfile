FROM node:lts-buster

# 作業ディレクトリーを作成
WORKDIR /src

# package.json & package-lock.json をコピー
COPY package*.json ./

# パッケージインストール
RUN npm install

# npm-check-updates インストール
RUN npm install -g npm-check-updates

# ソースコードをコピーする
COPY . .

# ポートを開放する
EXPOSE 8080

# CMD ["npm", "run", "dev"]
