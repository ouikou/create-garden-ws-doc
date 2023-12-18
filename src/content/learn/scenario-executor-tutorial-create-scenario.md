---
title: "シナリオの記述方法"
---

シナリオの記述方法について解説します。  
シナリオはjson形式で記述します。  
サンプルのシナリオファイルが`~/ScenarioExecutor/scenarios`フォルダ内にありますので、参考にしてください。  

シナリオの記述内容は大きく4つのブロックに分かれています。  
|ブロック|記述内容|
|:--|:--|
|map_id|RoadEditorのIDを指定します。|
|actors|シナリオに登場する自車両、他車両、歩行者、障害物の情報を記述します。|
|scenario|さまざまなシーンを定義し、シーン中にアクターがどのように振舞うか、シーン間をどのような条件で遷移するかを記述します。|
|stop_condition|シナリオの終了条件を記述します。|
- **map_id**  
   RoadEditorのIDを指定します。  
   ![](/images/tutorial/ScenarioExecutor/2_12.png)  

   ```json
   "map_id": "highway"
   ```


- **actors**  
   シナリオ内に登場するアクターを定義します。  
   - **ego**  
   自車両を定義します。
      - **actor_id** (int)  
      アクターのIDを指定します。アクターが複数存在する場合、重複しない値を指定します。  
      - **model_id** (string)  
      CARLAで定義されている車種のIDを指定します。  
      現在、シナリオから自車両の車種を指定することはできません。ros-bridge 0.9.11では`ros-bridge/carla_spawn_objects/config/objects.json`内で自車両の車種を指定します。  
      - **color**  (string)  
      車両の色を指定します(RGB16進数)。  
      現在、シナリオから自車両の色を指定することはできません。ros-bridgeの仕様でランダムになっています。  
   - **others**  
   他車両、歩行者等の障害物を定義します。  
      - **actor_id** (int)
      アクターのIDを指定します。アクターが複数存在する場合、重複しない値を指定します。  
      - **model_id** (string)  
      CARLAで定義されている車種のIDを指定します。  
      他車両として指定できるIDは以下になります。  

         |model_id|
         |:--|
         |`vehicle.audi.a2`|
         |`vehicle.audi.etron`|
         |`vehicle.audi.tt`|
         |`vehicle.bmw.grandtourer`|
         |`vehicle.chevrolet.impala`|
         |`vehicle.charger2020.charger2020`|
         |`vehicle.garden.gambulancejp`|
         |`vehicle.garden.gpolicecarjp`|
         |`vehicle.garden.gpumperjp`|
         |`vehicle.lincoln2020.mkz2020`|
         |`vehicle.mercedesccc.mercedesccc`|
         |`vehicle.mini.cooperst`|
         |`vehicle.nissan.micra`|
         |`vehicle.tesla.model3`|
         |`vehicle.toyota.prius`|
         |`vehicle.volkswagen.t2`|
         |`vehicle.kawasaki.ninja`|

      - **color**  (string)  
      車両の色を指定します(RGB16進数)。  

   ``` json
   "actors": {
      "ego": {
         "actor_id": 0,
         "model_id": "vehicle.toyota.prius",
         "color": "000000"
      },
      "others": [
         {
            "actor_id": 1,
            "model_id": "vehicle.nissan.micra",
            "color": "ff0000"
         },
         {
            "actor_id": 2,
            "model_id": "vehicle.kawasaki.ninja",
            "color": "00ff00"
         }
      ]
   }
   ```

- **scenario**  
   シナリオを定義します。  
   シナリオはオープニングシーンから始まり、さまざまなシーンへの遷移を経て、最終的にエンディングシーンに遷移して終了となります。  
   - **opening_scene**  
   各アクターの初期状態を定義します。  
      - **ego**  
      自車両の初期状態を定義します。  
         - **start_position**  
         自車両の初期位置を指定します。  
         `wp_id`と`wp_idx`で指定したウェイポイントの座標が自車両の初期位置になります。  
            - **wp_id** (string)  
            ウェイポイントID(RoadEditorでルートを定義した際に付けた名前)を指定します。  
            ![](/images/tutorial/ScenarioExecutor/3_2.png)  
            - **wp_idx** (int)  
            ウェイポイントのインデックスを指定します。RoadEditorでウェイポイントをクリックすると参照することができます。  
            ![](/images/tutorial/ScenarioExecutor/3_3.png)  
         - **end_position**  
         自車両の終了位置を指定します。  
         `wp_id`と`wp_idx`で指定したウェイポイントの座標が自車両の終了位置になります。  
         現在未使用です。Autowareの場合、Autoware自身が持つウェイポイントの終点が終了位置になりますので、シナリオで終了位置を指定することはできません。
            - **wp_id** (string) - `start_position`の`wp_id`と同じです。  
            - **wp_idx** (int) - `start_position`の`wp_idx`と同じです。  
      - **others**  
      他車両、歩行者等の障害物の初期状態を定義します。  
         - **actor_id** (int)  
         対象となるアクターのIDを指定します。  
         - **start_position**  
            - **type** (string)  
            ウェイポイントの座標で指定する場合は`waypoint`を指定します。アクター間の距離で指定する場合は`distance`を指定します。  
            - **wp_id** (string)  
            typeがwaypointのときwp_idを指定します。`ego`の`start_postion`と同じです。  
            - **wp_idx** (int)  
            typeがwaypointのときwp_idxを指定します。`ego`の`start_postion`と同じです。  
            - **target_actor_id** (int)  
            typeがdistanceのとき車間距離の基準となる相手のアクターを指定します。  
            - **distance** (double)  
            typeがdistanceのとき車間距離を指定します。  
            - **measure_type** (string)  
            typeがdistanceのとき車間距離をアクターの中心のからの距離で指定する場合は`center`を指定します。アクターの表面からの距離で指定する場合は`surface`を指定します。  
            ![](/images/tutorial/ScenarioExecutor/3_4.png)  
         - **start_speed**  
         アクターの初期速度を指定します。  
            - **type** (string)  
            絶対速度の場合は`absolute`を指定します。相対速度の場合は`relative`を指定します。  
               - **target_actor_id** (int)  
               typeが`absolute`のとき相対速度の基準となる相手のアクターを指定します。  
               - **value** (double)  
               速度(km/h)を指定します。typeが`absolute`のときは絶対速度、typeが`relative`のときは相対速度を意味します。  
               - **accel**  
               typeが`absolute`のとき加速度を指定します。  
               - **type** (string)  
               徐々に加速させたい場合は`specify`を指定します。即時valueの速度にしたい場合は`gods_hand`を指定します。  
               - **value** (double)  
               typeが`specify`のとき加速度(m/s<sup>2</sup>)を指定します。  
      - **next_scenes**  
      次に遷移するシーンのIDを指定します。  
         各シーンの定義には遷移条件が設定されており、next_scenesで指定したいずれかのシーンの遷移条件がtrueとなった時点でそのシーンに遷移します。  
         ![](/images/tutorial/ScenarioExecutor/3_5.png)  

      ```json
      "opening_scene": {
         "ego": {
            "start_position": {
                  "wp_id": "Waypoint01",
                  "wp_idx": 0
            }
         }
         "others": [
            {
               "actor_id": 1,
               "start_position": {
                  "wp_id": "Waypoint01",
                  "wp_idx": 20
               },
               "start_speed": {
                  "type": "relative",
                  "target_actor_id": 0,
                  "vlaue": 0,
               },
               "next_scenes": [
                  1, 2
               ]
            }
         ]
      }
      ```

  - **scenes**  
   シーンを定義します。遷移条件、アクション、遷移先から構成されます。  
      - **scene_id** (int)  
      シーンIDを指定します。  
      - **duration** (double)  
      ここで指定した時間(s)、強制的にシーンにとどまり続けます。  
      次のシーンへの遷移条件がtrueになっても、ここで指定した時間が経過するまで遷移しません。  
      - **conditions**  
      遷移条件を定義します。  
         - **operator**  
         複数の遷移条件を`or`で判定するか`and`で判定するかを指定します。  
            - **position**  
            アクターが指定の位置に到達した場合の遷移条件を定義します。  
               - **actor_id** (int)  
               対象のアクターを指定します。  
               - **type** (string)  
               指定のウェイポイントに到達した場合は`reach`を指定します。現在は`reach`のみ指定できます。  
               - **wp_id** (string)  
               typeが`reach`のときウェイポイントのIDを指定します。  
               - **wp_idx** (int)  
               typeが`reach`のときウェイポイントのインデックスを指定します。  
               - **tolerance** (double)  
               typeが`reach`のときwp_id、wp_idxで指定した座標の許容範囲の半径を指定します。  
            - **distance**  
            アクター同士の間隔が指定の距離に到達した場合の遷移条件を定義します。  
               - **actor_id** (int)  
               対象のアクターを指定します。  
               - **type** (string)  
               直線距離の場合は`straight`を指定します。道路の中心線を基準にした距離の場合は`traveled`を指定します。現在は`traveled`のみ指定できます。  
               ![](/images/tutorial/ScenarioExecutor/3_6.png)  
               - **target_actor_id** (int)  
               距離の基準となるアクターを指定します。  
               - **comparison** (string)  
               `>、>=、=、<=、<`のいずれかを指定します。  
               - **value** (double)  
               距離(m)を指定します。  
               - **measure_type** (string)  
               アクターの中心のからの距離で指定する場合は`center`を指定します。アクターの表面からの距離で指定する場合は`surface`を指定します。  
            - **speed**  
            アクターが指定の速度に到達した場合の遷移条件を定義します。  
               - **actor_id** (int)  
               対象のアクターを指定します。  
               - **type** (string)  
               絶対速度の場合は`absolute`を指定します。相対速度の場合は`relative`を指定します。現在は`absolute`のみ指定できます。  
               - **target_actor_id** (int)  
               typeが`relative`のとき相対速度の基準となるアクターを指定します。  
               - **comparison** (string)  
               `>、>=、=、<=、<`のいずれかを指定します。  
               - **value** (double)  
               速度(km/h)を指定します。typeが`absolute`のときは絶対速度、typeが`relative`のときは相対速度を意味します。  
            - **time_headway**  
            アクターが指定した地点に到着するまでの時間が指定した時間に達した場合の遷移条件を定義します。  
            距離を速度で割った時間で判定します。  
               - **actor_id** (int)  
               対象のアクターを指定します。  
               - **wp_id** (string)  
               ウェイポイントのIDを指定します。  
               - **wp_idx** (int)  
               ウェイポイントのインデックスを指定します。  
               - **comparison** (string)  
               `>、>=、=、<=、<`のいずれかを指定します。  
               - **value** (double)  
               時間(s)を指定します。  
            - **collision**  
            衝突時の遷移条件を定義します。  
            - **actor_id** (int)  
            対象のアクターを指定します。現在は自車のみ指定できます。  
            - **simulation_time**  
            シミュレーション開始からの経過時間の遷移条件を定義します。  
               - **comparison** (string)  
               `>=`のみ指定できます。  
               - **value** (double)  
               時間(s)を指定します。  

         ``` json
         "conditions": {
            "or": [
               {
                  "position": {
                     "actor_id": 1,
                     "type": "reach",
                     "wp_id": "Waypoint01",
                     "wp_idx": 125,
                     "tolerance": 1
                  }
               },
               {
                  "speed": {
                     "actor_id": 1,
                     "type": "absolute",
                     "comparison": "<=",
                     "value": 0.1
                  }
               }
            ]
         }
         ```

      - **actions**  
      シーンに遷移したときに実行するアクションを定義します。  
         - **lane_change**  
         レーンチェンジのアクションを定義します。  
            - **actor_id** (int)  
            対象のアクターを指定します。  
            - **type** (string)  
            laneのみ指定できます。  
            - **wp_id** (string)  
            レーンチェンジ先のウェイポイントIDを指定します。  
            - **time** (double)  
            レーンチェンジにかかる時間を指定します。  
         - **lane_offset**  
         レーンの中心線から左右にオフセットするアクションを定義します。  
            - **actor_id** (int)  
            対象のアクターを指定します。  
            - **value** (double)  
            レーンの中心線から左右にオフセットする距離(m)を指定します。左にオフセットする場合は+。右にオフセットする場合は-。0はレーンの中心線を走行します。  
            - **time** (double)  
            オフセットにかかる時間(s)を指定します。  
         - **speed**  
         速度変更のアクションを定義します。  
            - **actor_id** (int)  
            対象のアクターを指定します。  
            - **type** (string)  
            絶対速度の場合は`absolute`を指定します。相対速度の場合は`relative`を指定します。  
            - **target_actor_id** (int)  
            typeが`relative`のとき相対速度の基準となるアクターを指定します。  
            - **value** (double)  
            速度(km/h)を指定します。typeが`absolute`のときは絶対速度、typeが`relative`のときは相対速度を意味します。  
            - **accel**  
            typeがabsoluteのとき加速度を指定します。  
               - **type** (string)  
               徐々に加速させたい場合は`specify`を指定します。即時valueの速度にしたい場合は`gods_hand`を指定します。  
               - **value** (double)  
               typeが`specify`のとき加速度(m/s<sup>2</sup>)を指定します。  
         - **traveled_distance**  
         車間距離を維持するアクションを定義します。  
            - **actor_id** (int)  
            対象のアクターを指定します。  
            - **target_actor_id** (int)  
            車間距離の基準となる相手のアクターを指定します。  
            - **value** (double)  
            車間距離(m)を指定します。+は前方、-は後方になります。  
            - **measure_type** (string)  
            アクターの中心のからの距離で指定する場合は`center`を指定します。アクターの表面からの距離で指定する場合は`surface`を指定します。  
         - **route_move**  
         指定した地点に移動させるアクションを定義します。地点は複数指定できます。  
            - **actor_id** (int)  
            対象のアクターを指定します。  
            - **type**  
            指定したウェイポイントに向かって移動させたい場合は`waypoint`を指定します。(現在はアクターが歩行者の場合のみ有効です)  
            現在走行しているウェイポイントから左右にオフセットした位置に移動させたい場合は`wp_offset`を指定します。  
            - **route**  
            ルートを定義します。  
               - **wp_id** (string)  
               typeがwaypointの場合、ウェイポイントのIDを指定します。  
               - **wp_idx** (int)  
               typeがwaypointの場合、ウェイポイントのインデックスを指定します。  
               - **wp_offset** (double)  
               typeが`wp_offset`の場合、レーンの中心線から左右にオフセットする距離(m)を指定します。左にオフセットする場合は+、右にオフセットする場合は-です。0はレーンの中心線を走行します。  
               - **time** (double)  
               前回の地点から次の地点までの移動時間(s)を指定します。速度は移動先までの距離と移動時間から自動的に計算されます。  

            ```json
            "route_move": {
               "actor_id": 1,
               "type": "waypoint",
               "route": [
                  {
                     "time": 7.2,
                     "wp_id": "Waypoint02",
                     "wp_idx": 500,
                     "wp_offset": 5
                  }
               ]
            }
            ```

         - **light_state**  
         ライトの点灯/消灯のアクションを定義します。  
            - **actor_id** (int)  
            対象のアクターを指定します。  
            - **blinker_left** (bool)  
            左ウィンカーをを点灯するときは`true`、消灯するときは`false`を指定します。  
            - **blinker_right**  
            右ウィンカーをを点灯するときは`true`、消灯するときは`false`を指定します。  
            - **special1**  
            特殊なライトの点灯/消灯を行います。
            点灯するときは`true`、消灯するときは`false`を指定します。  
            車種ごとに対象となるライトが異なります。現在緊急車両のパトライトの点灯/消灯のみ対応しています。  
         - **sound_state**  
         サイレンの鳴動/停止のアクションを定義します。  
            - **actor_id** (int)  
            対象のアクターを指定します。  
            - **sound** (bool)  
            サイレンを鳴動させるときは`true`、停止するときは`false`を指定します。  

         ``` json
         "actions": [
            {
               "lane_change": {
                  "actor_id": 1,
                  "type": "lane",
                  "wp_id": "Waypoint02",
                  "time": 5
               }
            }
         ]
         ```

      - **next_scenes** - `opening_scene`の`next_scenes`と同じです。  
      - **ending_scene**  
      最終シーンを定義します。  
      このシーンに到達したらシナリオが終了になります。  
         - **scene_id** - `scenes`の`scene_id`と同じです。  
         - **conditions** - `scenes`の`condition`と同じです。  

   ```json
   "scenario": {
      "opening_scene": {
         "ego": {
            ...
         },
         "others": [
            ...
         ],
         "next_scenes": [
            1
         ]
      },
      "scenes": [
         {
            "scene_id": 1,
            "conditions": {
               ...
            },
            "actions": [
               ...
            ],
            "next_scenes": [
               2
            ]
         },
         {
            "scene_id": 2,
            "conditions": {
               ...
            },
            "actions": [
               ...
            ],
            "next_scenes": [
               3
            ]
         }
      ],
      "ending_scenes": [
         {
            "scene_id": 3,
            "conditions": {
               ...
            }
         }
      ]
   }
   ```

- **stop_conditions** - `scenes`の`conditions`と同じです。  
   シナリオの終了条件を定義します。  
   条件が成立したら強制的にシナリオを終了します。  

   ```json
   "stop_conditions": {
      "or": [
         {
            "simulation_time": {
               "comparison": ">=",
               "value": 300
            }
         }
      ]
   }
   ```
