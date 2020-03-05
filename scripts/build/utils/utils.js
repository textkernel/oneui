const postcssAutoprefixer = require('autoprefixer'); // eslint-disable-line import/no-extraneous-dependencies

function getRuleJS({ includePaths }) {
    return {
        test: /\.js$/,
        include: includePaths,
        use: ['babel-loader'],
    };
}

function getRuleTS({ includePaths }) {
    return {
        test: /\.(ts|tsx)$/,
        include: includePaths,
        use: ['ts-loader'],
    };
}

function getRuleCSS({ styleLoader, includePaths }) {
    return {
        test: /\.css$/,
        include: includePaths,
        resourceQuery: /external/,
        use: [
            styleLoader,
            {
                loader: 'css-loader',
            },
        ],
    };
}

function getRuleSCSS({ styleLoader, localIdentName, includePaths, context }) {
    return {
        test: /\.scss$/,
        use: [
            styleLoader,
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName,
                    context,
                },
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: [postcssAutoprefixer],
                },
            },
            {
                loader: 'sass-loader',
                options: {
                    includePaths,
                },
            },
        ],
        sideEffects: true,
    };
}

function getRuleFiles({ fileLoader }) {
    return {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
            {
                loader: fileLoader,
            },
        ],
        sideEffects: true,
    };
}

module.exports = {
    getRuleJS,
    getRuleTS,
    getRuleCSS,
    getRuleSCSS,
    getRuleFiles,
};
