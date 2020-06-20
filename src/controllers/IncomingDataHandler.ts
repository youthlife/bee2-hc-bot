import Warn from '../tools/Warn';
import WebSocket = require('ws');
import CommandManager from './CommandManager';
import {
	IChat,
	IJoin,
	ILeave,
	IEmote,
	IWhisper
}
	from '../interfaces/datahandle';
import { ChatValidation } from '../tools/chat';
import { UtilityPrograms, creds } from '../config/creds';
import { IUtility } from '../interfaces/UtilityManager';

class IncomingDataHandler {
	ws: WebSocket;
	joined: Boolean;
	utilityProgram: IUtility;
	commandManager: CommandManager;
	constructor(ws: WebSocket) {
		this.ws = ws;
		this.joined = false;
	}

	InitializeLogin(): void {
		this.joined = true;

		if (creds.trip)
			this.ws.send(JSON.stringify({ cmd: 'chat', text: '/color ffff00' }));	
	}

	HandleChat(data: IChat): void {
		if (ChatValidation.ValCommand(this, data)) {
			this.commandManager = new CommandManager(data.text);
			this.utilityProgram = new UtilityPrograms[this.commandManager.Command.UtilityProgram]
				(this.commandManager.Command, this.ws);
			this.utilityProgram.Process();
		}
	}

	HandleJoin(data: IJoin): void {
		
	}

	HandleLeave(data: ILeave): void { }

	HandleEmote(data: IWhisper): void { }

	HandleWhisper(data: IEmote): void { }

	HandleWarn(data: { text: string }) {
		let rate_limit: string = "You are sending too much text. Wait a moment and try again";
		let rate_limit2: string = "You are being rate-limited or blocked"

		if (data.text.includes(rate_limit) || data.text.includes(rate_limit2)) {
			Warn.rlProcess();
		}
		else if (data.text.toLowerCase().includes('auth'))
			console.log('Trip not registered!');
		else
			process.exit();
	}
}

export default IncomingDataHandler;