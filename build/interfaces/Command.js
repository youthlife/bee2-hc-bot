"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command = /** @class */ (function () {
    function Command(command, ws) {
        this.ws = ws;
        this.output = new String();
        this.command = command;
    }
    Command.prototype.ArgMgr = function () { };
    Command.prototype.FlagMgr = function () {
        var _this = this;
        this.command.Body.Flags.forEach(function (flag) {
            if (flag.name)
                _this.flagToFunction(flag.name, flag.arg);
        });
    };
    Command.prototype.flagToFunction = function (flag, arg) { };
    Command.prototype.Process = function () {
        this.Send(this.output);
    };
    Command.prototype.Send = function (txt) {
        var output = txt ? txt.toString() : null;
        this.ws.send(JSON.stringify({
            cmd: 'chat',
            text: output ? output : "I don't feel like chatting."
        }));
    };
    return Command;
}());
exports.default = Command;
