Base URL : https://balancerealestate.runasp.net/api

# API Documentation for Balance Real Estate

## Base URL
https://balancerealestate.runasp.net/api

## Endpoints

### favorites
#### GET /User/Properties - Projects /Favorites
- **Description**: Retrieves a lists of favorite properties and projects for the authenticated user.
- **Response**: Returns a lists of favorite properties and projects.
- **API URL**: `/favorites/user-units-projects/{userId}`
- **Method**: GET
- **Parameters**:
  - `userId` (required): The ID of the user whose favorites are being retrieved.
- **Headers**:
  - `Authorization` (required): Bearer token for authentication.
- **Example Request**:
  ```https
  GET /favorites/user-units-projects/{userId} HTTPS/1.1
  Host: balancerealestate.runasp.net
  Authorization: Bearer {token}
  ```
- **Example Response**:
  ```json
  {
  "itemsProjects": [],
  "itemsUnits": [],
  "totalCountProjects": 0,
  "totalCountUnits": 0
    }  ```   
- **Response Codes**:
  - `200 OK`: Successfully retrieved favorites.
    - `401 Unauthorized`: Authentication failed or user not authenticated.
    - `404 Not Found`: User not found or no favorites available.
- **Notes**: Ensure the user is authenticated before making this request. The `userId` should match the authenticated user's ID.

### favorites
#### GET /User/Projects /Favorites
- **Description**: Retrieves a list of favorite projects for the authenticated user.
- **Response**: Returns a list of favorite projects.
- **API URL**: `/favorites/project/{userId}`
- **Method**: GET
- **Parameters**:
  - `userId` (required): The ID of the user whose favorites are being retrieved.
- **Headers**:
  - `Authorization` (required): Bearer token for authentication.
- **Example Request**:
  ```https
  GET /favorites/project/{userId} HTTPS/1.1
  Host: balancerealestate.runasp.net
  Authorization: Bearer {token}
  ```
- **Example Response**:
  ```json
    {
  "items": [],
  "totalCount": 0
    }  ```   
- **Response Codes**:
  - `200 OK`: Successfully retrieved favorites.
    - `401 Unauthorized`: Authentication failed or user not authenticated.
    - `404 Not Found`: User not found or no favorites available.
- **Notes**: Ensure the user is authenticated before making this request. The `userId` should match the authenticated user's ID.

### favorites
#### GET /User/Properties /Favorites
- **Description**: Retrieves a list of favorite properties for the authenticated user.
- **Response**: Returns a list of favorite properties.
- **API URL**: `/favorites/unit/{userId}`
- **Method**: GET
- **Parameters**:
  - `userId` (required): The ID of the user whose favorites are being retrieved.
- **Headers**:
  - `Authorization` (required): Bearer token for authentication.
- **Example Request**:
  ```https
  GET /favorites/project/{userId} HTTPS/1.1
  Host: balancerealestate.runasp.net
  Authorization: Bearer {token}
  ```
- **Example Response**:
  ```json
    {
  "items": [],
  "totalCount": 0
    }  ```   
- **Response Codes**:
  - `200 OK`: Successfully retrieved favorites.
    - `401 Unauthorized`: Authentication failed or user not authenticated.
    - `404 Not Found`: User not found or no favorites available.
- **Notes**: Ensure the user is authenticated before making this request. The `userId` should match the authenticated user's ID.



### favorites
#### POST /User/Properties /Favorites
- **Description**: Adds a property to the authenticated user's favorites.
- **Response**: Returns the updated list of favorite properties.
- **API URL**: `/favorites/unit`
- **Method**: POST
- **Parameters**:
  - `userId` (required): The ID of the user whose favorites are being updated.
- **Headers**:
  - `Authorization` (required): Bearer token for authentication.
- **Example Request**:
  ```https
  POST /favorites/unit HTTPS/1.1
  Host: balancerealestate.runasp.net
  Authorization: Bearer {token}
  ```
- **ٌRequest Body**:
  ```json
{
  "userId": "string",
  "unitId": 0,
  "isAvailable": true
}  ```   
- **Response Codes**:
  - `200 OK`: Successfully retrieved favorites.
    - `401 Unauthorized`: Authentication failed or user not authenticated.
    - `404 Not Found`: User not found or no favorites available.
- **Notes**: Ensure the user is authenticated before making this request. The `userId` should match the authenticated user's ID.

### favorites
#### PUT /User/Properties/Favorites (soft remove)
- **Description**: Soft removes a property from the authenticated user's favorites.
- **Response**: Returns the updated list of favorite properties.
- **API URL**: `/favorites/unit/{unitId}`
- **Method**: PUT
- **Parameters**:
  - `unitId` (required): The ID of the unit whose favorites are being updated.
- **Headers**:
  - `Authorization` (required): Bearer token for authentication.
- **Example Request**:
  ```https
  PUT /favorites/unit?unitId={unitId} HTTPS/1.1
  Host: balancerealestate.runasp.net
  Authorization: Bearer {token}
  ```
- **Example Response**:
  ```json
    {
  "items": [],
  "totalCount": 0
    }  ```   
- **Response Codes**:
  - `200 OK`: Successfully retrieved favorites.
    - `401 Unauthorized`: Authentication failed or user not authenticated.
    - `404 Not Found`: User not found or no favorites available.
- **Notes**: Ensure the user is authenticated before making this request. The `userId` should match the authenticated user's ID.

### favorites
#### PUT /User/Projects/Favorites
- **Description**: Soft removes a project from the authenticated user's favorites.
- **Response**: Returns the updated list of favorite projects.
- **API URL**: `/favorites/project/{projectId}`
- **Method**: PUT
- **Parameters**:
  - `projectId` (required): The ID of the project whose favorites are being updated.
- **Headers**:
  - `Authorization` (required): Bearer token for authentication.
- **Example Request**:
  ```https
    PUT /favorites/project?projectId={projectId} HTTPS/1.1
    Host: balancerealestate.runasp.net
    Authorization: Bearer {token}
  ```
- **Example Response**:
  ```json
    {
  "items": [],
  "totalCount": 0
    }  ```   
- **Response Codes**:
  - `200 OK`: Successfully retrieved favorites.
    - `401 Unauthorized`: Authentication failed or user not authenticated.
    - `404 Not Found`: User not found or no favorites available.
- **Notes**: Ensure the user is authenticated before making this request. The `userId` should match the authenticated user's ID.
