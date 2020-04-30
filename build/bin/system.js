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
var System = /** @class */ (function (_super) {
    __extends(System, _super);
    function System(command, ws) {
        var _this = _super.call(this, command, ws) || this;
        _this.ArgMgr();
        return _this;
    }
    System.prototype.ArgMgr = function () { this.val = this.command.Body.Args[0]; };
    System.prototype.Process = function () {
        if (this.val)
            switch (this.val.toLowerCase()) {
                case 'cpu':
                    this.Cpu();
                    break;
                case 'info':
                    this.Info();
                    break;
                case 'uptime':
                    this.Uptime();
                    break;
                case 'memory':
                    this.Memory();
                    break;
                default:
                    this.output =
                        'Invalid argument\ntry reading help on this command by running: ```$help system```';
                    break;
            }
        else
            this.Info();
        this.Send(this.output);
    };
    System.prototype.Cpu = function () {
        var usg = process.cpuUsage();
        this.output =
            "< Cpu Usage > \n" +
                ("User: " + usg.user + "\n") +
                ("System: " + usg.system);
    };
    System.prototype.Info = function () {
        this.output =
            "< System Info > \n" +
                ("Arch: " + process.arch) + '\n' +
                ("Platform: " + process.platform) + '\n' +
                ("Number of processors: " + process.env['NUMBER_OF_PROCESSORS']) + '\n' +
                ("Processor level: " + process.env['PROCESSOR_LEVEL']) + '\n' +
                ("Processor architecture: " + process.env['PROCESSOR_ARCHITECTURE']) + '\n' +
                ("Processor identifier: " + process.env['PROCESSOR_IDENTIFIER']);
    };
    System.prototype.Uptime = function () { this.output = "bot uptime: " + process.uptime(); };
    System.prototype.Memory = function () {
        var mem = process.memoryUsage();
        this.output =
            "< Memory Usage > \n" +
                ("External: " + mem.external + "\n") +
                ("Heap Used: " + mem.heapUsed + "\n") +
                ("Heap Total: " + mem.heapTotal + "\n") +
                ("RSS (Resident Set Size): " + mem.rss + "\n");
    };
    return System;
}(Command_1.default));
exports.default = System;
