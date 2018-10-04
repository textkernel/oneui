function getRuleJS(useLinting = true, ...includePaths) {
    const loaders = useLinting ? ['babel-loader', 'eslint-loader'] : ['babel-loader'];

    return {
        test: /\.js$/,
        include: includePaths,
        use: loaders
    };
}

module.exports = {
    getRuleJS
};
