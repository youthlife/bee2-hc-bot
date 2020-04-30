"use strict";
var ishexc = require('is-hexcolor');
var align = require('ascii-string-align');
var getjson = require('get-json');
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
