FROM node:lts

# 作業ディレクトリーを作成
WORKDIR /src

# package.json & package-lock.json をコピー
COPY package*.json ./

# パッケージインストール
RUN npm install

# ソースコードをコピーする
COPY . .

# ポートを開放する
EXPOSE 8080

# CMD ["npm", "run", "dev"]