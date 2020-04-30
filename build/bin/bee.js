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
var Bee = /** @class */ (function (_super) {
    __extends(Bee, _super);
    function Bee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bee.prototype.Process = function () {
        this.output =
            "name: " + creds_1.creds.name + "\n" +
                ("author: " + creds_1.creds.author + "\n") +
                ("sign (trigger): " + creds_1.creds.sign + "\n") +
                ("version: " + creds_1.creds.version + "\n") +
                ("copyright: " + creds_1.creds.copyRight);
        this.Send(this.output);
    };
    return Bee;
}(Command_1.default));
exports.default = Bee;
