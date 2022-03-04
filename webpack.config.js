/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const sveltePreprocess = require('svelte-preprocess')
const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'
const { markdownFilesData, makeHtmlConfig} = require('./md-to-html-plugin.js')

module.exports = {
	entry: {
		'build/bundle': [path.resolve(__dirname, 'src/main.ts')]
	},
	resolve: {
		alias: {
			svelte: path.dirname(require.resolve('svelte/package.json'))
		},
		extensions: ['.mjs', '.js', '.ts', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: path.join(__dirname, '/public'),
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
			rules: [
				{
					test: /\.html$/,
					loader: 'html-loader',
				},
				{
					test: /\.ts$/,
					loader: 'ts-loader',
					exclude: /node_modules/
				},
				{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							dev: !prod
						},
						emitCss: prod,
						hotReload: !prod,
							preprocess: sveltePreprocess({ sourceMap: !prod })
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
			{
				// required to prevent errors from Svelte on Webpack 5+
				test: /node_modules\/svelte\/.*\.mjs$/,
				resolve: {
					fullySpecified: false
				}
			}
		]
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		...markdownFilesData.map(makeHtmlConfig),
	],
	devtool: prod ? false : 'inline-source-map',
	devServer: {
		hot: true,
		static: path.resolve(__dirname, 'public'),
		compress: true,
		port: 8080,
	}
}
