# strapi-reset-password
- Custom code required to reset a users password in Strapi v4.2.0
- No email provider required
- Returns JWT and sanitized user data

### POST request

- url: http://localhost:1337/api/password

- body: 
```
  {
    "identifier": "username",
    "currentPassword": "password",
    "newPassword": "newPassword",
    "confirmNewPassword": "confirmNewPassword"
  }
 ```
