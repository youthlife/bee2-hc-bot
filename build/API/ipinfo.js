"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_keys_1 = __importDefault(require("../config/api_keys"));
var API;
(function (API) {
    API.url = {
        key: 'apiKey=' + api_keys_1.default.ipinfo,
        base: "https://api.ipgeolocation.io/",
        modes: {
            ipgeo: 'ipgeo',
            timezone: 'timezone',
            astronomy: 'astronomy',
        }
    };
})(API || (API = {}));
exports.default = API;
