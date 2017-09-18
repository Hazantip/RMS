const path = require('path');

module.exports = {
	'CLIENT_ENTRY': path.resolve(__dirname, 'src/index.js'),
	'ASSETS': path.resolve(__dirname, './src/assets'),
	'DIST': path.resolve(__dirname, './dist')
};
