'use strict';

const Wreck = require('wreck');

module.exports = [

    {
        method: 'GET',
        path: '/lorem/bacon/{paras?}',
        handler: {
            proxy: {

                mapUri: (request, callback) => {

                    var paras = request.params.paras || 1;
                    console.log('Doing some aditional stuff before redirecting');
                    callback(null, 'https://baconipsum.com/api/?type=all-meat&paras=' + paras + '&start-with-lorem=1');

                },

                //Intercept Response
                onResponse: (err, res, request, reply, settings, ttl) => {

                    //Use Wreck module to parse response payload
                    Wreck.read(res, { json: true }, (err, body) => {

                        console.log('some payload manipulation if you want to.')

                        //Modify Response Body
                        let payload = {};
                        payload.text = body;
                        payload.message = "Adding this message on my response transformation :)";

                        //Modify response headers
                        let headers = res.headers;
                        headers.message = "Add this header on original response to test";

                        reply(payload).code(201).headers = headers;

                    });

                }
            }
        }
    }
];