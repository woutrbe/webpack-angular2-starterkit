var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var baseFolder = __dirname + '/..';

var extractCSS = new ExtractTextPlugin('style.css');

module.exports = {
	context: path.resolve(baseFolder, 'src'),
	entry: {
		index: './js/index.ts',
		vendor: './js/vendor.ts'
	},
	output: {
		path: path.resolve(baseFolder, 'build'),
		filename: '[name].js',
		publicPath: '/'
	},
	debug: false,
	resolve: {
		root: path.resolve('./src/js'),
		alias: {
			'config': path.resolve('./src/config/prod.js')
		},
		extensions: ['', '.ts', '.js', '.html', '.scss', '.css', '.json']
	},
	tslint: {
		emitErrors: false,
		failOnHint: false,
		resourcePath: 'src'
	},
	plugins: [
		// Remove build folder before starting
		new CleanWebpackPlugin(['build'], {
			root: process.cwd(),
			verbose: true, 
			dry: false
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(baseFolder, 'src/index.html'),
			hash: true
		}),
		extractCSS,
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false,
			compress: {
				warnings: true
			}
		})
	],
	module: {
		preLoaders: [
			{
				test: /\.ts$/,
				loader: 'tslint-loader',
				exclude: /node_modules/
			}
		],
		loaders: [
			{
				test: /\.ts$/,
				loaders: ['awesome-typescript-loader', 'angular2-template-loader?keepUrl=true']
			},
			{
				test: /\.scss$/,
				loader: extractCSS.extract('style-loader', '!css!sass')
			},
			{
				test: /\.html$/,
				loader: 'html'
			},
			{
				test: /\.(ttf|otf|eot|svg|woff(2)?)(.*)?$/,
				loader: 'file?name=assets/fonts/[name].[ext]'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file?hash=sha512&digest=hex&name=assets/images/[hash].[ext]',
					'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			},
			{
				test: /\.json$/,
				loader: 'json'
			}
		]
	},

	imageWebpackLoader: {
		pngquant: {
			quality: '50',
			speed: 4
		}
	}
};