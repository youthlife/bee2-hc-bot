const getjson = require('get-json')
const ishexc = require('is-hexcolor');
const align = require('ascii-string-align');
module.exports = {
	align: align,
	alignOptions: {
		right: 'right',
		left: 'left',
		justify: 'justify',
		center: 'center'
	},
	ishexc: ishexc,
	getjson: getjson,
};