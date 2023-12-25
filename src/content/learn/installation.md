---
title: "ビルド&インストール"
---

GARDEN Scenario Platform をビルドします。

ユーザーを切り替えます。
```
sudo su - garden-user
```

Mavenをインストールします。
```
sudo apt update
sudo apt install maven=3.6.0-1~18.04.1
```

Antをインストールします。
```
sudo apt update
sudo apt install ant=1.10.5-3~18.04
```

Gitをインストールします。
```
sudo apt update
sudo apt install git=1:2.17.1-1ubuntu0.18
```

GWTをダウンロードします。
```
cd ~/garden
curl -O https://storage.googleapis.com/gwt-releases/gwt-2.9.0.zip
```
ファイル展開します。
```
unzip gwt-2.9.0.zip -d ./
```

GARDENプロジェクトのビルドを実行します。
```
cd ~/garden
git clone https://github.com/open-garden/garden.git garden-repo
cp ~/garden/garden-repo/script/GARDEN_acacia.sh ~/garden/script	
cd ~/garden/script
chmod 764 GARDEN_acacia.sh	
./GARDEN_acacia.sh build_all
```

必要な資材が以下のように格納されていることを確認します。

```
# warの資材
/home/garden-user/garden/war
├── Zipc_Webplatform.war
├── com.zipc.garden.webplatform.dsl.fmc.web.war
├── com.zipc.garden.webplatform.dsl.sc.web.war
├── RDFViewer.war
└── prefix.properties

# dagsの資材
/home/garden-user/etc/airflow/dags
├── analyzer
├── coordinates_converter.py
├── coordinates_converter_trigger.py
├── garden_analyzer.py
├── garden_dag_trigger.py
├── lon_lat_extractor.py
└── requirements.txt

# scriptの資材
/home/garden-user/garden/script
├── CompactDatabase.jar
└── GARDEN_acacia.sh

# Job Executorの資材
/home/garden-user/garden/job_executor/
├── Zipc_JobExecutor.jar
├── acts_cmd_2.92.jar
└── lib
    ├── Zipc_Xtext_SC.jar
    └── z3
        ├── Microsoft.Z3.deps.json
        ├── Microsoft.Z3.dll
        ├── Microsoft.Z3.xml
        ├── com.microsoft.z3.jar
        ├── libz3.a
        ├── libz3.so
        ├── libz3java.so
        ├── requirements.txt
        └── z3

# node系アプリの資材
/home/garden-user/garden/node_services/
├── GARDEN_Portal
├── Zipc_ScenarioEditor
└── Zipc_Microservice-Road
```


garden-userでPM2をインストールします。

```
npm install pm2@5.1.0 -g
```

ecosystem.config.jsファイルを新規作成する
```
cd /home/garden-user/garden/node_services
pm2 ecosystem
```

作成されたファイルの内容を変更します。
```
vi /home/garden-user/garden/node_services/ecosystem.config.js
```

```
module.exports = {
  apps : [
    {
      name: 'portal',
      script: 'npm --prefix /home/garden-user/garden/node_services/GARDEN_Portal/server run start',
      error_file: '/home/garden-user/garden/node_services/GARDEN_Portal/server/logs/err.log',
      out_file: '/home/garden-user/garden/node_services/GARDEN_Portal/server/logs/out.log',
      time: true
    },{
      name: 'road_service',
      script: '/home/garden-user/garden/node_services/Zipc_Microservice-Road/index.js',
      error_file: '/home/garden-user/garden/node_services/Zipc_Microservice-Road/logs/err.log',
      out_file: '/home/garden-user/garden/node_services/Zipc_Microservice-Road/logs/out.log',
      time: true
    },{
      name: 'scenario_editor',
      script: 'npm --prefix /home/garden-user/garden/node_services/Zipc_ScenarioEditor run start',
      error_file: '/home/garden-user/garden/node_services/Zipc_ScenarioEditor/logs/err.log',
      out_file: '/home/garden-user/garden/node_services/Zipc_ScenarioEditor/logs/out.log',
      time: true
    }
  ]
};

```


apache2.confの設定を変更します。
```
sudo vi /etc/apache2/apache2.conf
```
以下を追記します。
```
<Directory /home/garden-user/etc/tomcat/webapps>
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
</Directory>
```

![](/images/tutorial/Build.ja/2021-06-22-09-15-49.png)




Locationを追記します。
```
<Location /scenario_modeler/>
        ProxyPass ajp://localhost:8080/scenario_modeler/
</Location>
<Location /rdf_viewer/>
        ProxyPass ajp://localhost:8080/rdf_viewer/
</Location>
```


AJPポート設定の追加をします。
```
sudo vi /etc/apache2/mods-available/proxy_ajp.conf
```
proxy_ajp.conf の内容は以下となります。
```
ProxyPass /scenario_modeler/  ajp://localhost:8080/scenario_modeler/
ProxyPass /rdf_viewer/ ajp://localhost:8080/rdf_viewer/
```

proxy proxy_ajp　を有効にします。
```
cd /etc/apache2/mods-available/
sudo a2enmod proxy proxy_ajp
```
![](/images/tutorial/Build.ja/2021-06-22-09-17-37.png)

apache2 を再起動します。
```
sudo systemctl restart apache2
```

Tomcatの設定を変更します。
```
sudo vi /home/garden-user/etc/tomcat/conf/server.xml
```
以下を追記します。
```
<Context path="/scenario_modeler"
    docBase="/home/garden-user/etc/tomcat/webapps/Zipc_Webplatform"
    debug="0" reloadable="true" />
<Context path="/rdf_viewer"
    docBase="/home/garden-user/etc/tomcat/webapps/RDFViewer"
    debug="0" reloadable="true" />
```

![](/images/tutorial/Build.ja/2021-06-22-09-19-48.png)



tomcat, apacheを再起動します。
```
sudo systemctl restart tomcat
sudo systemctl restart apache2
```

![](/images/tutorial/Build.ja/2021-06-22-09-20-31.png)




GARDENのサービスを実行するには以下を実行します。
```
cd ~/garden/script
./GARDEN_acacia.sh start_all
```

GARDENのサービスを停止するには以下を実行します。
```
cd ~/garden/script
./GARDEN_acacia.sh stop_all
```

Fusekiデータベースのcompactを実行するには以下を実行します。
```
cd ~/garden/script
./GARDEN_acacia.sh compact_fuseki
```


定時実行の設定をします。

cronをインストールします。
```
sudo apt update
sudo apt install cron
```

crontabファイルを作成します。
```
sudo cp /etc/crontab /etc/cron.d/acacia_cron
sudo vi /etc/cron.d/acacia_cron
```

毎日23:30に、Fuseki Compactを実行する設定をします。

```
# /etc/crontab: system-wide crontab
# Unlike any other crontab you don't have to run the `crontab'
# command to install the new version when you edit this file
# and files in /etc/cron.d. These files also have username fields,
# that none of the other crontabs do.

SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# m h dom mon dow user  command
30 23   * * *  root  cd /home/garden-user/garden/script && "./GARDEN_acacia.sh" "compact_fuseki">>/home/garden-user/garden/script/script.log

```

crontabファイルの設定を有効にします。
```
sudo systemctl restart cron
```
