"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Data_1 = __importDefault(require("../lib/Data"));
var utility_flags_1 = __importDefault(require("../interfaces/utility_flags"));
var Command_1 = __importDefault(require("../interfaces/Command"));
var Echo = /** @class */ (function (_super) {
    __extends(Echo, _super);
    function Echo(command, ws) {
        var _this = _super.call(this, command, ws) || this;
        _this.ArgMgr = function () { _this.jargs = _this.command.Body.Args.join(' '); };
        _this.Process = function () { return _this.Send(_this.jargs); };
        _this.ArgsToLower = function () { _this.jargs = _this.jargs.toLowerCase(); };
        _this.ArgsToUpper = function () { _this.jargs = _this.jargs.toUpperCase(); };
        _this.ArgMgr();
        _this.FlagMgr();
        return _this;
    }
    Echo.prototype.ArgsRepeat = function (times) {
        if (this.jargs.length * times < Data_1.default.CharLimit) {
            this.jargs += ' ';
            try {
                this.jargs = this.jargs.repeat(times);
            }
            catch (_a) {
                this.jargs = null;
            }
        }
    };
    Echo.prototype.flagToFunction = function (flag, arg) {
        if (!utility_flags_1.default.Echo[flag])
            return;
        // don't change the order: lower or upper , not both. repeat is not related.
        if (flag === utility_flags_1.default.Echo.l || flag === utility_flags_1.default.Echo.lower)
            this.ArgsToLower();
        else if (flag === utility_flags_1.default.Echo.u || flag === utility_flags_1.default.Echo.upper)
            this.ArgsToUpper();
        if (flag === utility_flags_1.default.Echo.r || flag === utility_flags_1.default.Echo.repeat)
            this.ArgsRepeat(Number(arg));
    };
    return Echo;
}(Command_1.default));
exports.default = Echo;
