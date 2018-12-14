// Process exit handlers
function createExitHandler(server) {
    return function exitHandler(options, exitCode) {
        // No way to call async function here
        if (options.cleanup) return console.log('clean');

        if (options.exit) {
            server.stop({ timeout: 10000 }).then(err => {
                console.log('hapi server stopped.');
                process.exit(err ? 1 : 0);
                if (exitCode || exitCode === 0) console.log(exitCode);
            });
        }
    };
}

module.exports = {
    pkg: {
        name: 'processExitHandler'
    },
    async register(server) {
        const exitHandler = createExitHandler(server);

        // do something when app is closing
        process.on('exit', exitHandler.bind(null, { cleanup: true }));

        // catches ctrl+c event
        process.on('SIGINT', exitHandler.bind(null, { exit: true }));

        // catches "kill pid" (for example: nodemon restart)
        process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
        process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

        // catches uncaught exceptions
        process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
    }
};
