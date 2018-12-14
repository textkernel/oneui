const Hapi = require('hapi');
const themeEditor = require('./packages/themeEditor');
const processExitHandler = require('./packages/processExitHandler');

const DEFAULT_PORT = 8765;

const server = Hapi.server({
    host: 'localhost',
    port: process.env.PORT || DEFAULT_PORT
});

// Start the server
(async function start() {
    try {
        await server.register([
            {
                plugin: themeEditor,
                options: {
                    themePath: '../src/themes/nice',
                    themeFilename: 'nice.scss'
                }
            },
            {
                plugin: processExitHandler
            }
        ]);

        await server.start();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
})();
