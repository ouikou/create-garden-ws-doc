---
title: "シナリオの実行"
---

シナリオを実行するためのシェルスクリプト`~/ScenarioExecutor/run.sh`について説明します。
```sh:run.sh
#!/bin/bash
source setup.sh
python ScenarioExecutor.py シナリオ(.json) ウェイポイント(.json) [autoware]
```
`setup.sh`はCARLAのPythonAPIライブラリのパスを設定しています。  
`ScenarioExecutor.py`の引数は以下の通りです。
- **シナリオ(.json)** : シナリオの記述方法のページで説明しているシナリオファイルです。  
- **ウェイポイント(.json)** : RoadEditorからエクスポートしたファイルです。  
- **autoware**: 3番目の引数に`autoware`を指定するとAutowareとros-bridgeを起動します。何も指定しない場合はCARLAの`~/carla/PythonAPI/examples/manual_control.py`を起動します。  
   `autoware`を指定した場合、自車両はAutowareによって自動でコントロールされ、指定しない場合は`manual_control.py`を使用して手動で自車両をコントロールします。

3番目の引数に`autoware`を指定した場合、`ScenarioExecutor.py`はプログラム内で`~/ScenarioExecutor/garden-autoware-agent/src/garden-autoware/launch/garden-autoware.sh`を呼び出します。  
`garden-autoware.sh`以降は下記の順序で呼び出しが行われます。
```
ScenarioExecutor.py
  └── garden-autoware.sh $1 $2 $3
        ├── autoware.sh $1 $2 $3
        │     └── garden-autoware.launch $1 $2 $3
        └── rviz.launch
```
- `$1 $2 $3`は引数です。それぞれ以下の値がセットされます。   
   - **$1**: `town:=マップ名`  
   マップ名はシナリオの`map_id`がセットされます。   
   - **$2**: `spawn_point:=自車両のスポーン位置`  
   自車両のスポーン位置はシナリオの`scenario:opening_scene:ego:start_position:wp_id`と`wp_idx`で指定されたウェイポイントから`x,y,z,roll,pitch,yaw`を取得してセットされます。
   - **$3**: `waypoint:=Autoware用のウェイポイント`  
   Autoware用のウェイポイントには`~/ScenarioExecutor/garden-autoware-agent/src/garden-autoware/config/waypoint`に格納されているcsvファイルのパスがセットされます。  
   ファイル名は`scenario:opening_scene:ego:start_position:wp_id`から取得します。  
- `garden-autoware.launch`内で、Autowareとros-bridgeのノード及び自己位置推定ノードを起動しています。  
   (自己位置推定ノードはCARLAのOdometryセンサーの情報のみ使用して簡易的に自己位置推定を行うScenarioExecutorが提供するノードです。)  
- `rviz.launch`はRVizの起動を行います。  
