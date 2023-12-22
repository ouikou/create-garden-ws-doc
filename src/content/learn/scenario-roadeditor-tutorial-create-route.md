---
title: "Create Routes"
---

シナリオ作成やシミュレーション実行に必要なルート情報を作成する手順について追加例を用いて記します。

## 地図の読込 {/*scenario-roadeditor-tutorial-create-route-open-map*/}

ここではExemples > 道路（合流）で地図を表示します。

![](/images/tutorial/RoadEditor/2_1.png)
![](/images/tutorial/RoadEditor/2_2.png)


## 道路構造と作成ルート {/*scenario-roadeditor-tutorial-create-route-create*/}

道路のIDとレーンのIDは以下のようになっています。

![](/images/tutorial/RoadEditor/2_3.png)

ここでは以下のように2つのルートを作成することを考えます。

![](/images/tutorial/RoadEditor/2_4.png)


## Route1の作成 {/*scenario-roadeditor-tutorial-create-route-create-route01*/}

メニューからAdd > Routeを選択して新しいRoute要素を追加します。右側の編集タブではROUTEが選択され、新規に追加されたRoute要素が選択状態となります。削除するにはRoute要素を選択し、Deleteキーを押して削除してください。

![](/images/tutorial/RoadEditor/2_5.png)
![](/images/tutorial/RoadEditor/2_6.png)

追加した要素を選択して、IDをRoute1に変更します。

![](/images/tutorial/RoadEditor/2_7.png)

Route要素を選択し、Route項目のEditをクリックしてください。ルートの編集エディタが表示されます。エディタを閉じる場合は右上のXをクリックします。

![](/images/tutorial/RoadEditor/2_8.png)
![](/images/tutorial/RoadEditor/2_9.png)

ルートを以下のように記述します。entitiesの配列の要素にルートが通過するレーンの情報をentitiesの配列要素として記述します。ルートの開始はtypeをstartとします。ルートの終了はtypeをgoalとします。

```json
[
  {
    "entities":[
      {
        "type":"start",
        "lane":{
          "road":"R100",
          "lane":"L-03"
        },
        "lanechange_start":-1,
        "lanechange_end":-1,
        "velocity":100
      },
      {
        "type":"goal",
        "lane":{
          "road":"R200",
          "lane":"L-03"
        },
        "lanechange_start":-1,
        "lanechange_end":-1,
        "velocity":100
      }
    ]
  }
]
```

![](/images/tutorial/RoadEditor/2_10.png)

ルート編集エディタを閉じるとルートが描画されます。

![](/images/tutorial/RoadEditor/2_11.png)


## Route2の作成 {/*scenario-roadeditor-tutorial-create-route-create-route02*/}

Route1と同様にメニューからAdd > Routeを選択して新しいRoute要素を追加します。IDをRoute1に変更してEditをクリックし、ルートの編集エディタを表示します。以下のようにルートを記述します。ルートの開始と終了の要素の間に道路がある場合は、typeをmidとします。

![](/images/tutorial/RoadEditor/2_12.png)

```json
[
  {
    "entities":[
      {
        "type":"start",
        "lane":{
          "road":"R300",
          "lane":"L-01"
        },
        "lanechange_start":-1,
        "lanechange_end":-1,
        "velocity":50
      },
      {
        "type":"mid",
        "lane":{
          "road":"R200",
          "lane":"L-04"
        },
        "lanechange_start":1,
        "lanechange_end":-1,
        "velocity":50
      },
      {
        "type":"mid",
        "lane":{
          "road":"R200",
          "lane":"L-03"
        },
        "lanechange_start":-1,
        "lanechange_end":50,
        "velocity":70
      },
      {
        "type":"goal",
        "lane":{
          "road":"R200",
          "lane":"L-03"
        },
        "lanechange_start":-1,
        "lanechange_end":-1,
        "velocity":100
      }
    ]
  }
]
```

![](/images/tutorial/RoadEditor/2_13.png)

途中でレーンを変更する場合はlanechange_startとlanechange_endで指定します。指定の方法は以下の図を参照してください。

![](/images/tutorial/RoadEditor/2_14.png)

