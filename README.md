# strapi-reset-password
- Custom code required to reset a users password in Strapi v4.2.0
- No email provider required
- Returns JWT and sanitized user data

### Important
- place this repo's root folder in your Strapi src/api folder
- the final destination will look like: src/api/password

### POST request

- url: http://localhost:1337/api/password

- body: 
```
  {
    "identifier": username, // user's username
    "currentPassword": currentPassword, // user's current password
    "newPassword": newPassword, // user's new password
    "confirmNewPassword": confirmNewPassword // must match the new password
  }
 ```
