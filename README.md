# TrackMate API Documentation

# ENDPOINT

- Prodaction

```

```

- Development

```
http://localhost:3000/
```

# REGISTER

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

# LOGIN

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
