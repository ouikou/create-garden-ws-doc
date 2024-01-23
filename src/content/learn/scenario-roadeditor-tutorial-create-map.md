---
title: "Create Map"
---

## Mapの保存と読込 {/*scenario-roadeditor-tutorial-map-save*/}

ScenarioRoadEditorを表示して、メニューからFile > Saveでローカル環境にjson形式で保存ができます。

![](/images/tutorial/RoadEditor/1_1.png)


保存したMapファイルをScenarioRoadEditorで開く場合は、メニューからFile > Openでローカル環境のjson形式のファイルを開くことができます。

![](/images/tutorial/RoadEditor/1_2.png)


## Mapの作成手順 {/*scenario-roadeditor-tutorial-map-create*/}

<Intro>
    Mapの作成手順の詳細は以下の動画を参照してください。※交差点の作成方法については以下に補足があります。
</Intro>

<YouTubeIframe src="https://www.youtube.com/embed/jKtX0zhyK-8" title="YouTube video player" />


## 道路の方向について {/*scenario-roadeditor-tutorial-map-create-road-forward*/}

道路には方向があり、道路を選択した際に、道路の移動や回転を編集できるハンドルが表示される側が、道路の開始側となります。交差点を作成する際には、接続する道路の方向を調べて道路の開始側（predecessor）か終了側（successor）のどちらを接続するかを指定します。

![](/images/tutorial/RoadEditor/1_3.png)


## 交差点作成時の道路の接続順について {/*scenario-roadeditor-tutorial-map-create-junction*/}

交差点に接続する道路は以下のように時計回りに接続する必要があります。

![](/images/tutorial/RoadEditor/1_4.png)
