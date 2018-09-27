function getRuleJS(...includePaths) {
    return {
        test: /\.js$/,
        include: includePaths,
        use: [
            {
                loader: 'babel-loader'
            }
        ]
    };
}

module.exports = {
    getRuleJS
};
