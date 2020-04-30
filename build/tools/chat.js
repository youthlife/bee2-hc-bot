"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var creds_1 = require("../config/creds");
var Latex_1 = __importDefault(require("./Latex"));
var WebColors_1 = __importDefault(require("../lib/WebColors"));
var ChatValidation;
(function (ChatValidation) {
    function ValSign(sign) {
        return sign.charAt(0) === creds_1.creds.sign;
    }
    ChatValidation.ValSign = ValSign;
    function ValFlag(text) {
        var sp;
        sp = text.split(' ');
        sp = sp.filter(function (el) {
            return el.startsWith('-');
        });
        return new Set(sp).size === sp.length;
    }
    ChatValidation.ValFlag = ValFlag;
    function ValUtilityProgram(text) {
        var program, sp;
        sp = text.split(' ');
        program = sp[0].replace(creds_1.creds.sign, '');
        return creds_1.UtilityPrograms[program] !== undefined;
    }
    ChatValidation.ValUtilityProgram = ValUtilityProgram;
    function ValTripNick(data) {
        return data.nick !== creds_1.creds.nick && data.trip !== creds_1.creds.trip;
    }
    ChatValidation.ValTripNick = ValTripNick;
    function ValCommand(IDH, data) {
        if (ValSign(data.text))
            if (ValUtilityProgram(data.text))
                if (ValFlag(data.text))
                    return true;
                else {
                    IDH.ws.send(JSON.stringify({
                        cmd: 'chat',
                        text: Latex_1.default.Compile("Don't use duplicate flags!", WebColors_1.default.MediumVioletRed, true)
                    }));
                    return false;
                }
            else
                return false;
        else
            return false;
    }
    ChatValidation.ValCommand = ValCommand;
})(ChatValidation = exports.ChatValidation || (exports.ChatValidation = {}));
