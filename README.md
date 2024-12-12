# TrackMate API Documentation

# Endpoint

- Prodaction

```
https://c242-ps149-backend-api-748662833244.asia-southeast2.run.app
```

- Development

```
http://localhost:3000/
```

# Account

## Register

- Path

```http
POST /auth/register
```

- Body Request

```javascript
{
  "user_id": int,
  "image": varchar || null,
  "fullname": varchar,
  "email": varchar,
  "password": varchar,
  "contact": varchar,
  "gender": varchar
}
```

- Example Body Request

```json
{
  "user_id": "1",
  "image": "",
  "fullname": "edodi",
  "email": "edodi@gmail.com",
  "password": "edodi321",
  "contact": "081248249070",
  "gender": "pria"
}
```

- Response

```javascript
{
  "error": bool,
  "status": string,
  "message": string,
  "data": {
    "userId": string
  }
}
```

- Example Response

```json
{
  "error": false,
  "status": "success",
  "message": "User berhasil ditambahkan",
  "data": {
    "userId": "1"
  }
}
```

## Login

> Login refers to get `accessToken` and `refreshToken`

- Path

```http
POST /auth/login
```

- Body Request

```javascript
{
  "email": varchar,
  "password": varchar
}
```

- Example Body Request

```json
{
  "email": "bamban@gmail.com",
  "password": "bambang321"
}
```

- Response

```javascript
{
    "error": bool,
    "message": string,
    "data": {
        "accessToken": varchar,
        "refreshToken": varchar
    }
}
```

- Example Response

```json
{
    "error": false,
    "message": "Login berhasil!",
    "data": {
        "accessToken": "........eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        "refreshToken": ".......eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    }
}
```

## User Login Profile

- Path

```http
GET /auth/profile
```

- Headers

> go to Headers then enter the key and value (Authorization as key and Bearer (access_token) as value) <access_token> from previos login

```http
Authorization: Bearer <access_token>
```

- Response

```javascript
{
  "error": bool,
  "status": string,
  "message": string,
  "data": {
    "user_id": int,
    "image": varchar || null,
    "fullname": varchar,
    "email": varchar,
    "contact": varchar,
    "gender": varchar
    }
}
```

- Example Response

```json
{
  "error": false,
  "status": "success",
  "message": "Profil user berhasil diambil 200.",
  "data": {
    "user_id": 1,
    "image": null, //will be null if not yet edited
    "fullname": "ova",
    "email": "ova@gmail.com",
    "contact": "081248290010",
    "gender": "female"
  }
}
```

## Edit Profile

- Path

```http
PUT /auth/update
```

- Headers

```http
Authorization: Bearer <access_token>
```

- Body Request

```javascript
{
  "image": varchar || null,
  "fullname": varchar,
  "email": varchar,
  "contact": varchar,
  "gender": varchar
}
```

- Example Body Request

```json
{
  "image": "http//profile.com",
  "fullname": "eddiynano",
  "email": "eddiynano@gmail.com",
  "contact": "0812482212",
  "gender": "male"
}
```

- Response

```javascript
{
  "error": bool,
  "status": string,
  "message": string
}
```

- Example Response

```json
{
  "error": false,
  "status": "success",
  "message": "Profil berhasil diperbarui"
}
```

## Update Acces Token

> for security access token will be deleted in a short time, so use update refresh token to get it again.

- Path

```http
PUT /auth/refresh
```

- Body Request

```javascript
{
  "refreshToken": varchar
}
```

- Example Body Request

```json
{
  "refreshToken": "......ExiH5PV_GPyyJdG5cI7v9FqmtPip9C0wdpYzqohjhw0"
}
```

- Response

```javascript
{
    "error": bool,
    "status": string,
    "message": string,
    "data": {
        "accessToken": varchar
    }
}
```

- Example Response

```json
{
  "error": false,
  "status": "success",
  "message": "Access Token berhasil diperbarui",
  "data": {
    "accessToken": "....jPdJLMZuN-MUYtc0wBItdxVbY2s9UidYxANqV560O6M"
  }
}
```

## Logout

> Logout refers to delete refreh token

- Path

```http
DELETE /auth/logout
```

- Body Request

```javascript
{
  "refreshToken": varchar
}
```

- Example Body Request

```json
{
  "refreshToken": "....ExiH5PV_GPyyJdG5cI7v9FqmtPip9C0wdpYzqohjhw0"
}
```

- Response

```javascript
{
  "error": bool,
  "status": string,
  "message": string
}
```

- Example Response

```json
{
  "error": false,
  "status": "success",
  "message": "Refresh token berhasil dihapus"
}
```

## Delete account

- Path

```http
DELETE /auth/delete
```

> delete acount not delete refresh token, so please send request to delete refresh token also to logout after delete account

- Headers

```http
Authorization: Bearer <access_token>
```

- Response

```javascript
{
    "error": bool,
    "status": string,
    "message": string,
    "data": {
        "userId": string
    }
}
```

- Example Response

```json
{
    "error": false,
    "status": "success",
    "message": "User berhasil ditambahkan 201.",
    "data": {
        "userId": "1"
    }
}
```

# User Physical Metrics

## Add New Metrics

- Path

```http
POST /metrics/user
```

- Headers

```http
Authorization: Bearer <access_token>
```

- Body Request

```javascript
{
  "age": int,
  "height": float,
  "weight": float,
  "fats": float
}
```

- Example Body Request

``` json
{
  "age": 25,
  "height": 170.5,
  "weight": 65.3,
  "fats": 18.2
}
```

- Response

```javascript
{
  "error": bool,
  "message": string
}
```

- Example Response

```json
{
  "error": false,
  "message": "User berhasil ditambahkan"
}
```

## Get All User Metrics

- Path

```http
GET /metrics/all
```

- Response

```javascript
[
  {
    "id": int,
    "user_id": int,
    "age": int,
    "height": float,
    "weight": float,
    "fats": float
  }
]
```

- Example Response

```json
[
  {
    "id": 1,
    "user_id": 101,
    "age": 25,
    "height": 170.5,
    "weight": 65.3,
    "fats": 18.2
  },
  {
    "id": 2,
    "user_id": 102,
    "age": 30,
    "height": 165.0,
    "weight": 70.0,
    "fats": 20.0
  }
]
```

## Get User Metrics

- Path

```http
GET /metrics/user
```

- Headers

```http
Authorization: Bearer <access_token>
```

- Response

```javascript
{
  "id": int,
  "user_id": int,
  "age": int,
  "height": float,
  "weight": float,
  "fats": float
}
```

- Example Response

```json
{
  "user_id": 101,
  "age": 25,
  "height": 170.5,
  "weight": 65.3,
  "fats": 18.2
}
```

## DELETE User Metrics

- Path

```http
DELETE /metrics/delete
```

- Headers

```http
Authorization: Bearer <access_token>
```

- Response

```javascript
{
  "id": int,
  "user_id": int,
  "age": int,
  "height": float,
  "weight": float,
  "fats": float
}
```

- Example Response

```json
{
  "user_id": 101,
  "age": 25,
  "height": 170.5,
  "weight": 65.3,
  "fats": 18.2
}
```

# Users Foods

## Get All User Foods

- Path

```http
GET /food/user
```

- Response

```javascript
{
  "error": bool,
  "message": string,
  "data": [
    {
      "food_id": int,
      "user_id": int,
      "food_name": string,
      "calories": float,
      "protein": float,
      "fats": float,
      "crabs": float,
      "created_at": datetime
    }
  ]
}
```

- Example Response

```json
{
  "error": false,
  "message": "User foods fetched successfully",
  "data": [
    {
      "food_id": 1,
      "user_id": 101,
      "food_name": "Grilled Chicken",
      "calories": 200,
      "protein": 25,
      "fats": 5,
      "crabs": 21
    },
    {
      "food_id": 2,
      "user_id": 102,
      "food_name": "Apple",
      "calories": 52,
      "protein": 0.3,
      "fats": 0.2,
      "crabs": 14
    }
  ]
}
```

## GET User Food 

- Path

```http
GET /food/user
```

- Headers

```http
Authorization: Bearer <access_token>
```

- Response

```javascript
{
  "error": bool,
  "message": string,
  "data": {
    "food_id": int,
    "user_id": int,
    "food_name": string,
    "calories": float,
    "protein": float,
    "fats": float,
    "crabs": float
    "created_at": datetime
  }
}
```

- Example Response

```json
{
    "error": false,
    "message": "User foods fetched successfully",
    "data": [
        {
            "food_id": 8,
            "user_id": 7,
            "food_name": "Salmon",
            "calories": 208,
            "protein": 20,
            "fats": 13,
            "crabs": 21,
            "created_at": "2024-12-01T00:47:24.000Z"
        }
    ]
}
```

## POST a New User Food

- Path

```http
POST /food/user
```

- Headers

```http
Authorization: Bearer <access_token>
```

- Request

``` javascript
{
    "food_name": string,
    "calories": decimal,
    "protein": decimal,
    "fats": decimal,
    "crabs": decimal
}
```

- Example Request

``` javascript
{
  "user_id": 1,
  "food_name": "Salmon",
  "calories": 208,
  "protein": 20,
  "fats": 13,
  "crabs": 20
}
```

- Response

```javascript
{
  "error": bool,
  "message": string,
  "data": {
    "food_id": int,
    "user_id": int,
    "food_name": string,
    "calories": float,
    "protein": float,
    "fats": float,
    "crabs": float,
    "created_at": datetime
  }
}
```

- Example Response

```json
{
    "error": false,
    "message": "User food added successfully",
    "data": {
        "food_id": 8,
        "user_id": 7,
        "food_name": "Salmon",
        "calories": 208,
        "protein": 20,
        "fats": 13,
        "crabs": 21,
        "created_at": "2024-12-01T00:47:24.000Z"
    }
}
```

## Delete User Food

- Path

```http
DELETE /food/delete
```

- Headers

```http
Authorization: Bearer <accessToken>
```

- Response 

```javascript
{
  "message": string
}
```

- Example Response 

```javascript
{
  "message": "Data berhasil dihapus"
}
```

# User Point

## GET ALL users points

- Path

```http
GET /points/user
```

- Response

```javascript
[
  {
    "id": int,
    "user_id": int,
    "points": int,
    "reason": varchar,
    "created_at": datetime,
    "updated_at": datetime
  }
]
```

- Example Response

```json
[
  {
    "id": 1,
    "user_id": 1,
    "points": 100,
    "reason": "Referral bonus",
    "created_at": "2024-11-29T12:00:00Z",
    "updated_at": "2024-11-29T12:00:00Z"
  },
  {
    "id": 2,
    "user_id": 2,
    "points": 50,
    "reason": "Reward for completing survey",
    "created_at": "2024-11-29T13:00:00Z",
    "updated_at": "2024-11-29T13:00:00Z"
  }
]
```

## GET User Point By ID

- Path 

```http
GET /points/:user_id
```

- Request

> To display data based on the id

- Response

```javascript
[
  {
    "id": int,
    "user_id": int,
    "points": int,
    "reason": varchar,
    "created_at": datetime,
    "updated_at": datetime
  }
]
```

- Example Response

```json
[
  {
    "id": 1,
    "user_id": 1,
    "points": 100,
    "reason": "Referral bonus",
    "created_at": "2024-11-29T12:00:00Z",
    "updated_at": "2024-11-29T12:00:00Z"
  }
]
```

## GET User Total Point By ID

> Retrieves total points based on user_id

- Path

```http
GET /points/total/:user_id
```

- Response

```json
{
  "total_points": 150
}
```

## POST User Points

> Adds points for already authenticated users.

- Path

```http
POST /points/user
```

- Headers

```http
Authorization: Bearer <accessToken>
```

- Request

```javascript
{
  "points": int,
  "reason": varchar
}
```

- Example Request

```javascript
{
  "points": 100,
  "reason": "Well done !!!"
}
```

- Response

```javascript
{
    "message": string,
    "insertId": int
}
```

- Example Response

```json
{
    "message": "Point added successfully",
    "insertId": 7
}
```

## PUT User Point By ID

> Updates point entries based on Authorization.

- Path

```http
PUT /points/user
```

- Headers

```http
Authorization: Bearer <accessToken>
```

- Request

```javascript
{
  "points": int,
  "reason": string
}
```

- Example Request

```json
{
  "points": 120,
  "reason": "Updated reward"
}
```

- Response

```javascript
{
  "message": string
}
```

- Example Response

```json 
{
  "message": "Point updated successfully"
}
```

## DELETE Point

- Path

```http
DELETE /points/delete
```

- Headers

```http
Authorization: Bearer <accessToken>
```

- Response 

```javascript
{
  "message": string
}
```

- Example Response 

```javascript
{
  "message": "Point deleted successfully"
}
```

# Public Article

## Create Article

- Path 

```http
POST /articles/health
```

- Response

```javascript
{
  "title": string,
  "content": string,
  "image_url": varchar
}
```

- Example Response

```json
{
  "title": "Article Title",
  "content": "Article Content",
  "image_url": "http://example.com/image.jpg"
}
```

## Get All Article

- Path

```http
GET /articles/health
```

- Request

```javascript
{
  "error": bool,
  "message": string,
  "data": [
    {
      "article_id": int,
      "title": varchar,
      "content": varchar,
      "published_date": datetime,
      "image_url": varchar
    }
  ]
}
```

- Example Request

```javascript
{
  "error": false,
  "message": "Artikel berhasil diambil.",
  "data": [
    {
      "article_id": 1,
      "title": "Article 1",
      "content": "Content for article 1",
      "published_date": "2024-12-01 12:00:00",
      "image_url": "http://example.com/article1.jpg"
    },
    {
      "article_id": 2,
      "title": "Article 2",
      "content": "Content for article 2",
      "published_date": "2024-12-01 12:00:00",
      "image_url": "http://example.com/article2.jpg"
    }
  ]
}
```


## Get Article By ID

- Path 

```http
GET /articles/:article_id
```

- Response 

```json
{
  "error": false,
  "message": "Artikel berhasil diambil.",
  "data": {
    "article_id": 1,
    "title": "Article 1",
    "content": "Content for article 1",
    "published_date": "2024-12-01 12:00:00",
    "image_url": "http://example.com/article1.jpg"
  }
}
```

## Update Article By ID

- Path 

```http
PUT /articles/:article_id
```

- Request

```json
{
  "title": "Updated Title",
  "content": "Updated Content",
  "published_date": "2024-12-01T12:00:00",
  "image_url": "http://example.com/updated_image.jpg"
}
```

- Response

```json
{
  "error": false,
  "message": "Artikel berhasil diperbarui."
}
```

## Delete Article By ID

- Path 

```http
DELETE /articles/:article_id
```

- Response

```json
{
  "error": false,
  "message": "Artikel berhasil dihapus."
}
```
