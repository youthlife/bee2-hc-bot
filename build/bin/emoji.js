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
var emoji_1 = __importDefault(require("../lib/emoji"));
var Emoji = /** @class */ (function (_super) {
    __extends(Emoji, _super);
    function Emoji(command, ws) {
        var _this = _super.call(this, command, ws) || this;
        _this.stored_emojis = [];
        _this.ArgMgr();
        return _this;
    }
    Emoji.prototype.ArgMgr = function () {
        var _this = this;
        this.command.Body.Args.forEach(function (arg) {
            var e = emoji_1.default[arg.toLowerCase()];
            if (e)
                _this.stored_emojis.push(e);
        });
        this.output = this.stored_emojis ? this.stored_emojis.join('') : null;
    };
    return Emoji;
}(Command_1.default));
exports.default = Emoji;
