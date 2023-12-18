---
title: "ビルド手順"
---

## ScenarioExecutor {/*scenario-executor*/}
ScenarioExecutorは自動運転アルゴリズムのテストを行うためのシナリオ実行エンジンです。  
本リポジトリにはCARLAとAutowareを使用し、実際にシナリオを実行しテストを行うデモ環境が含まれています。  
## 動作環境 {/*scenario-executor-env*/}
- Ubuntu 18.04
- CARLA Simulator 0.9.11
- ROS/ROS2 bridge for CARLA simulator 0.9.11
- ROS Melodic
- Autoware 1.14.0
## CARLAのビルド {/*scenario-executor-carla-build*/}
下記サイトを参照しCARLA 0.9.11のビルドを行ってください。  

https://carla.readthedocs.io/en/0.9.11/build_linux/  

インストール手順の最後にある、以下のコマンドは必須ですので、必ず実行してください。  
```
make PythonAPI ARGS="--python-version=2"
```
## ros-bridgeのインストール {/*scenario-executor-ros-bridge-install*/}
以下のコマンドを実行してください。  
```
cd ~
git clone https://github.com/carla-simulator/ros-bridge.git -b 0.9.11
cd ros-bridge
./install_dependencies.sh
```
## ROS Melodicのインストール {/*scenario-executor-ros-install*/}
下記サイト等を参照しROS Melodicのインストールを行ってください。  

http://wiki.ros.org/melodic/Installation/Ubuntu  

## Autowareのビルド {/*scenario-executor-autoware-build*/}
下記サイトを参照しAutoware 1.14.0のビルドを行ってください。  

https://gitlab.com/autowarefoundation/autoware.ai/autoware/-/wikis/Source-Build  

## ScenarioExecutorのダウンロード {/*scenario-executor-download*/}
以下のコマンドを実行してください。  
```
cd ~
git clone https://github.com/open-garden/garden-scenarioexecutor.git
```
## デモ実行 {/*scenario-executor-run-demo*/}
ScenarioExecutorには簡単にシナリオ実行のデモを行うためのシェルスクリプトやROSのlaunchファイルがあらかじめ含まれています。  
これらのファイルは各アプリケーションが以下のフォルダにインストールされていることを前提にしています。  
|アプリケーション|フォルダ|
|:--|:--|
|CARLA|~/carla|
|ros-bridge|~/ros-bridge|
|Autoware|~/autoware.ai|
|ScenarioExecutor|~/ScenarioExecutor|

### 構成 {/*scenario-executor-configration*/}
アプリケーションの構成は以下のようになります。  

![](/images/tutorial/ScenarioExecutor/1_6.png)

### セットアップ {/*scenario-executor-settings*/}
以下の手順はインストール後、一度だけ実施してください。  
1. Unreal EngineのContent及びSourceフォルダにScenarioExecutorのアセット及びc++のソースコードを配置します。  
   ```
   cd ~/ScenarioExecutor
   ./ue4setup.sh
   ```
   実際は`~/carla/Unreal/CarlaUE4/Content`及び`~/carla/Unreal/CarlaUE4/Source/CarlaUE4`フォルダ内にシンボリックリンクの作成のみ行います。  
   実体は`~/ScenarioExecutor/Unreal`の中にあります。  
   
   `~/carla/Unreal/CarlaUE4/Content`にシンボリックリンク`/Garden`が作成されます。  
   ![](/images/tutorial/ScenarioExecutor/1_1.png)  
   `~/carla/Unreal/CarlaUE4/Source/CarlaUE4`にシンボリックリンク`/Garden`が作成されます。  
   ![](/images/tutorial/ScenarioExecutor/1_2.png)  
1. ros-bridge及び自己位置推定ノードをビルドします。  
   ```
   cd ~/ScenarioExecutor/garden-autoware-agent
   ./make.sh
   ```
   `make.sh`は、`~/ScenarioExecutor/garden-autoware-agent/src`内に`~/ros-bridge`へのシンボリックリンクを作成し、ros-bridgeも含めて一括でビルドします。  
   自己位置推定ノードは`convert_odometry_to_pose`からpublishされる`/gnss_pose`をsubscribeし、Autowareの`/estimate_twist`をpublishするノードです。  
   (自己位置推定ノードは`~/ScenarioExecutor/garden-autoware-agent/src/garden-autoware/nodes/gnss_localizer`にあります。`convert_odometry_to_pose`は`~/autoware.ai/src/autoware/simulation/carla_simulator_bridge/carla_autoware_bridge/src/carla_autoware_bridge`にあります。)  
   このノードにより三次元点群地図とLiDARを使用して自己位置推定を行う`ndt_matching`ノードを使用せずにCARLAのオドメトリセンサーの情報のみで簡易的に自己位置推定を行うことができるようになります。  

### シナリオ実行 {/*scenario-executor-run-scenario*/}
1. CARLAを起動します。  
   ```
   cd ~/carla
   make launch
   ```
   起動したらPlayボタンをクリックします。  
   ![](/images/tutorial/ScenarioExecutor/1_3.png)  

1. Autoware及びros-bridgeを起動します。  
   ```
   cd ~/ScenarioExecutor
   ./run.sh
   ```
   ![](/images/tutorial/ScenarioExecutor/1_4.png)  
   ![](/images/tutorial/ScenarioExecutor/1_5.png)  
