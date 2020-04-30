import { creds } from '../config/creds';

class CommandManager {
	Command = {
		UtilityProgram: String(),
		Body: {
			Args: new Array<String>(),
			Flags: [{
				name: String(),
				arg: String()
			}]
		}
	};
	private cpsp: Array<string>;
	private spCommand: Array<string>;
	private indexFlagArgs: Array<number>;
	constructor(raw_command: string) {
		this.InitCommand();
		this.cpsp = raw_command.split(' ');
		this.spCommand = raw_command.split(' ');
		this.indexFlagArgs = new Array<number>();
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
	private InitCommand(): void {
		this.Command = {
			UtilityProgram: String(),
			Body: {
				Args: new Array<String>(),
				Flags: [{
					name: String(),
					arg: String()
				}]
			}
		};
	}
	// add utility without the sign.
	private addUtility(sp: Array<string>): void {
		sp.splice(1);
		this.Command.UtilityProgram = sp[0].replace(creds.sign, '');
	}
	// NOTE: flag argument includes one argument.
	private addArgsFlags(sp: Array<string>): void {
		sp.splice(0, 1); // Delete Utility
		this.Command.Body.Flags.pop();
		for (let i = 0; i < sp.length; i++) {
			if (sp[i][0] === '-') {
				this.Command.Body.Flags.push({
					name: sp[i].replace('-', ''),
					// It might be the next flag name? (no flag args)
					arg: sp[i + 1] ? (sp[i + 1].startsWith('-') ? null : sp[i + 1]) : null
				});
				this.indexFlagArgs.push(i + 1);
			}
			// Add what's left as Args
			else// if not flag arg...
				if (this.indexFlagArgs.indexOf(i) === -1)
					this.Command.Body.Args.push(sp[i]);
		}
	}
}

export default CommandManager;