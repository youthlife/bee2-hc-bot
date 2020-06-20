import Command from "../interfaces/Command";
import { creds, newFeatures } from "../config/creds";
import { ICommand } from '../interfaces/UtilityManager'

class Feat extends Command {
	constructor(cmd: typeof ICommand, ws: import('ws')) {
		super(cmd, ws);
		this.ArgMgr();
	}

	ArgMgr(): void {
		let arg = this.command.Body.Args[0]

		if (arg)
			if (arg.toLowerCase() === 'new')
				this.output = newFeatures || 'No new features!';
			else;
		else
			this.output = creds.description;
	}
}

export default Feat;