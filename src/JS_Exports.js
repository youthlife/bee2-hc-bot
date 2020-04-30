const ishexc = require('is-hexcolor');
const align = require('ascii-string-align');
const getjson = require('get-json')
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
