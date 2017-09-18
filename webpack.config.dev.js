import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';

const CONFIG = require('./webpack.base');

export default {
	resolve: {
		extensions: ['*', '.js', '.jsx', '.json']
	},
	devtool: 'eval-source-map', // more info:https://webpack.js.org/guides/development/#using-source-maps and https://webpack.js.org/configuration/devtool/
	entry: [
		// must be first entry to properly set public path
		'./src/webpack-public-path',
		'react-hot-loader/patch',
		'webpack-hot-middleware/client?reload=true',
		CONFIG.CLIENT_ENTRY // Defining path seems necessary for this to work consistently on Windows machines.
	],
	target: 'web',
	output: {
		path: CONFIG.DIST, // Note: Physical files are only output by the production build task `npm run build`.
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
			__DEV__: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
			template: 'src/index.ejs',
			minify: {
				removeComments: true,
				collapseWhitespace: true
			},
			inject: true
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: false,
			debug: true,
			noInfo: true, // set to false to see a list of every file being bundled.
			options: {
				sassLoader: {
					includePaths: [path.resolve(__dirname, 'src', 'scss')]
				},
				context: '/',
				postcss: () => [autoprefixer({
					'browsers': [
						'last 3 version',
						'ie >= 10',
					],
				})],
			}
		})
	],
	module: {
		rules: [
			{test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader']},
			{test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader'},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
			{test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]'},
			{test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
			{
				//test: /(\.css|\.scss|\.sass)$/,
				//loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap']
				'test': /\.css|\.scss$/,
				'use': [
					// source maps messes with background-image  -  https://github.com/webpack-contrib/style-loader#recommended-configuration
					'style-loader?convertToAbsoluteUrls',
					'css-loader?sourceMap&importLoaders=1&modules&camelCase=dashes&localIdentName=[local]--[hash:base64:5]',
					'postcss-loader',
					'sass-loader?sourceMap',
				],
			}
		]
	}
};
