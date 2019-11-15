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

function getRuleTSDoc({ includePaths }) {
    return {
        test: /\.(ts|tsx)$/,
        include: includePaths,
        use: [
            {
                loader: 'react-docgen-typescript-loader',
                options: {
                    // Including prop that just was defined directly except extended props
                    propFilter: propsInfo => propsInfo.parent.name === 'Props',
                },
            },
        ],
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

function getRuleFiles({ fileLoader }) {
    return {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
            {
                loader: fileLoader,
            },
        ],
    };
}

module.exports = {
    getRuleJS,
    getRuleTS,
    getRuleTSDoc,
    getRuleCSS,
    getRuleFiles,
};
