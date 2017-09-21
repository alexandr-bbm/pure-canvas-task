const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const { devtool, PRODUCTION, uglifyJsOptions } = require('./common');

const config = {
    context: path.resolve(__dirname, '../src/client'),
    entry: {
        client: './index.tsx',
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../dist/assets'),
    },

    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js'
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: path.join(__dirname, '../src/server/*'),
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.svg/,
                use: 'raw-loader',
            },
            {
                test: /\.woff/,
                use: 'file-loader',
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            }
        }),
    ],
    devtool,
};

if (PRODUCTION) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin(uglifyJsOptions));
}

module.exports = config;