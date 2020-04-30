"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utility_flags_1 = __importDefault(require("../interfaces/utility_flags"));
// Description + flags + example + further deatail
var FLAGS = function (u) { return '\nFlags: ' + GetFlags(u); };
var SYNTAX = function (s) { return '\nUsage:  \\$' + s; };
var EXAMPLE = function (exs) {
    var o = '';
    exs.forEach(function (ex) { return o += "\n \\> \\$" + ex; });
    return '\nExamples: ' + o;
};
var EXTRA = function (ex) { return "\nMore info: \n" + ex; };
var GetFlags = function (u) {
    var arr = [];
    for (var p in u)
        arr.push(u[p]);
    return arr.join(', ');
};
var Bind = function (description, flag, syntax, example, extra) {
    return (description + '.' +
        ("" + (flag ? FLAGS(flag) : '')) +
        ("" + (syntax ? SYNTAX(syntax) : '')) +
        ("" + (example ? EXAMPLE(example) : '')) +
        ("" + (extra ? EXTRA(extra) : '')));
};
var HelpTxt = {
    bee: Bind('basic information about this bot'),
    echo: Bind("Displays messages", utility_flags_1.default.Echo, 'echo [message: string] -u|-upper -l|-lower -r [times: number]', ['echo hello world!']),
    help: Bind("Provides help information for commands", null, 'help [command]', ['help echo']),
    astro: Bind("Number of astronauts currently in space sorted by their crafts", null, null, ['astro']),
    feat: Bind('Some notes and features about bee', null, null, ['feat']),
    system: Bind("This tool displays info about operating system which this bot is running on", null, 'system [info|uptime|cpu|memory]', ['system cpu'], 'The default option is [info].')
};
exports.default = HelpTxt;
/* Note:
All utility programs start with small letter,
whereas all the utility program classes start with big letter.
so, in the classes, by getting the name of the class can get the
right class.
overall, it means that that this object is still case-sensitive ;
just not the first letter.
*/ 
