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

```
POST /user
```

- Body Request

```
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

```
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

```
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

```
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

- Path

```
POST /auth/users
```

- Body Request 

```
{
  "email": varchar,
  "password": varchar
}
```

- Example Body Request

```
{
  "email": "bamban@gmail.com",
  "password": "bambang321"
}
```

- Response

```
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

```
{
  "error": false,
  "status": "success",
  "message": "Login berhasil",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksImVtYWlsIjoiYmFtYmFuQGdtYWlsLmNvbSIsImlhdCI6MTczMjMzNzM2MSwiZXhwIjoxNzMyMzQwOTYxfQ.TVhBiKh28FV1DgolHT-oFZxZ0aHZ435pKhb-Sv_NFZI"
  }
}
```
# User Login Profile 

- Path 

```
POST /auth/profile
```

- Headers

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

- Response

```
{
    "error": bool,
    "status": string,
    "message": string,
    "data": {
        "user_id": int,
        "image": varchar,
        "fullname": varchar,
        "email": varchar,
        "contact": varchar,
        "gender": varchar
    }
}
```

- Example Response

```
{
    "error": false,
    "status": "success",
    "message": "Profil user berhasil diambil 200.",
    "data": {
        "user_id": 1,
        "image": "",
        "fullname": "ova",
        "email": "ova@gmail.com",
        "contact": "081248290010",
        "gender": "female"
    }
}
```