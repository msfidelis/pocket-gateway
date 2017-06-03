# pocket-gateway
My Pocket API Gateway. It's only a POC for studies purposes.

![Pocket!!](https://i2.wp.com/trickybabaji.com/wp-content/uploads/2017/03/unnamed.png?resize=300%2C300)

#Setup 

```
 $ npm install -g nodemon
 $ npm install 
```

# Create a API route in gateway 

Add a JSON file in services folder like a Hapi Route.

> services/books.config.json

```json
{
    "path" : "/",
    "method" : ["GET"],
    "handler": {
        "proxy" : {
            "uri" : "http://labs.superlogica.com",
            "passThrough": true
        }
    }
}
```

## Run 

```
  $ nodemon index.js
```

