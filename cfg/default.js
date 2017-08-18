const BabiliPlugin = require("babili-webpack-plugin");
const path = require('path');
const webpack = require('webpack');
let dfPath = {
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist'),
    common: path.resolve(__dirname, '../src/common'),
    components: path.resolve(__dirname, '../src/components'),
    layout: path.resolve(__dirname, '../src/layout'),
    view: path.resolve(__dirname, '../src/view'),
    root: path.resolve(__dirname, '../'),
    reduxes: path.resolve(__dirname, '../src/reduxes'),
    layouts: path.resolve(__dirname, '../src/layouts'),
	config: path.resolve(__dirname, '../src/config')
}

let env = process.env.NODE_ENV;

env = env ? env : 'development';

let dfConfig = {
    entry: [
        './src/app.js'
    ],

    output: {
        path: path.resolve(__dirname, '../dist/assets'),
        filename: env === 'production' ? '[name]_[hash:8].js' : 'main.js',
        publicPath: './assets/'
    },

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'img/[name].[hash:7].[ext]'
                }
              },
              {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'media/[name].[hash:7].[ext]'
                }
              },
              {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.txt$/,
                use: ['raw-loader']
            }
        ]
    },
	resolve: {
		modules: [
			path.resolve(__dirname, '../node_modules'),
			dfPath.src,
			dfPath.common,
			dfPath.components,
			dfPath.layout,
			dfPath.view,
			dfPath.root,
			dfPath.config
		]
	},
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            Component: ['react', 'Component'],
            PT: 'prop-types',
            KV: 'react-konva',
            push: ['react-router-redux', 'push'],
			ReactEcharts: 'echarts-for-react'
        }),

        // new OpenBrowser({url: `http://localhost:${9000}`})
    ],
}

module.exports = {
    dfPath,
    dfConfig
};
