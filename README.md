# Pocket API Gateway

[![Build Status](https://travis-ci.org/msfidelis/pocket-gateway.svg?branch=master)](http://travis-ci.org/msfidelis/boreal)
[![Code Climate](https://codeclimate.com/github/msfidelis/pocket-gateway/badges/gpa.svg)](https://codeclimate.com/github/msfidelis/pocket-gateway)

My Pocket API Gateway. It's only a POC for studies purposes.

Pocket Gateway was builded using [Hapi JS](https://hapijs.com/) as Server and [H2o2](https://github.com/hapijs/h2o2) plugin as Proxy handler. 

It's a simples structure to add and remove routes dynamically on Deploy

![Pocket!!](https://i2.wp.com/trickybabaji.com/wp-content/uploads/2017/03/unnamed.png?resize=300%2C300)

# Setup

Development Environment 

```
 $ npm install
 $ npm run dev
```

# Create a API route in Proxy Gateway 

Add a JSON file in `proxy` folder like a Hapi Route.

> services/books.config.json

```json
{
    "path" : "/books",
    "method" : ["GET"],
    "handler": {
        "proxy" : {
            "uri" : "http://route-ro-my-books-microservice.com/books",
            "passThrough": true
        }
    }
}
```


# Create a API Route with Request and Response transformations

You can use h202 core to modify the request and responses on API routes. 

* Create a `example.js` file on `transformations/` folder

* You can use Wrack plugin to modify payload request body

```javascript
'use strict'

const Wreck = require('wreck')

module.exports = [

    {
        method: 'GET',
        path: '/lorem/bacon',
        handler: {
            proxy: {

                mapUri: (request, callback) => {

                    callback(null, 'https://baconipsum.com/api/?type=all-meat&paras=1&start-with-lorem=1')

                },

                onResponse: (err, res, request, reply, settings, ttl) => {

                    //Use Wreck to parse and modify response body and headers
                    Wreck.read(res, { json: true },  (err, body) => {

                        let payload = {}

                        //Modify Response JSON structure and add itens
                        payload.text = body
                        payload.message = "Adding this message on my response transformation :)"

                        //Add header to response
                        let headers = res.headers
                        headers.message = "Add this header on original response to test"

                        reply(payload).code(201).headers = headers

                    })

                }
            }
        }
    }
]
```
