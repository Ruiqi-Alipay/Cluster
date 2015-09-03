import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import express from 'express';
import path from 'path';

var compiler = webpack({
	entry: path.join(__dirname, 'src', 'app.js'),
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel'
			}
		]
	},
	output: {
		filename: 'app.js',
		publicPath: path.join(__dirname, 'dist'),
		path: '/dist/'
	}
});

var app = new WebpackDevServer(compiler, {
	contentBase: '/dist/',
	stats: {coloes: true}
});

app.use('/api', require('./apis'));
app.use('/', express.static('dist'));
app.listen(80, () => {
	console.log(`Webpack dev server now running at port: 80`);
});