---
title: "InfluxDB"
---


InfluxDBをインストールします。


リポジトリを追加します。

```
echo "deb https://repos.influxdata.com/ubuntu bionic stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
```

GPGキーをインポートします。
```
sudo curl -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add -
```



InfluxDBをインストールします。

```
sudo apt-get update
sudo apt-get install influxdb
```

influxdb.confを編集します。
```
sudo vi /etc/influxdb/influxdb.conf
```
bind-address を有効にします。
```
[http]
  # Determines whether HTTP endpoint is enabled.
  enabled = true

  # Determines whether the Flux query endpoint is enabled.
  # flux-enabled = false

  # Determines whether the Flux query logging is enabled.
  # flux-log-enabled = false

  # The bind address used by the HTTP service.
  bind-address = ":8086"
```

InfluxDBを起動します。
```
sudo systemctl start influxdb
```

