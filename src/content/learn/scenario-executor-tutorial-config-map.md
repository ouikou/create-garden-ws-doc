---
title: "マップの追加"
---

以下の流れに沿ってCARLAにマップを追加します。  
詳細な手順を以降に記載します。
![](/images/tutorial/ScenarioExecutor/2_11.png)  

## 道路のメッシュの作成 {/*scenario-executor-tutorial-config-map-mesh*/}
RoadEditorを使用し地図を作成してください。  
作成したら`File > Export OBJ`でエクスポートしてください。  
## ルートの定義 {/*scenario-executor-tutorial-config-map-route*/}
RoadEditorで自車両及び他車両が走行するルートを定義してください。  
定義したら`File > Export Waypoint`でエクスポートしてください。  
## OpenDriveの作成 {/*scenario-executor-tutorial-config-map-opendrive*/}
RoadEditorの`File > Save`で出力したファイルから、OpenDrive変換ツールを使用しOpenDriveを作成してください。  
## Unreal Engineにマップを追加 {/*scenario-executor-tutorial-config-map-ue*/}
RoadEditorからエクスポートしたobjファイルをそのままCARLAにインポートするとスケールと座標系が異なるため、事前に修正を行う必要があります。  
ここではBlenderを使用した修正方法について記載します。  
1. Blenderを起動し、`File > Import > Wavefront (.obj)`を選択します。  
   RoadEditorからエクスポートしたobjファイルを選択しインポートします。  
2. アスファルト部分のメッシュと白線部分のメッシュに分かれているため、アスファルト部分のみ選択します。  
   ![](/images/tutorial/ScenarioExecutor/2_1.png)  
3. `File > Export > FBX (.fbx)`を選択します。  
   `Limit to Selected Objects`にチェックを入れます。  
   `Object Types`は`Mesh`のみ選択します。  
   `Export FBX`をクリックします。  
   ![](/images/tutorial/ScenarioExecutor/2_2.png)  
4. 同様に白線部分もエクスポートします。  
   ![](/images/tutorial/ScenarioExecutor/2_3.png)  
   ![](/images/tutorial/ScenarioExecutor/2_4.png)  
5. CARLAにインポートします。  
   インポート先のフォルダで右クリックし`Import to /Game/...`を選択します。  
   ![](/images/tutorial/ScenarioExecutor/2_5.png)  
   Blenderからエクスポートしたfbxファイルを選択します。  
   ![](/images/tutorial/ScenarioExecutor/2_6.png)  
   そのまま`Import All`をクリックします。  
   ![](/images/tutorial/ScenarioExecutor/2_7.png)  
6. 空のマップを用意します。  
   `/Content/Carla/Maps/BaseMap/BaseMap`を`/Content/Garden/Maps`にドラッグアンドドロップし、`Copy Here`を選択します。  
   ![](/images/tutorial/ScenarioExecutor/2_8.png)  
   マップ名を変更しRoadEditorのIDと同じ名前を付けます。  
   ![](/images/tutorial/ScenarioExecutor/2_12.png)  
   マップ名はOpenDriveのファイル名とも一致している必要があります。  
7. 空のマップを開き、道路のメッシュを配置します。  
   ![](/images/tutorial/ScenarioExecutor/2_9.png)  
   LocationとRotationはすべて0にしてください。
8. ScenarioExecutorのBlueprintを配置します。  
   `/Content/Garden/Blueprints/ScenarioExecutor/Garden_ScenarioExecutor`をマップ上にドラッグアンドドロップして配置します。
   ![](/images/tutorial/ScenarioExecutor/2_10.png)  
9. OpenDriveを格納します。  
   `~/ScenarioExecutor/Content/Garden/Maps/OpenDrive`にマップと同名のOpenDriveを格納します。
## ウェイポイントの格納 {/*scenario-executor-tutorial-config-map-waypoints*/}
1. ウェイポイントを格納します。  
   `~/ScenarioExecutor/waypoints`にRoadEditorからエクスポートしたウェイポイント(.json)を格納してください。
2. RoadEditorからエクスポートしたウェイポイント(.json)をAutoware用のウェイポイント(.csv)に変換します。  
   以下のコマンドを実行します。  
   ```
   cd ~/ScenarioExecutor/util
   python AutowareWaypointConvertor.py ファイル名 速度
   ```
   - **ファイル名**: RoadEditorからエクスポートしたウェイポイント(.json)
   - **速度**: ウェイポイントの速度(km/h)  
     速度を省略した場合、RoadEditorでルートを定義した際に設定した速度が使用されます。   
3. 生成されたウェイポイントファイル(.csv)を`~/ScenarioExecutor/garden-autoware-agent/src/garden-autoware/config/waypoint`に格納します。
