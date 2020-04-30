import WebSocket from "ws";
import Command from "../interfaces/Command";
import { UtilityPrograms, UtilityNames, creds } from "../config/creds";
import HelpTxt from "../lib/HelpTxt";
import { ICommand } from "../interfaces/UtilityManager";

// Help also has help! it's a utility program afterall.
class Help extends Command {
	prgrm: string;
	IsPrgrm: Command;
	helpText: string;
	constructor(command: typeof ICommand, ws: WebSocket) {
		super(command, ws);
		this.ArgMgr();
	}

	ArgMgr = () => this.prgrm = this.command.Body.Args[0];
	Process() {
		this.helpText = HelpTxt[this.prgrm];
		this.IsPrgrm = UtilityPrograms[this.prgrm];

		if (this.IsPrgrm)
			if (this.helpText)
				this.Send(this.helpText);
			else
				this.Send(`No help is available for this command (yet).`);
		else
			this.General();
	}
	General() {
		let output = '';
		output += 'Commands: \n';
		output += UtilityNames().join(' . ') + '.\n';
		output += 'for more info run: $feat';
		this.Send(output);
	}
}

export default Help;