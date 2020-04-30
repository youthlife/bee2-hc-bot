"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var WebColors_1 = __importDefault(require("../lib/WebColors"));
var JS_Exports_1 = require("../JS_Exports");
var Latex;
(function (Latex) {
    Latex.latexSize = {
        tiny: '\\tiny',
        huge: "\\huge",
        small: "\\small",
    };
    var mdsize = {
        h1: "#",
        h2: "##",
        h3: "###",
        h4: "####",
        h5: "#####",
        h6: "######"
    };
    function ReSize(text, size) {
        if (size > 0 && size < 7)
            return mdsize["h" + size] + ' ' + text;
    }
    Latex.ReSize = ReSize;
    function IsColor(color) {
        var xcolor = color.startsWith('#') ? color : '#' + color;
        return WebColors_1.default[color] || JS_Exports_1.ishexc(xcolor);
    }
    Latex.IsColor = IsColor;
    function Compile(text, color, useText, size) {
        if (color === void 0) { color = null; }
        if (useText === void 0) { useText = false; }
        if (size === void 0) { size = null; }
        var output = '$';
        if (useText)
            output += "\\text";
        if (size)
            output += size;
        if (color)
            output += "\\color{" + color + "}";
        return output + "{" + text + "}" + '$';
    }
    Latex.Compile = Compile;
})(Latex || (Latex = {}));
exports.default = Latex;
