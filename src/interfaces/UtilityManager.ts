import WebSocket from "ws";

/**
 * interface for all utility programs which is used by Command class (the base class of the utility programs).
 */
export interface IUtility {
	ws: WebSocket,
	output: String,
    command: typeof ICommand,
    // ArgMgr(): void,
    // FlagMgr(): void,
	Process(): void,
	// Send(text: string): void
}

/**
 * part of a command.
 */
export const ICommand = {
    UtilityProgram: String(),
    Body: {
        Args: new Array<string>(),
        Flags: [{
            name: String(),
            arg: String()
        }]
    }
}