---
title: "PostgreSQL"
---


認証キーの追加をします。

```
sudo curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
```

リポジトリの追加をします。

```
lsb_release -c
```

```
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
```

PostgreSQL をインストールします。

```
sudo apt update
sudo apt install postgresql-11
```

.pgpassファイルの設定をします。

データベースに接続するとき、psqlは強制的にパスワード入力を促しますので、パスワードの入力省略するため、事前に.pgpassファイルを作成します。

garden-userに切り替えます
```
sudo su - garden-user
```

.pgpassファイルを編集します。
```
vi ~/.pgpass
```

.pgpassファイルの内容は以下の通りです。

```.pgpass
# データベースgardenの接続情報
localhost:5432:garden:postgres:postgres

# データベースairflowの接続情報
localhost:5432:airflow:postgres:postgres
```

.pgpassファイルの権限を変更します。
```
chmod 600 ~/.pgpass
```

外部接続許可設定（オプション）

外部から接続するため、接続許可の設定をします。

 postgresql.conf を編集します。

 ```
 sudo vi /etc/postgresql/11/main/postgresql.conf
 ```

 57行目【# - Connection Settings -】の付近、listen_addresses = '*' を追加し、すべての通信を受け入れます。

```
 # - Connection Settings -

#listen_addresses = 'localhost'         # what IP address(es) to listen on;
listen_addresses = '*'
```

 pg_hba.conf の編集をします。

```
 sudo vi /etc/postgresql/11/main/pg_hba.conf
```

91行目【# IPv4 local connections:】の付近、認証を受け付けるIP/IP範囲を追記します。
```
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
host    all             all             0.0.0.0/0                 md5
```

firewallがアクティブになる場合、portの許可を追加します。

```
sudo ufw allow 5432/tcp
```

postgres ユーザーのパスワード設定をします。

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

postgres ユーザーのパスワードを "postgres" に設定します。

```
\password postgres
```

データベース「garden」を作成します。

```
CREATE DATABASE garden;
```

データベース「garden」に接続します。

```
\c garden
```

以下の２つのSQLを実行して、データベース「garden」にテーブルを作成します。

```
CREATE TABLE public.drivingdata
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    sourcetype character varying(255) COLLATE pg_catalog."default",
    sourceuri bytea,
    CONSTRAINT drivingdata_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.drivingdata
    OWNER to postgres;
```

```
CREATE TABLE public.importeddata
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    drivingdataid bigint,
    lat double precision,
    latmax double precision,
    latmin double precision,
    lon double precision,
    lonmax double precision,
    lonmin double precision,
    mapid character varying(255) COLLATE pg_catalog."default",
    measurement character varying(255) COLLATE pg_catalog."default",
    status integer,
    CONSTRAINT importeddata_pkey PRIMARY KEY (id),
    CONSTRAINT importeddata_measurement UNIQUE (measurement)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.importeddata
    OWNER to postgres;
```

psqlを終了してPostgreSQLから切断します。

```
\q
```

PostgreSQLサーバを起動します。

```
sudo service postgresql start
```


