import WebSocket from "ws";
import { ICommand, IUtility } from "./UtilityManager";

class Command implements IUtility {
	ws: WebSocket;
	output: String;
	command: typeof ICommand;
	constructor(command: typeof ICommand, ws: WebSocket) {
		this.ws = ws;
		this.output = new String();
		this.command = command;
	}
	protected ArgMgr() { }
	protected FlagMgr() {
		this.command.Body.Flags.forEach(flag => {
			if (flag.name)
				this.flagToFunction(flag.name, flag.arg);
		});
	}
	protected flagToFunction(flag: string, arg: string): void { }
	public Process() {
		this.Send(this.output);
	}
	protected Send(txt: String) {
		let output = txt ? txt.toString() : null;
		this.ws.send(JSON.stringify({
			cmd: 'chat',
			text: output ? output : "I don't feel like chatting."
		}));
	}
}

export default Command;