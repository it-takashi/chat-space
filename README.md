# DB設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false|
### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_manu :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false, unique: true|
### Association
- has_many :groups_users
- has_many :users, through: :groups_users
- has_many :messages


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user