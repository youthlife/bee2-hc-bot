"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * part of a command.
 */
exports.ICommand = {
    UtilityProgram: String(),
    Body: {
        Args: new Array(),
        Flags: [{
                name: String(),
                arg: String()
            }]
    }
};
