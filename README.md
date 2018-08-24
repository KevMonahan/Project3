# Project3
Group project with Sean Neppl, Neal Kivi, Luke Siljander, Joe Peck, and Kevin Monahan


# Passport

Passport.js is used to ensure the user is logged in before returning data on all API routes.  The following paths are directly used for user authentication.

## Login
Logs the user into the application and stores all the users info in the cookie which can be accessed in other requests in `req.user`.
* __Path:__ `api/login`
* __Method:__ POST
* __Type:__ JSON
* __Request__: 
```javascript
        {
            "username":"MackySall",
            "password":"Senegal1234"
        }
```
* __Response:__ (reponse is HTTP 401-unauthorized on failure)

```javascript
        {
            "success": true
        }
```

## Registration
Registers a new account, saves it in the database, and logs the user in so `req.user` is set for subsequent requests.
* **Path:** `api/register`
* **Method:** POST
* **Type:** JSON
* **Request:** 
```javascript
        {
            "username":"williamcarloswilliams",
            "password":"redwheelbarrow12",
            "email":"willyTheModern@poetry.biz"
        }
```
* **Response:** Property success equal to `true` when registration is successful. Includes error property on failure with reason for failure.

_Success:_
```javascript
        {
            "success": true
        }
```
_Failure:_
```javascript
        {
            "success": false,
            "error": "Username already taken, pick another"
        }
```

## Logging out
Logs the user out and destroys the current cookie so that `req.user` is no longer set.
* **Path:** `api/logout`
* **Method:** GET
* **Response:**
```javascript
        {
            "success": true
        }
```
