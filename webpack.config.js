var path = require('path');

module.exports = {
	entry: "./js/main.js",
	output: {
    	filename: 'bundle.js',
    	path: path.resolve(__dirname, './dist')
  	},

	// watch: true,

	// watchOptions: {
	// 	aggregateTimeout: 300
	// },

	module: {
	  loaders: [
	    {
	      test: /\.js$/,
	      exclude: /node_modules/,
	      loader: 'babel-loader',
	      query: {
	        presets: ['es2015']
	      }
	    }
	  ]
	}﻿
};