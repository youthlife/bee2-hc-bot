"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var creds_1 = require("../config/creds");
var InfoValidation;
(function (InfoValidation) {
    function ValEmoteNickTrip(data) {
        return data.trip !== creds_1.creds.trip;
    }
    InfoValidation.ValEmoteNickTrip = ValEmoteNickTrip;
    function ValWhisperNickTrip(data) {
        return data.nick !== creds_1.creds.nick && data.trip !== creds_1.creds.trip;
    }
    InfoValidation.ValWhisperNickTrip = ValWhisperNickTrip;
})(InfoValidation = exports.InfoValidation || (exports.InfoValidation = {}));
