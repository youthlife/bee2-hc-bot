"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var feat_1 = __importDefault(require("../bin/feat"));
var help_1 = __importDefault(require("../bin/help"));
var echo_1 = __importDefault(require("../bin/echo"));
var astro_1 = __importDefault(require("../bin/astro"));
var system_1 = __importDefault(require("../bin/system"));
var ipinfo_1 = __importDefault(require("../bin/ipinfo"));
// import moduleName from '../bin/ipinfo';
exports.UtilityPrograms = {
    echo: echo_1.default,
    help: help_1.default,
    feat: feat_1.default,
    astro: astro_1.default,
    system: system_1.default,
    ipInfo: ipinfo_1.default
};
var starify = function (arr, dot) {
    if (dot === void 0) { dot = true; }
    var output = '';
    arr.forEach(function (sentence) { return output += '\\* ' + sentence + (dot ? '.' : '') + '\n'; });
    return output;
};
exports.creds = {
    sign: '$',
    name: 'Bee',
    nick: 'Bee' + Math.floor(Math.random() * 100).toString(),
    trip: process.env['TRIP'],
    channel: 'bee',
    // channel: 'programming',
    join: function () { return exports.creds.nick + (exports.creds.trip ? '#' + exports.creds.trip : ''); },
    author: 'ltp',
    version: '2.0',
    copyRight: '(c) 2018 - 2020',
    description: starify([
        'commands are case-sensitive',
        'all flags come after a single hyphen (-)',
        'commands are unique. meaning: there are no aliases',
        'arguments are recognized before and after each flag',
        'the vertical bar (|) is used to seperate items e.g. between arguments',
    ])
};
exports.UtilityNames = function () {
    var arr = [];
    for (var k in exports.UtilityPrograms)
        arr.push(k.toString());
    return arr;
};
