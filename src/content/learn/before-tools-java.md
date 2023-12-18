---
title: "Java"
---

OpenJDK Amazon Corretto 8 をインストールします。

java-common パッケージをインストールします。

```
sudo apt-get update && sudo apt-get install java-common=0.68ubuntu1~18.04.1
```
Linux .deb ファイルをダウンロードして、インストールします。

```
cd ~/tmp
wget https://corretto.aws/downloads/latest/amazon-corretto-8-x64-linux-jdk.deb
sudo apt install ./amazon-corretto-8-x64-linux-jdk.deb
```

javaバージョンを確認します。

```
java -version
```

以下のように表示されます。

```
openjdk version "1.8.0_292"
OpenJDK Runtime Environment Corretto-8.292.10.1 (build 1.8.0_292-b10)
OpenJDK 64-Bit Server VM Corretto-8.292.10.1 (build 25.292-b10, mixed mode)
```
