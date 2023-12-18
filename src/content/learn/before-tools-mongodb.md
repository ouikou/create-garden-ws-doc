---
title: "MongoDB"
---

MongoDBをインストールします。

GPGキーをインポートします。
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
```

リポジトリを追加します。
```
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
```

MongoDBをインストールします。
```
sudo apt update
sudo apt install mongodb-org=4.0.25
```

MongoDBを起動します。
```
sudo systemctl start mongod
```


MongoDB compass をインストールします。

ブラウザで https://www.mongodb.com/try/download/compass にアクセスしてダウンロードします。

![](/images/tutorial/MongoDB.ja/2021-06-22-08-16-27.png)


![](/images/tutorial/MongoDB.ja/2021-06-22-08-16-41.png)


MongoDB compass をインストールします。

```
sudo dpkg -i EnterfileName.deb
```


アクティビティからMongoDB compassを検索して実行します。

![](/images/tutorial/MongoDB.ja/2021-06-22-08-18-59.png)

![](/images/tutorial/MongoDB.ja/2021-06-22-08-19-03.png)

New Connectionタブを押下し、接続先URLを入力します。
（URL:mongodb://localhost:27017）

![](/images/tutorial/MongoDB.ja/2021-06-22-08-19-55.png)

![](/images/tutorial/MongoDB.ja/2021-06-22-08-20-01.png)






