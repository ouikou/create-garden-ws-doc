---
title: "Airflow"
---


Airflowをインストールします。

airflowグループを作成します。
```
sudo groupadd airflow
```

airflowユーザを作成します。
```
sudo useradd -s /bin/false -g airflow -d /home/garden-user/etc/airflow airflow
```

権限の設定をします。
```
cd /home/garden-user/etc/airflow
sudo chgrp -R airflow /home/garden-user/etc/airflow
sudo chown -R airflow /home/garden-user/etc/airflow
sudo chmod -R 764 /home/garden-user/etc/airflow
```

Python3.6をインストールします。
```
sudo apt install python3.6 python3-pip
```

psql を使って PostgreSQL へ接続します。
```
sudo -u postgres psql
```

以下のように表示されます。
```
psql (11.12 (Ubuntu 11.12-1.pgdg18.04+1))
"help" でヘルプを表示します。

postgres=#
```

データベース「airflow」を作成します。
```
CREATE DATABASE airflow;
```

psqlを終了してPostgreSQLから切断します。
```
\q
```

ユーザーを切り替えます。
```
sudo su - airflow --shell=/bin/bash
```

環境変数の設定をします。
```
vi ~/.profile
```

.profileの内容は以下となります。
```
# Set airflow home
export AIRFLOW_HOME="/home/garden-user/etc/airflow"

# set python path
export PYTHONPATH=$PYTHONPATH:$AIRFLOW_HOME/dags:$AIRFLOW_HOME/dags/analyzer:$AIRFLOW_HOME/dags/analyzer/datas:$AIRFLOW_HOME/dags/analyzer/utils

# set path so it includes user's pip global installations directory.
export PATH=~/.local/bin:$PATH
# Set python
alias python="python3"
alias pip="pip3"
```

変更を適用します。
```
source ~/.profile
```

psycopg2-binary と setuptools をインストールします。

```
pip install --user --upgrade pip setuptools
pip install --user psycopg2-binary==2.9.1
pip install --user apache-airflow-providers-postgres==1.0.2
```

Airflowをインストールします。
```
AIRFLOW_VERSION=2.0.1
PYTHON_VERSION="$(python --version | cut -d " " -f 2 | cut -d "." -f 1-2)"
CONSTRAINT_URL="https://raw.githubusercontent.com/apache/airflow/constraints-${AIRFLOW_VERSION}/constraints-${PYTHON_VERSION}.txt"
pip install --user "apache-airflow==${AIRFLOW_VERSION}" --constraint "${CONSTRAINT_URL}"
pip install --user airflow_code_editor==4.0.0
```

Airflowの初期化をします。
```
airflow db init
```

airflow.cfg を編集します。
```
vi airflow.cfg
```

airflow.cfgの下記の項目を修正します。
```
default_timezone = Asia/Tokyo
executor = LocalExecutor
sql_alchemy_conn = postgresql+psycopg2://postgres:postgres@localhost:5432/airflow
load_examples = False
endpoint_url = http://localhost:8085/airflow
auth_backend = airflow.api.auth.backend.basic_auth
base_url = http://localhost:8085/airflow
default_ui_timezone = Asia/Tokyo
web_server_port = 8085
enable_proxy_fix = True
flower_url_prefix = /airflow
```
airflow.cfgに下記の項目を追加：
```
[code_editor]
   git_enabled = False

```

airflow.cfgの変更を適用します。
```
airflow db init
```

アクセスユーザーの作成をします。
```
airflow users create \
--role Admin \
--username admin \
--firstname admin \
--lastname user \
--email admin@acme.com \
--password admin
```
airflowユーザーをログアウトします。

```
exit
```


airflow-scheduler.serviceファイルを作成します。
```
sudo vi /etc/systemd/system/airflow-scheduler.service
```

airflow-scheduler.serviceの内容は以下となります。
```
[Unit]
Description=Airflow scheduler daemon
After=network.target postgresql.service
Wants=postgresql.service

[Service]
# which airflow
Environment="PATH=/bin:/home/garden-user/etc/airflow/.local/bin:$PATH"
Environment="PYTHONPATH=$PYTHONPATH:/home/garden-user/etc/airflow/dags:/home/garden-user/etc/airflow/dags/analyzer:/home/garden-user/etc/airflow/dags/analyzer/datas:/home/garden-user/etc/airflow/dags/analyzer/utils"
# AIRFLOW_HOME
Environment="AIRFLOW_CONFIG=/home/garden-user/etc/airflow/airflow.cfg"
Environment="AIRFLOW_HOME=/home/garden-user/etc/airflow"
# Execute User
User=airflow
Group=airflow
Type=simple
# which airflow
ExecStart= /home/garden-user/etc/airflow/.local/bin/airflow scheduler
Restart=on-failure
RestartSec=5s
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

airflow-webserver.serviceファイルを作成します。
```
sudo vi /etc/systemd/system/airflow-webserver.service
```

airflow-webserver.serviceの内容は以下となります。
```
[Unit]
Description=Airflow scheduler daemon
After=network.target postgresql.service
Wants=postgresql.service

[Service]
# which airflow
Environment="PATH=/bin:/home/garden-user/etc/airflow/.local/bin:$PATH"
Environment="PYTHONPATH=$PYTHONPATH:/home/garden-user/etc/airflow/dags:/home/garden-user/etc/airflow/dags/analyzer:/home/garden-user/etc/airflow/dags/analyzer/datas:/home/garden-user/etc/airflow/dags/analyzer/utils"
# AIRFLOW_HOME
Environment="AIRFLOW_CONFIG=/home/garden-user/etc/airflow/airflow.cfg"
Environment="AIRFLOW_HOME=/home/garden-user/etc/airflow"
# Execute User
User=airflow
Group=airflow
Type=simple
# which airflow
ExecStart= /home/garden-user/etc/airflow/.local/bin/airflow webserver
Restart=on-failure
RestartSec=5s
PrivateTmp=true

[Install]
WantedBy=multi-user.target

```

設定ファイルを再読込します。
```
sudo systemctl daemon-reload
```

サービス自動起動を有効にします。
```
sudo systemctl enable airflow-scheduler
sudo systemctl enable airflow-webserver
```

Apache Airflow を起動します。
```
sudo systemctl start airflow-scheduler
sudo systemctl start airflow-webserver
```

Apache Airflow にアクセスします。

http://localhost:8085/airflow
