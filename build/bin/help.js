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
var creds_1 = require("../config/creds");
var HelpTxt_1 = __importDefault(require("../lib/HelpTxt"));
// Help also has help! it's a utility program afterall.
var Help = /** @class */ (function (_super) {
    __extends(Help, _super);
    function Help(command, ws) {
        var _this = _super.call(this, command, ws) || this;
        _this.ArgMgr = function () { return _this.prgrm = _this.command.Body.Args[0]; };
        _this.ArgMgr();
        return _this;
    }
    Help.prototype.Process = function () {
        this.helpText = HelpTxt_1.default[this.prgrm];
        this.IsPrgrm = creds_1.UtilityPrograms[this.prgrm];
        if (this.IsPrgrm)
            if (this.helpText)
                this.Send(this.helpText);
            else
                this.Send("No help is available for this command (yet).");
        else
            this.General();
    };
    Help.prototype.General = function () {
        var output = '';
        output += 'Commands: \n';
        output += creds_1.UtilityNames().join(' . ') + '.\n';
        output += 'for more info run: $feat';
        this.Send(output);
    };
    return Help;
}(Command_1.default));
exports.default = Help;
