---
title: "実行ログ"
---

ScenarioExecutorを実行すると、シミュレーション実行時のログが保存されます。   
ログの保存先は`~/ScenarioExecutor/log`です。ファイル名はシナリオのファイル名と同じで、拡張子が`.csv`になります。  
ログに保存される内容は以下の通りです。
|項目|内容|
|:--|:--|
|timestamp|タイムスタンプ(50ms間隔でログを保存します)|
|scene_id|シナリオのscene_id|
|ego_x|自車両のx座標 (m)|
|ego_y|自車両のy座標 (m)|
|ego_z|自車両のz座標 (m)|
|ego_roll|自車両のroll (ラジアン)|
|ego_pitch|自車両のpitch (ラジアン)|
|ego_yaw|自車両のyaw (ラジアン)|
|ego_lane_id|自車両の最寄りのレーンID (RoadEditorで定義したルートの順番に0から番号が割り振られます)|
|collision|自車両の衝突の有無 (通常は0で衝突時は0以外の値になります)|
|obs0_x|障害物0のx座標 (m)|
|obs0_y|障害物0のy座標 (m)|
|obs0_z|障害物0のz座標 (m)|
|obs0_roll|障害物0のroll (ラジアン)|
|obs0_pitch|障害物0のpitch (ラジアン)|
|obs0_yaw|障害物0のyaw (ラジアン)|
|obs0_lane_id|障害物0の最寄りのレーンID (RoadEditorで定義したルートの順番に0から番号が割り振られます)|

障害物が複数ある場合は、obs1,obs2…と続きます。  
座標は自車両、各障害物、すべて地図の原点からの座標になります。  