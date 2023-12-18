---
title: "Apache Jena Fuseki"
---

Apache Jena Fusekiをインストールします。

fusekiグループを作成します。
```
sudo groupadd fuseki
```

fusekiユーザを作成します。
```
sudo useradd -s /bin/false -g fuseki -d /home/garden-user/etc/fuseki fuseki
```

Apache Jena Fusekiをダウンロードします。
```
cd ~/tmp
wget http://archive.apache.org/dist/jena/binaries/apache-jena-fuseki-3.17.0.tar.gz
```

ダウンロードファイルを展開します。
```
sudo tar xzvf apache-jena-fuseki-3.17.0.tar.gz -C /home/garden-user/etc/fuseki --strip-components=1
```

権限の設定をします。
```
sudo chgrp -R fuseki /home/garden-user/etc/fuseki
sudo chown -R fuseki /home/garden-user/etc/fuseki
sudo chmod -R 764 /home/garden-user/etc/fuseki
```

データベース設定ファイルの格納ディレクトリを作成します。
```
sudo -u fuseki mkdir -p /home/garden-user/etc/fuseki/run/configuration
```

データベース設定ファイル garden.ttl を作成します。
```
sudo -u fuseki vi /home/garden-user/etc/fuseki/run/configuration/garden.ttl
```

garden.ttl ファイルの内容は以下となります。
```
@prefix :      <http://base/#> .
@prefix rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix tdb2:  <http://jena.apache.org/2016/tdb#> .
@prefix ja:    <http://jena.hpl.hp.com/2005/11/Assembler#> .
@prefix rdfs:  <http://www.w3.org/2000/01/rdf-schema#> .
@prefix fuseki: <http://jena.apache.org/fuseki#> .
tdb2:DatasetTDB  rdfs:subClassOf  ja:RDFDataset .
ja:DatasetTxnMem  rdfs:subClassOf  ja:RDFDataset .
<http://jena.hpl.hp.com/2008/tdb#DatasetTDB>
        rdfs:subClassOf  ja:RDFDataset .
ja:ViewGraph  rdfs:subClassOf  ja:Model .
<http://jena.hpl.hp.com/2008/tdb#GraphTDB>
        rdfs:subClassOf  ja:Model .
tdb2:GraphTDB2  rdfs:subClassOf  ja:Model .
ja:MemoryDataset  rdfs:subClassOf  ja:RDFDataset .
ja:RDFDatasetZero  rdfs:subClassOf  ja:RDFDataset .
<http://jena.apache.org/text#TextDataset>
        rdfs:subClassOf  ja:RDFDataset .
:service_tdb_all  a                   fuseki:Service ;
        rdfs:label                    "TDB2 garden" ;
        fuseki:dataset                :tdb_dataset_readwrite ;
        fuseki:name                   "garden" ;
        fuseki:serviceQuery           "query" , "" , "sparql" ;
        fuseki:serviceReadGraphStore  "get" ;
        fuseki:serviceReadWriteGraphStore
                "data" ;
        fuseki:serviceUpdate          "" , "update" ;
        fuseki:serviceUpload          "upload" .
:tdb_dataset_readwrite
        a              tdb2:DatasetTDB2 ;
        tdb2:location  "/home/garden-user/etc/fuseki/run/databases/garden" .
tdb2:GraphTDB  rdfs:subClassOf  ja:Model .
ja:RDFDatasetOne  rdfs:subClassOf  ja:RDFDataset .
ja:RDFDatasetSink  rdfs:subClassOf  ja:RDFDataset .
tdb2:DatasetTDB2  rdfs:subClassOf  ja:RDFDataset .
```

データベース設定ファイル「garden_rdf.ttl」を作成します。
```
sudo -u fuseki vi /home/garden-user/etc/fuseki/run/configuration/garden_rdf.ttl
```

garden_rdf.ttl ファイルの内容は以下となります。
```
@prefix :      <http://base/#> .
@prefix rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix tdb2:  <http://jena.apache.org/2016/tdb#> .
@prefix ja:    <http://jena.hpl.hp.com/2005/11/Assembler#> .
@prefix rdfs:  <http://www.w3.org/2000/01/rdf-schema#> .
@prefix fuseki: <http://jena.apache.org/fuseki#> .
tdb2:DatasetTDB  rdfs:subClassOf  ja:RDFDataset .
ja:DatasetTxnMem  rdfs:subClassOf  ja:RDFDataset .
<http://jena.hpl.hp.com/2008/tdb#DatasetTDB>
        rdfs:subClassOf  ja:RDFDataset .
ja:ViewGraph  rdfs:subClassOf  ja:Model .
<http://jena.hpl.hp.com/2008/tdb#GraphTDB>
        rdfs:subClassOf  ja:Model .
tdb2:GraphTDB2  rdfs:subClassOf  ja:Model .
ja:MemoryDataset  rdfs:subClassOf  ja:RDFDataset .
ja:RDFDatasetZero  rdfs:subClassOf  ja:RDFDataset .
<http://jena.apache.org/text#TextDataset>
        rdfs:subClassOf  ja:RDFDataset .
:service_tdb_all  a                   fuseki:Service ;
        rdfs:label                    "TDB2 garden_rdf" ;
        fuseki:dataset                :tdb_dataset_readwrite ;
        fuseki:name                   "garden_rdf" ;
        fuseki:serviceQuery           "query" , "" , "sparql" ;
        fuseki:serviceReadGraphStore  "get" ;
        fuseki:serviceReadWriteGraphStore
                "data" ;
        fuseki:serviceUpdate          "" , "update" ;
        fuseki:serviceUpload          "upload" .
:tdb_dataset_readwrite
        a              tdb2:DatasetTDB2 ;
        tdb2:location  "/home/garden-user/etc/fuseki/run/databases/garden_rdf" .
tdb2:GraphTDB  rdfs:subClassOf  ja:Model .
ja:RDFDatasetOne  rdfs:subClassOf  ja:RDFDataset .
ja:RDFDatasetSink  rdfs:subClassOf  ja:RDFDataset .
tdb2:DatasetTDB2  rdfs:subClassOf  ja:RDFDataset .
```

Fusekiのサービスを設定します。
```
sudo vi /etc/systemd/system/fuseki.service
```

fuseki.serviceの内容は以下となります。
```
[Unit]
Description=Fuseki

[Service]
# Edit environment variables to match your installation
Environment=FUSEKI_HOME=/home/garden-user/etc/fuseki
Environment=FUSEKI_BASE=/home/garden-user/etc/fuseki/run
# Edit the line below to adjust the amount of memory allocated to Fuseki
Environment=JVM_ARGS=-Xmx4G
# Edit to match your installation
ExecStart=/home/garden-user/etc/fuseki/fuseki-server
# Run as user "fuseki"
User=fuseki
Restart=on-abort
# Java processes exit with status 143 when terminated by SIGTERM, this
# should be considered a successful shutdown
SuccessExitStatus=143
### By default, the service logs to journalctl only.
### If additional logging to a file is required, uncomment the following three lines
# StandardOutput=syslog
# StandardError=syslog
# SyslogIdentifier=fuseki
### This logs to syslog. If, e.g., rsyslogd is used, you can provide a file
### /etc/rsyslog.d/fuseki.conf, consisting of the following two lines (uncommented)
### if $programname == 'fuseki' then /var/log/fuseki/stderrout.log
### if $programname == 'fuseki' then stop


[Install]
WantedBy=multi-user.target
```

設定ファイルを再読込します。
```
sudo systemctl daemon-reload
```

サービスの自動起動を有効にします。
```
sudo systemctl enable fuseki
```

Fusekiサービスを起動します。
```
sudo systemctl start fuseki
```

ブラウザで Apache Jena Fuseki にアクセスします。

 http://localhost:3030/

 ![](/images/tutorial/Jena.ja/2021-06-22-04-05-54.png)
