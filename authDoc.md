Base URL : https://balancerealestate.runasp.net/api

# API Documentation for Balance Real Estate

## Base URL
https://balancerealestate.runasp.net/api

## Endpoints

### 1. User Registration
**Endpoint:** `/auth/signup`
**Method:** `POST`
**Description:** Registers a new user in the system.
**Request Body:**
```json
{
    "userName": "string",
    "email": "string@asd.com",
    "password": "string#A12",
    "confirmPassword": "string#A12",
    "firstName": "string",
    "lastName": "string",
    "phoneNumber": "+20115494065",
    
}
```
**Response:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImYwNzU0OWRkLTFmOTQtNDMxMi1iZTU1LWVjODA5Mjk0MDAzNyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdHJpbmdAYXNkLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN0cmluZ0Bhc2QuY29tIiwiRmlyc3ROYW1lIjoic3RyaW5nIiwiTGFzdE5hbWUiOiJzdHJpbmciLCJJc0FjdGl2ZSI6IlRydWUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiZXhwIjoxNzUzNzkxMjQzLCJpc3MiOiJCYWxhbmNlSXNzdWVyUHJvZCIsImF1ZCI6IkJhbGFuY2VBdWRpZW5jZVByb2QifQ.s-E8PmQgIWv1PDAM_03_iomvjHjDecVZ7_H-3tzzWvU",
    "expiresAt": "2025-07-29T12:14:03.3744873Z",
    "user": {
        "id": "f07549dd-1f94-4312-be55-ec8092940037",
        "userName": "string@asd.com",
        "email": "string@asd.com",
        "phoneNumber": "+20115494065",
        "firstName": "string",
        "lastName": "string",
        "bio": null,
        "whatsAppNumber": null,
     
        "location": null,
        "profilePictureUrl": null,
        "isActive": true,
        "lastLoginAt": null,
        "roleNames": [
            "User"
        ]
    }
}

```
### 2. User Login
**Endpoint:** `/auth/signin`  
**Method:** `POST`   
**Description:** Authenticates a user and returns a JWT token.
**Request Body:**
```json
{
    "email": "string",
    "password": "string"
}
```
**Response Body:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjY4YzAxYmQzLTExZDUtNDI4Yy04MGQ5LThlNDI1MWYzZjNkNCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhc2QxMjNAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiYXNkMTIzQGdtYWlsLmNvbSIsIkZpcnN0TmFtZSI6Ik1vaGFtZWQiLCJMYXN0TmFtZSI6IlNhbWVoIiwiSXNBY3RpdmUiOiJUcnVlIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MTc1Mzc4OTM1NywiaXNzIjoiQmFsYW5jZUlzc3VlclByb2QiLCJhdWQiOiJCYWxhbmNlQXVkaWVuY2VQcm9kIn0.kjf47qONugrtY0ySY9g8U55Y3MHSXO_CwG4r2_OywGo",
    "expiresAt": "2025-07-29T11:42:37.3156941Z",
    "user": {
        "id": "68c01bd3-11d5-428c-80d9-8e4251f3f3d4",
        "userName": "asd123@gmail.com",
        "email": "asd123@gmail.com",
        "phoneNumber": "+201096761048",
        "firstName": "Mohamed",
        "lastName": "Sameh",
        "bio": null,
        "whatsAppNumber": null,
       
        "location": null,
        "profilePictureUrl": null,
        "isActive": true,
        "lastLoginAt": "2025-07-29T10:42:37.1245647Z",
        "roleNames": [
            "User"
        ]
    }
}
```

### 3. Get User Profile
**Endpoint:** `/auth/profile`
**Method:** `GET` 
**Authorization:** Bearer token required
**Description:** Retrieves the profile information of the authenticated user.
**Response:**
```json
{
        "id": "68c01bd3-11d5-428c-80d9-8e4251f3f3d4",
        "userName": "asd123@gmail.com",
        "email": "asd123@gmail.com",
        "phoneNumber": "+201096761048",
        "firstName": "Mohamed",
        "lastName": "Sameh",
        "bio": null,
        "whatsAppNumber": null,
      
        "location": null,
        "profilePictureUrl": null,
        "isActive": true,
        "lastLoginAt": "2025-07-29T10:58:13.8353597",
        "roleNames": [
                "User"
        ]
}
```

### 4. Update User Profile
**Endpoint:** `/auth/profile`
**Method:** `PUT`
**Description:** Updates the profile information of the authenticated user.
**Request Body:** (multipart/form-data)
| Field | Type | Description |
|-------|------|-------------|
| PhoneNumber | string | User's phone number |
| FirstName | string | User's first name |
| LastName | string | User's last name |
| Bio | string | User's biography |
| WhatsAppNumber | string | User's WhatsApp contact number |

| File | file | Profile picture (binary file) |
| PictureAvatar | string | Profile picture avatar identifier |
| Location | string | User's location |

**Response:**
```json
{
    "id": "68c01bd3-11d5-428c-80d9-8e4251f3f3d4",
    "userName": "asd123@gmail.com",
    "email": "asd123@gmail.com",
    "phoneNumber": "+201096761048",
    "firstName": "Mohamed",
    "lastName": "Sameh",
    "bio": null,
    "whatsAppNumber": null,
    
    "location": null,
    "profilePictureUrl": null,
    "isActive": true,
    "lastLoginAt": "2025-07-29T10:58:13.8353597",
    "roleNames": [
        "User"
    ]
}

```

### 5. Change User Password
**Endpoint:** `/auth/change-password`
**Authorization:** Bearer token required
**Method:** `POST`
**Description:** Changes the password of the authenticated user.
**Request Body:**
```json
{
  "email": "string",
  "currentPassword": "string",
  "newPassword": "string",
  "confirmNewPassword": "string"
}
```
**Response:**
```json
{
    "message": "Password changed successfully."
}

``` 

### 6. Forget User Password
**Endpoint:** `/auth/forgot-password`
**Method:** `POST`
**Description:** Initiates the password reset process for a user.
**Request Body:**
```json
{
    "email": "asd123@gmail.com"
}   

**Response:**
```json
{
    "message": "Password reset link sent to your email."
}
```

### 7. Reset User Password
**Endpoint:** `/auth/reset-password`
**Method:** `POST`
**Description:** Resets the user's password using a token received via email.
**take the token from url query string https://balance-jade.vercel.app/reset-password?token=string&email=string**

hint : The token is typically sent to the user's email after they request a password reset.
- %40 is the URL encoded representation of the '@' character.
**Request Body:**
```json
{
  "email": "string",
  "token": "string",
  "newPassword": "string"
}
```
**Response:**
```json
{
    "message": "Password reset successfully."
}
```
### 8. Logout User
**Endpoint:** `/auth/logout`
**Method:** `POST`
**Authorization:** Bearer token required
**Description:** Logs out the authenticated user by invalidating the JWT token.
**Response:**
```json
{
    "message": "Logged out successfully."
}
```

### 9. login with Google
**Endpoint:** `/auth/google-login
**Method:** `POST`
**Description:** Authenticates a user using Google OAuth and returns a JWT token.
**Request Body:**
```json
{
    "idToken": "string"
}
```
**Response:**
```json
{
    "token": "string"
}
```

