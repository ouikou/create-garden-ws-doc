---
title: "ユーザー作成"
---

Ubuntu 18.04 上にユーザーを作成します。ホームディレクトリを /home/garden-user に指定して、ユーザーを作成します。


```
sudo useradd -s /bin/bash -m -d /home/garden-user -c "GARDEN user" garden-user
```

パスワードを "garden" に設定します。

```
sudo passwd garden-user
```

garden-user に sudo の権限を与えます。

```
sudo usermod -aG sudo garden-user
```

アプリ配置ディレクトリを作成します。
garden-user に切り替えます。

```
sudo su - garden-user
```

garden-user のhomeディレクトリの直下に下記のようなフォルダを作成します。

```
mkdir -p {etc/{airflow/{dags,data},fuseki,tomcat},garden/{war,dags,script,job_executor,node_services},tmp}
```

```
/home/garden-user/
├── etc
│   ├── airflow
│   　　　├── dags
│   　　　└── data
│   ├── fuseki
│   └── tomcat
├── garden
│   ├── war
│   ├── dags
│   ├── script
│   ├── job_executor
│   └── node_services
├── tmp
└── .pgpass
```

