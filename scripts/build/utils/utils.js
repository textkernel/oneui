const postcssAutoprefixer = require('autoprefixer'); // eslint-disable-line import/no-extraneous-dependencies

function getRuleJS({ includePaths }) {
    return {
        test: /\.js$/,
        include: includePaths,
        use: ['babel-loader'],
    };
}

function getRuleCSS({ styleLoader, localIdentName, includePaths, context }) {
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
    };
}

module.exports = {
    getRuleJS,
    getRuleCSS,
};
