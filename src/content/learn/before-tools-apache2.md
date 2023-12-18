---
title: "Apache2"
---

Apache2をインストールします。

```
sudo apt update
sudo apt install apache2=2.4.29-1ubuntu4.16
```

以下のパスに***.confを作成します。

```
cd /etc/apache2/sites-available/
sudo vi acacia.conf
```

ファイルの内容は以下となります。
```
<VirtualHost *:80>
  ProxyPreserveHost On
  ProxyRequests Off
  ErrorLog ${APACHE_LOG_DIR}/hoge_error.log
  <Location /scenario_modeler>
    ProxyPass http://localhost:8080/scenario_modeler
    ProxyPassReverse http://localhost:8080/scenario_modeler
  </Location>
  <Location /rdf_viewer>
    ProxyPass http://localhost:8080/rdf_viewer
    ProxyPassReverse http://localhost:8080/rdf_viewer
  </Location>
  <Location /scenario_editor>
    ProxyPass http://localhost:5000/scenario_editor
    ProxyPassReverse http://localhost:5000/scenario_editor
  </Location>
  <Location /airflow>
    ProxyPass http://localhost:8085/airflow
    ProxyPassReverse http://localhost:8085/airflow
  </Location>
  <Location /chronograf>
    ProxyPass http://localhost:8888/chronograf
    ProxyPassReverse http://localhost:8888/chronograf
  </Location>
  <Location /road_editor>
    ProxyPass http://localhost:38001/road_editor
    ProxyPassReverse http://localhost:38001/road_editor
  </Location>
  <Location /portal>
    ProxyPass http://localhost:3000/portal
    ProxyPassReverse http://localhost:3000/portal
  </Location>
</VirtualHost>
```

a2dissite コマンドで 000-default.conf を無効にします。
```
sudo a2dissite 000-default
```

a2enmodでproxyモジュールを有効にします。
```
sudo a2enmod proxy_http
```

a2ensite コマンドで acacia.conf を有効にします。
```
sudo a2ensite acacia
```

Apache を再起動して設定を反映します。
```
sudo systemctl restart apache2
```
