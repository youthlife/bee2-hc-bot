"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = require("ws");
var creds_1 = require("./config/creds");
var chat_1 = require("./tools/chat");
var info_1 = require("./tools/info");
var IncomingDataHandler_1 = __importDefault(require("./controllers/IncomingDataHandler"));
var ws = new WebSocket('wss://hack.chat/chat-ws');
var dh = new IncomingDataHandler_1.default(ws);
// << Join >>
ws.onopen = function () {
    ws.send(JSON.stringify({
        cmd: 'join',
        channel: creds_1.creds.channel,
        nick: creds_1.creds.join()
    }));
};
// << leave >>
ws.onclose = function () { ws.terminate(); };
// << cmd >>
ws.onmessage = function (data) {
    data = JSON.parse(data.data);
    try {
        if (dh.iJoin) {
            dh.iJoin = false;
            dh.InitializeLogin();
        }
        switch (data.cmd) {
            case 'chat':
                // dh.tSent++;
                if (chat_1.ChatValidation.ValTripNick(data))
                    dh.HandleChat(data);
                break;
            case 'info':
                if (data.type === 'emote') {
                    if (info_1.InfoValidation.ValEmoteNickTrip(data)) {
                        dh.HandleEmote(data);
                    }
                }
                else if (data.type === 'whisper') {
                    if (info_1.InfoValidation.ValWhisperNickTrip(data))
                        dh.HandleWhisper(data);
                }
                // System
                else {
                    console.log("System info: " + data.text);
                }
                break;
            case 'warn':
                console.log("warn: " + data.text);
                dh.HandleWarn(data);
            case 'onlineRemove':
                break;
            case 'onlineAdd':
                break;
        }
    }
    catch (_) {
        console.log(_);
    }
};
