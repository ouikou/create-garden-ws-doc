---
title: "Chronograf"
---

chronografをインストールします。


wgetで.debをダウンロードします。

```
cd ~/tmp
sudo wget https://dl.influxdata.com/chronograf/releases/chronograf_1.8.9.1_amd64.deb
```

インストールします。
```
sudo dpkg -i chronograf_1.8.9.1_amd64.deb
```

設定ファイルを編集します。以下のように`Environment="BASE_PATH=/chronograf"`を追加します。

```
sudo vi /lib/systemd/system/chronograf.service
```


```
[Service]
User=chronograf
Group=chronograf
Environment="HOST=0.0.0.0"
Environment="PORT=8888"
Environment="BASE_PATH=/chronograf"
Environment="BOLT_PATH=/var/lib/chronograf/chronograf-v1.db"
```




サービスの自動起動有効にします。

```
sudo systemctl enable chronograf
```

設定ファイルを再読込します。
```
sudo systemctl --system daemon-reload
```

chronografを起動します。
```
sudo systemctl restart chronograf
```


