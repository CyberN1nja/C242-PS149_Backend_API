# TrackMate API Documentation

# Account

# Endpoint

- Prodaction

```

```

- Development

```
http://localhost:3000/
```

# Register

- Path

```http
POST /user
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

# Login
> Login refers to get `token` 

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
  "status": string,
  "message": string,
  "data": {
    // Token JWT yang dihasilkan, berisi informasi seperti userId, email, dan masa berlaku token (expiresIn selama 1 jam)

    "token": string  
  }
}
```

- Example Response

```json
{
  "error": false,
  "status": "success",
  "message": "Login berhasil",
  "data": {
    "token": ".....TVhBiKh28FV1DgolHT-oFZxZ0aHZ435pKhb-Sv_NFZI"
  }
}
```
# User Login Profile 

- Path 

```http
POST /auth/profile
```

- Headers

```http
Authorization: Bearer <access_token>
Content-Type: application/json
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
    "image": null,  //will be null if not yet edited 
    "fullname": "ova",
    "email": "ova@gmail.com",
    "contact": "081248290010",
    "gender": "female"
    }
}
```
