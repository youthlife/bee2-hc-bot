import Warn from '../tools/Warn';
import WebSocket = require('ws');
import CommandManager from './CommandManager';
import {
	IChat,
	IJoin,
	ILeave,
	IEmote,
	IWhisper
} from '../interfaces/datahandle'
import { ChatValidation } from '../tools/chat';
import { UtilityPrograms } from '../config/creds';
import { IUtility } from '../interfaces/UtilityManager';

class IncomingDataHandler {
	ws: WebSocket;
	iJoin: Boolean;
	// iSent: number;
	// tSent: number;
	utilityProgram: IUtility;
	commandManager: CommandManager;
	constructor(ws: WebSocket) {
		this.ws = ws;
		// this.iSent = 0; // others: total - me
		// this.tSent = 0;
		this.iJoin = true;
	}
	InitializeLogin(): void {
		this.ws.send(JSON.stringify({ cmd: 'chat', text: '/color ffff00' }));
		// this.ws.send(JSON.stringify({ cmd: 'chat', text: `... and I'm back online.` }));
	}

	HandleChat(data: IChat): void {
		if (ChatValidation.ValCommand(this, data)) {
			this.commandManager = new CommandManager(data.text);
			this.utilityProgram = new UtilityPrograms[this.commandManager.Command.UtilityProgram]
				(this.commandManager.Command, this.ws);
			this.utilityProgram.Process();
		}
	}
	HandleJoin(data: IJoin): void { }
	HandleLeave(data: ILeave): void { }
	HandleEmote(data: IWhisper): void { }
	HandleWhisper(data: IEmote): void { }
	HandleWarn(data: { text: string }) {
		let rate_limit: string = "You are sending too much text. Wait a moment and try again";
		let rate_limit2: string = "You are being rate-limited or blocked"

		if (data.text.includes(rate_limit) || data.text.includes(rate_limit2)) {
			Warn.rlProcess();
		}
		else
			process.exit();
	}
}

export default IncomingDataHandler;