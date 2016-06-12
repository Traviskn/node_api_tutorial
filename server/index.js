'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const path = require('path');

// Create a server
const server = new Hapi.Server({
   // Configure where static files are located
    connections: {
        routes: {
            files: {
                relativeTo: path.join(__dirname, '../client')
            }
        }
    }
});

// Configure the server host and port
server.connection({
    host: 'localhost',
    port: 8000
});

// Register plugins
server.register([Inert], (err) => {
    if(err) {
        throw err;
    }

    // Add the home route and api messages route
    server.route([
      {
        method: 'GET',
        path:'/',
        handler: {
            file: './index.html'
        }
      }, {
        method: 'GET',
        path: '/api/messages/',
        handler: function(request, reply) {
          // Create some dummy data to send back
          return reply({
            data: [
              { id: 1, message: "Hello there!" },
              { id: 2, message: "What's up?" },
              { id: 3, message: "How are you?"}
            ]
          });
        }
      }
    ]);

    // Start the server
    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});
