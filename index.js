
const fs = require('fs')
const Hapi = require('hapi')
const server = new Hapi.Server()

const routesFolder = './services/'

server.connection({ port: process.env.NODE_PORT || 8080 })

server.register({
    register: require('h2o2')
}, (err) => {
    if (err) {
        throw err
    }
})

fs.readdir(routesFolder, (err, files) => {

    files.forEach((file) => {

        let filename = __dirname + "/services/" + file

        console.log("LOAD FILE: " + file)

        //Load a JSON data into a Hapi Route
        fs.readFile(filename, 'utf8', (err, data) => {

            //Colocar um Foreach aqui - Poder carregar várias rotas dentro de um arquivo
            let routeData = JSON.parse(data) 
            server.route(routeData)

        })

    })
})

setTimeout((err) => {
    server.start((err) => {
        console.log("Pocket Gateway!")
    })
}, 1000)





