"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var creds_1 = require("../config/creds");
var CommandManager = /** @class */ (function () {
    function CommandManager(raw_command) {
        this.Command = {
            UtilityProgram: String(),
            Body: {
                Args: new Array(),
                Flags: [{
                        name: String(),
                        arg: String()
                    }]
            }
        };
        this.InitCommand();
        this.cpsp = raw_command.split(' ');
        this.spCommand = raw_command.split(' ');
        this.indexFlagArgs = new Array();
        // Utility 
        this.addUtility(this.cpsp);
        // Flags & Args
        this.addArgsFlags(this.spCommand); // let it be changed (will be used in Args)
        //
        // deallocate arrays.
        this.cpsp = null;
        this.spCommand = null;
        this.indexFlagArgs = null;
    }
    CommandManager.prototype.InitCommand = function () {
        this.Command = {
            UtilityProgram: String(),
            Body: {
                Args: new Array(),
                Flags: [{
                        name: String(),
                        arg: String()
                    }]
            }
        };
    };
    // add utility without the sign.
    CommandManager.prototype.addUtility = function (sp) {
        sp.splice(1);
        this.Command.UtilityProgram = sp[0].replace(creds_1.creds.sign, '');
    };
    // NOTE: flag argument includes one argument.
    CommandManager.prototype.addArgsFlags = function (sp) {
        sp.splice(0, 1); // Delete Utility
        this.Command.Body.Flags.pop();
        for (var i = 0; i < sp.length; i++) {
            if (sp[i][0] === '-') {
                this.Command.Body.Flags.push({
                    name: sp[i].replace('-', ''),
                    // It might be the next flag name? (no flag args)
                    arg: sp[i + 1] ? (sp[i + 1].startsWith('-') ? null : sp[i + 1]) : null
                });
                this.indexFlagArgs.push(i + 1);
            }
            // Add what's left as Args
            else // if not flag arg...
             if (this.indexFlagArgs.indexOf(i) === -1)
                this.Command.Body.Args.push(sp[i]);
        }
    };
    return CommandManager;
}());
exports.default = CommandManager;
