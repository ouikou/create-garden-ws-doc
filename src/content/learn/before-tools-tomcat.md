---
title: "Tomcat"
---

Tomcatをインストールします。


tomcatグループを作成します。
```
sudo groupadd tomcat
```

tomcatユーザを作成します。
```
sudo useradd -s /bin/false -g tomcat -d /home/garden-user/etc/tomcat tomcat
```


Apache Tomcatをダウンロードします。Tomcat 9 の最新版をダウンロードしてください。ダウンロードのURLは以下から確認できます。
https://downloads.apache.org/tomcat/tomcat-9/

確認したバージョンで以下の v9.x.x を変更して実行してください。

```
cd ~/tmp
wget https://downloads.apache.org/tomcat/tomcat-9/v9.x.x/bin/apache-tomcat-9.x.x.tar.gz
```

ダウンロードファイルを展開します。
```
sudo tar xzvf apache-tomcat-9.x.x.tar.gz -C /home/garden-user/etc/tomcat --strip-components=1
```


権限の設定をします。
```
cd /home/garden-user/etc/tomcat
sudo chgrp -R tomcat /home/garden-user/etc/tomcat
sudo chown -R tomcat /home/garden-user/etc/tomcat
sudo chmod -R 764 /home/garden-user/etc/tomcat
```

Tomcatのサービスを設定します。
```
sudo vi /etc/systemd/system/tomcat.service
```

tomcat.serviceの内容は以下となります。
```
[Unit]
Description=Apache Tomcat Web Application Container
After=network.target

[Service]
Type=forking
Environment=JAVA_HOME=/usr/lib/jvm/java-1.8.0-amazon-corretto
Environment=CATALINA_PID=/home/garden-user/etc/tomcat/temp/tomcat.pid
Environment=CATALINA_HOME=/home/garden-user/etc/tomcat
Environment=CATALINA_BASE=/home/garden-user/etc/tomcat
Environment='CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC'
Environment='JAVA_OPTS=-Djava.awt.headless=true -Djava.security.egd=file:/dev/./urandom'
ExecStart=/home/garden-user/etc/tomcat/bin/startup.sh
ExecStop=/home/garden-user/etc/tomcat/bin/shutdown.sh
User=tomcat
Group=tomcat
UMask=0007
RestartSec=10
Restart=always

[Install]
WantedBy=multi-user.target
```

設定ファイルを再読込します。
```
sudo systemctl daemon-reload
```

サービスの自動起動を有効にします。
```
sudo systemctl enable tomcat
```

Tomcatサービスを起動します。
```
sudo systemctl start tomcat
```

