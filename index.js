
const fs = require('fs')
const Hapi = require('hapi')
const server = new Hapi.Server()

const routesFolder = 'proxy/'

server.connection({ port: process.env.NODE_PORT || 8080 })

server.register({
    register: require('h2o2')
}, (err) => {
    if (err) {
        throw err
    }
})

server.register({
  register: require('hapi-router'),
  options: {
    routes: 'transformations/**/*.js' 
  }
}, function (err) {
  if (err) throw err;
})

/**
 * Proxy Router
 */
fs.readdir(routesFolder, (err, files) => {

    files.forEach((file) => {

        let filename = __dirname + "/" + routesFolder + file
        console.log("LOADED FILE: " + filename)

        //Route Proxy Endpoints from JSON Files into HAPI Server
        fs.readFile(filename, 'utf8', (err, data) => {

            let routeData = JSON.parse(data) 

            routeData.forEach((route) => {

                //To Do - More Validations
                server.route(route)
            })
            
        })

    })
})

setTimeout((err) => {
    server.start((err) => {
        console.log("Pocket Gateway!")
    })
}, 1000)





