# TrackMate API Documentation

# Endpoint

- Prodaction

```
https://catloris-app-748662833244.asia-southeast2.run.app
```

- Development

```
http://localhost:3000/
```

# Account

## Register

- Path

```http
POST /users/register
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
POST /auth/users
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
PUT /users
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
PUT /auth
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
DELETE /users/delete
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
POST /metrics
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

## Get All Metrics

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

## Get Metrics By User ID

- Path

```http
GET /metrics/:user_id
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
  "id": 1,
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
GET /user_foods
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
      "crabs": float
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
      "crabs": 0
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

## GET User Food By ID

- Path

```http
GET /user_foods/:food_id
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
  }
}
```

- Example Response

```json
{
  "error": false,
  "message": "User food fetched successfully",
  "data": {
    "food_id": 1,
    "user_id": 101,
    "food_name": "Grilled Chicken",
    "calories": 200,
    "protein": 25,
    "fats": 5,
    "crabs": 0
  }
}
```

## POST a New User Food

- Path

```http
POST /user_foods
```

- Request

``` javascript
{
    "user_id": int,
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
  "crabs": 0
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
    "crabs": float
  }
}
```

- Example Response

```json
{
  "error": false,
  "message": "User food added successfully",
  "data": {
    "food_id": 3,
    "user_id": 101,
    "food_name": "Salmon",
    "calories": 208,
    "protein": 20,
    "fats": 13,
    "crabs": 0
  }
}
```

# User Point

## GET ALL users points

- Path

```http
GET /user_points
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
GET /user_points/:user_id
```

- Request

> To display data based on the id

```http
GET /user_points/1
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
  }
]
```

## GET User Total Point By ID

> Retrieves total points based on user_id

- Path

```http
GET /user_points/total/:user_id
```

- Request

```http
GET /user_points/total/1 
```

- Response

```json
{
  "total_points": 150
}
```

## POST User Points Auth

> Adds points for already authenticated users.

- Request

```http
Authorization: Bearer <accessToken>
```

- Body 

```javascript
{
  "points": int,
  "reason": varchar
}
```

- Example Body 

```javascript
{
  "message": "Point added successfully",
  "insertId": 3
}
```

## PUT User Point By ID

> Updates point entries based on user_id.

- Path

```http
PUT /user_points/:user_id
```

- Request

```http
Authorization: Bearer <accessToken>
```

- Body

```javascript
{
  "points": int,
  "reason": varchar
}
```

- Example Body

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

## DELETE User By ID

- Path

```http
DELETE /user_points/:user_id
```

- Request

```http
Authorization: Bearer <jwt_token>
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