"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Warn_1 = __importDefault(require("../tools/Warn"));
var CommandManager_1 = __importDefault(require("./CommandManager"));
var chat_1 = require("../tools/chat");
var creds_1 = require("../config/creds");
var IncomingDataHandler = /** @class */ (function () {
    function IncomingDataHandler(ws) {
        this.ws = ws;
        // this.iSent = 0; // others: total - me
        // this.tSent = 0;
        this.iJoin = true;
    }
    IncomingDataHandler.prototype.InitializeLogin = function () {
        this.ws.send(JSON.stringify({ cmd: 'chat', text: '/color ffff00' }));
        // this.ws.send(JSON.stringify({ cmd: 'chat', text: `... and I'm back online.` }));
    };
    IncomingDataHandler.prototype.HandleChat = function (data) {
        if (chat_1.ChatValidation.ValCommand(this, data)) {
            this.commandManager = new CommandManager_1.default(data.text);
            this.utilityProgram = new creds_1.UtilityPrograms[this.commandManager.Command.UtilityProgram](this.commandManager.Command, this.ws);
            this.utilityProgram.Process();
        }
    };
    IncomingDataHandler.prototype.HandleJoin = function (data) { };
    IncomingDataHandler.prototype.HandleLeave = function (data) { };
    IncomingDataHandler.prototype.HandleEmote = function (data) { };
    IncomingDataHandler.prototype.HandleWhisper = function (data) { };
    IncomingDataHandler.prototype.HandleWarn = function (data) {
        var rate_limit = "You are sending too much text. Wait a moment and try again";
        var rate_limit2 = "You are being rate-limited or blocked";
        if (data.text.includes(rate_limit) || data.text.includes(rate_limit2)) {
            Warn_1.default.rlProcess();
        }
        else
            process.exit();
    };
    return IncomingDataHandler;
}());
exports.default = IncomingDataHandler;
