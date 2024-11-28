# TrackMate API Documentation

# Endpoint

- Prodaction

```

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

> go to Headers then enter the key and value (Authorization as key and Bearer (access_token) as value)

```http
Authorization: Bearer <access_token>
```

```json
{
  "refreshToken": "........eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
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
        "userId": "2"
    }
}
```

# Health Metrics

<!-- mengerjakan push dan get data user dari database -->
