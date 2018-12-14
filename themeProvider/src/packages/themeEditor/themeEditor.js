const KeyValueStorage = require('./KeyValueStorage');
const Theme = require('./Theme');

module.exports = {
    pkg: {
        name: 'themeEditor'
    },
    async register(server, options) {
        const { themePath, themeFilename } = options;
        const themeDB = new KeyValueStorage();
        const originalTheme = Theme.createFromSass({ themePath, themeFilename });

        // Main fast use case scenario (for demo)
        // 1. Create custom theme from the original (by randomization?)
        // 2. Serve css file

        // Main proper use case scenario (for demo)
        // 1. Create therme from the original
        // 2. Customize some variables
        // 3. Serve theme css file

        server.route([
            {
                method: 'POST',
                path: '/theme',
                async handler(request) {
                    let theme;

                    if (request.query.random === 'true') {
                        theme = await Theme.createFromSassAndRandomize({
                            themePath,
                            themeFilename
                        });
                    } else {
                        theme = await Theme.createFromSass({ themePath, themeFilename });
                    }

                    const { id } = themeDB.create(theme.toJSON());
                    return { id };
                }
            },
            {
                method: 'GET',
                path: '/theme/{themeId}',
                handler(request, h) {
                    const { themeId } = request.params;
                    const theme = themeDB.read(themeId);

                    if (!theme) {
                        const response = h.response();
                        response.code(404);
                        return response;
                    }

                    return theme;
                }
            },
            {
                method: 'GET',
                path: '/theme/{themeId}.css',
                handler(request, h) {
                    const { themeId } = request.params;
                    const themePayload = themeDB.read(themeId);

                    if (!themePayload) {
                        const response = h.response();
                        response.code(404);
                        return response;
                    }

                    const theme = new Theme(themePayload);
                    const response = h.response(theme.toCSS());
                    response.type('text/css');
                    return response;
                }
            }
        ]);
    }
};
