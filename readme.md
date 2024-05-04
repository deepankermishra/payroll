
# How to login?
We have a login API that can be used to obtain jwt token for all subsequent calls.
Use this jwt token to authorise requests going forward.
```
curl --location 'localhost:3000/api/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "admin",
    "password": "password"
}'
```