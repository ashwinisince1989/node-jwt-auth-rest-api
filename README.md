# node-jwt-auth-rest-api

This sample code design for creating REST web service in node with auth gurde and jwt implementation.
# Used 

- Node
- Express
- Jsonwebtoken(JWT)
- Mongodb(mLab)


# Installation

- Clone the repo by using git clone.
- Run npm install on the cloned directory.
- cahange your mLab credentials with your's in this line 

```sh 
mongoose.connect('mongodb://ash:espo2050@ds141815.mlab.com:41815/quize_app')
```

- Install nodemon by command 

```sh 
>>npm install nodemon 
```

- Start server using command 

```sh 
>>nodemon start 
```

# mLab User Schema
```sh
 let UserSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true
      },
     email: {
      type: String,
      required: true,
      unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
     },
     password: {
      type: String,
      required: true
     },
     phone: {
        type: String,
        required: true
     },
     createdOn: {
       type: Date,
       default: Date.now
     },
});
```

# API Endpoints
### Signup

- POST http://localhost:3000/user/signup
- In header send Content-Type: application/json
- In body raw data send 
 ```sh
 {
   "email":"ashwini1211@gmail.com",
   "password":"123456",
   "phone":"5555555555",
   "name": "ashwini"
}
 ```
  
- Response:
 ```sh
 {
    "message": "Registraion sucessfull.",
    "error_code": "200",
    "status": true,
    "result": {
        "_id": "5c792b1542fd423120262b52",
        "email": "ashwini111@gmail.com",
        "name": "ashwini",
        "phone": "5555555555",
        "createdOn": "2019-03-01T12:52:37.429Z",
        "password": "$2b$10$zKLkjloAKbhlsHdZ2KUX6ObQfvUGdjMOHqpW/WCojILU0biOio5Wy",
        "__v": 0
    }
}
 ```

### Login
 - POST http://localhost:3000/user/login
 - In header send Content-Type: application/json
 - In body raw data send 
  
  ```sh
  {
  "email":"ashwini1211@gmail.com",
  "password":"123456"
  }
  ```
- Response:

### Above response token will use to get user information and delete operations
   ```sh
  {
    "message": "Auth successful",
    "error_code": "200",
    "status": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzaHdpbmkxMjExQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVjNmZlMTUzYjM2NDQzMzFiMDIyOWQyMiIsImlhdCI6MTU1MTQ0NDU2NiwiZXhwIjoxNTUxNTMwOTY2fQ.8N5PBBIWf4D9etFB3RrvHmKCmToyniLBxLEJPVPcwDY"
  }
```

### Get All user
 - GET http://localhost:3000/user/
 - In header send Content-Type: application/json and Authorization: your token got in login api 
 
 - Response:
   ```sh
    [{
        "_id": "5c6c05b8986cf11984b152ec",
        "name": "harsh",
        "email": "harsh@gmail.com",
        "phone": "98989809809",
        "password": "123456",
        "createdOn": "2018-12-31T18:30:00.000Z",
        "__v": 0
    },
    {
        "_id": "5c6e5b192ccd283348c65c4f",
        "name": "SUMIT",
        "email": "sumit@gmail.com",
        "phone": "99999999",
        "password": "123456",
        "createdOn": "2018-12-31T18:30:00.000Z",
        "__v": 0
    }]
    ```
    
### Delete user
 - DELETE http://localhost:3000/user/
 - In header send Content-Type: application/json and Authorization: your token got in login api 
 - In body raw data send 
  
  ```sh
  {"email":"ashwini1211@gmail.com"}
  ```
  
 - Response:
   ```sh
   {"message":"User Deleted successsully!"}
   ```
  
