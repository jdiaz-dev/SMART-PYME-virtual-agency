require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const isProduction = typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';

const plugings = [
    new webpack.HotModuleReplacementPlugin(), //replace only necesary code
]
if(mode !== 'production') {
    plugings.push(new RunScriptWebpackPlugin({ name: 'main.js' }))
}

module.exports = {
    entry: [
        'webpack/hot/poll?100',
        './src/main.ts',
    ],
    optimization: {
        minimize: false,
    },
    target: 'node',
    mode,
    externals: [
        nodeExternals({
          allowlist: ['webpack/hot/poll?100'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                  transpileOnly: true
                },
                exclude: /node_modules/,
              }
]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins:plugings,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js',
    },
};

//fork-ts-checker-webpack-plugin