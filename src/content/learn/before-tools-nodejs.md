---
title: "Nodejs"
---

nodejs, npm をインストールします。

```
sudo apt install -y nodejs npm
```

n package をインストールします。
```
sudo npm install n@7.3.0 -g
```

n package を使って node をインストールします。
```
sudo n 14.17.3
```

最初にインストールした nodejs, npm は削除します。
```
sudo apt purge -y nodejs npm
```

バージョンを確認します。
```
node -v
```

garden-user のホームディレクトリに、npm グローバルインストール用のディレクトリを作成します。
```
mkdir ~/.npm-global
```

新しいディレクトリパスを使用するようにnpmを設定します。
```
npm config set prefix '~/.npm-global'
```

システム変数の設定をします。
```
cat >> ~/.bashrc <<EOL

# set path so it includes user's npm global installations directory.
export PATH=~/.npm-global/bin:$PATH

EOL
```


システム変数を適用します。
```
source ~/.bashrc
```
