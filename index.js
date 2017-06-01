
const routesFolder = './routes/';
const fs = require('fs');

const Hapi = require('hapi')
const server = new Hapi.Server()

server.connection({port: 80})

server.register({
        register: require('h2o2')
    }, (err) => {}
)

fs.readdir(routesFolder, (err, files) => {
    files.forEach((file) => {
        console.log(file);
        
        let filename = __dirname + "/routes/" + file

        fs.readFile(filename, 'utf8', (err, data) => {
            
            let routeData = JSON.parse(data)

            server.route(routeData)

        })

    })
})

server.start((err) => {
    console.log("gateway")
})
