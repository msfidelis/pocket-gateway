'use strict';

const fs = require('fs');
const path = require('path');
const Hapi = require('hapi');
const h2o2 = require('h2o2');
const hapiRouter = require('hapi-router');

const server = new Hapi.Server();

const routesFolder = 'proxy/';

server.connection({ port: process.env.NODE_PORT || 8080 });

server.register({
    register: h2o2
}, (err) => {
    if (err) {
        throw err;
    }
});

/**
 * Register Hapi Routes
 */
server.register({
    register: hapiRouter,
    options: {
        routes: 'transformations/**/*.js'
    }
}, (err) => {
    if (err) throw err;
});

/**
 * Proxy Router
 */
fs.readdir(routesFolder, (err, files) => {

    if (err) {
        throw err;
    }

    files.forEach((file) => {

        let filename = path.join(__dirname, routesFolder, file);

        console.log("LOADED FILE: " + filename);

        //Route Proxy Endpoints from JSON Files into HAPI Server
        fs.readFile(filename, 'utf8', (err, data) => {

            if (err) {
                console.log(err);
            }

            let routeData = JSON.parse(data);
            routeData.forEach((route) => {
                //To Do - More Validations
                server.route(route);
            });

        });

    });
});

server.start((err) => {
    if (err) {
        throw err;
    } else {
        console.log("Pocket Gateway!");
    }
});

module.exports = server;