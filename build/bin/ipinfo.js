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
var Command_1 = __importDefault(require("../interfaces/Command"));
var ipinfo_1 = __importDefault(require("../API/ipinfo"));
var JS_Exports_1 = require("../JS_Exports");
var IpInfo = /** @class */ (function (_super) {
    __extends(IpInfo, _super);
    function IpInfo(cmd, ws) {
        return _super.call(this, cmd, ws) || this;
    }
    IpInfo.prototype.Process = function () {
        var _this = this;
        this.CreateUrl();
        JS_Exports_1.getjson(this.url, function (error, res) {
            if (!error) {
                _this.output = '';
                for (var k in res)
                    _this.output += k + ': ' + res[k];
                _this.Send(_this.output);
            }
        });
    };
    IpInfo.prototype.CreateUrl = function () {
        this.url = ipinfo_1.default.url.base + ipinfo_1.default.url.modes.ipgeo + '?' + ipinfo_1.default.url.key;
    };
    IpInfo.prototype.HandleRes = function (res) { };
    return IpInfo;
}(Command_1.default));
exports.default = IpInfo;
