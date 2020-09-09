# 概要
![chat-like-app-toppage](https://user-images.githubusercontent.com/50513757/89727048-4873d180-d9d6-11ea-94af-539b65fd5f3c.png)
複数人でチャットを行えるWebアプリケーションです。

誰かが「トークルーム」を作成し、そこに参加できるユーザーを指定することで、
トークルームの作成者と指定されたユーザー間でチャットができるようになります。

# 使用方法
1. 「Sign Up」リンクから新規登録画面に移動し、アカウントを作成します。
![chat-like-app-signuppage](https://user-images.githubusercontent.com/50513757/89727116-d8b21680-d9d6-11ea-988d-7b44941fe97d.png)
1. 「Talk Rooms」リンクからトークルーム一覧画面に移動します。
![chat-like-app-talkroompage](https://user-images.githubusercontent.com/50513757/89730234-e2954300-d9f1-11ea-9a55-bf2ced474b43.png)
1. 「管理ルーム」ボタンをクリックし、表示を管理ルーム一覧に変更します。
![chat-like-app-talkroompage](https://user-images.githubusercontent.com/50513757/89730234-e2954300-d9f1-11ea-9a55-bf2ced474b43.png)
1. 「トークルーム追加」アイコンをクリックします。
![chat-like-app-talkroomadd](https://user-images.githubusercontent.com/50513757/89730262-21c39400-d9f2-11ea-8d65-56aa7d211381.png)
1. トークルーム作成フォームが表示されるので、必要情報を入力してトークルームを作成します。
![chat-like-app-talkroomcreateform](https://user-images.githubusercontent.com/50513757/89730344-9f879f80-d9f2-11ea-8438-ecbb814854d9.png)
1. 作成されたトークルームの「ユーザー追加」アイコンをクリックします。
![chat-like-app-useraddicon](https://user-images.githubusercontent.com/50513757/89730493-df9b5200-d9f3-11ea-87ee-c9277e521f32.png)
1. トークルームに追加したいユーザーの「ユーザーID」と「ユーザー名」を入力し、「さがす」ボタンをクリックします。
![search](https://user-images.githubusercontent.com/50513757/89731633-5ee15380-d9fd-11ea-94d0-255b4652f11f.png)
1. ユーザーが存在すれば確認画面が現れます。「誘う」ボタンをクリックし、ユーザーをトークルームのメンバーに追加します。
![invite](https://user-images.githubusercontent.com/50513757/89731629-5c7ef980-d9fd-11ea-83d7-f879aad862c9.png)
1. 誘われたユーザーの「参加ルーム」にトークルームが追加されます。
![member_room](https://user-images.githubusercontent.com/50513757/89732387-728fb880-da03-11ea-8c88-d61af2d39aec.png)
1. あとはトークルームに「入室」してチャットをするだけです。
![chat_room](https://user-images.githubusercontent.com/50513757/89732382-6ad01400-da03-11ea-9002-78fc9bf38fe9.png)

# 主な機能
- トークルームの表示・作成・更新・削除機能 
- ユーザーの表示・作成・更新機能
- ログイン機能
- トークルームメンバーの表示・追加・削除機能
- 画像メッセージ投稿機能
- 画像ファイルアップロード機能
- 音声ファイルアップロード機能
- トークルームのBGM再生機能
- トークルーム参加者リアルタイム表示機能
- トークルーム参加者の現在位置の地図表示機能
- トークルームへ招待された際の通知機能
- トークルームメンバーから外された際の通知機能

# 使用技術
## フロントエンド
HTML5, CSS3, Javascript(React, Redux), Bootstrap
## サーバーサイド
Ruby(Ruby on Rails), Javascript(Express)
## DB
PostgreSQL
## その他
Docker, Git, GitHub, GCP, Heroku
