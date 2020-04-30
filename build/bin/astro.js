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
var Latex_1 = __importDefault(require("../tools/Latex"));
var Command_1 = __importDefault(require("../interfaces/Command"));
var WebColors_1 = __importDefault(require("../lib/WebColors"));
var JS_Exports_1 = require("../JS_Exports");
var Astro_1 = __importDefault(require("../API/Astro"));
var Astro = /** @class */ (function (_super) {
    __extends(Astro, _super);
    function Astro(command, ws) {
        return _super.call(this, command, ws) || this;
    }
    Astro.prototype.Process = function () {
        var _this = this;
        JS_Exports_1.getjson(Astro_1.default.url.base, function (error, res) {
            if (!error)
                if (res.message.includes('success'))
                    _this.HandleRes(res);
                else
                    _this.output = "Response failure.";
            else
                _this.output = "Error: " + error;
            _this.Send(_this.output);
        });
    };
    Astro.prototype.SortPeople = function (people) {
        var sortedPeople = {};
        for (var _i = 0, people_1 = people; _i < people_1.length; _i++) {
            var k = people_1[_i];
            if (!sortedPeople[k.craft])
                sortedPeople[k.craft] = [];
            sortedPeople[k.craft].push(k.name);
        }
        return sortedPeople;
    };
    Astro.prototype.HandleRes = function (res) {
        var sortedPeople = this.SortPeople(res.people);
        this.output += Latex_1.default.Compile(res.number.toString(), WebColors_1.default.AliceBlue, true) + " Astronauts are currently in space.";
        for (var craft in sortedPeople) {
            this.output += "\nCraft: " + craft;
            for (var _i = 0, _a = sortedPeople[craft]; _i < _a.length; _i++) {
                var astronaut = _a[_i];
                this.output += "\n \\* " + astronaut;
            }
        }
    };
    return Astro;
}(Command_1.default));
exports.default = Astro;
