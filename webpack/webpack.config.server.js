const webpack = require('webpack');
const path = require('path');

const { devtool, PRODUCTION, uglifyJsOptions } = require('./common');

const config = {
    context: path.resolve(__dirname, '../src/server'),
    entry: './index.ts',
    output: {
        filename: 'index.js',
        path: path.join(__dirname, '../dist')
    },

    resolve: {
        extensions: [
            '.ts',
            '.js',
        ]
    },
    module: {
        rules: [
            {
                loader: 'awesome-typescript-loader',
                include: path.join(__dirname, '../src/server/'),
                exclude: path.join(__dirname, '../src/client/')
            },
        ]
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    devtool,
    plugins: PRODUCTION
        ? [new webpack.optimize.UglifyJsPlugin(uglifyJsOptions)]
        : [],
};

module.exports = config;
