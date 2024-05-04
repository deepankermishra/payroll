# How to run?

Use the below the command to spin up the services and the tester script.
```

docker-compose up --build

```



# How to login?
We have a login API that can be used to obtain jwt token for all subsequent calls.
Use this jwt token to authorise requests going forward.

*NOTE*: we have added admin with password at server setup time. You can use the below curl call to obtain the token.
```
curl --location 'localhost:3000/api/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "admin",
    "password": "password"
}'
```


# To access all the APIs using Postman:

Import `payroll_app.postman_collection.json` to your Postman and start playing with the APIs.
