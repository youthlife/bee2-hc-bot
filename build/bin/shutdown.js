"use strict";
/**
 * Shutdown now OR -p
 * Shutdown < time in seconds > (-h for hours)
 * Shutdown abort OR -a
*/
var Shutdown = function (time) {
    if (time === void 0) { time = 0; }
    var sd = function () { return process.exit(); };
    setTimeout(sd, time * 1000);
};
