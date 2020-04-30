import WebSocket from "ws";
import Data from "../lib/Data";
import flags from "../interfaces/utility_flags";
import Command from "../interfaces/Command";
import { ICommand } from "../interfaces/UtilityManager";

class Echo extends Command {
	jargs: string;
	constructor(command: typeof ICommand, ws: WebSocket) {
		super(command, ws);
		this.ArgMgr();
		this.FlagMgr();
	}

	ArgMgr = (): void => { this.jargs = this.command.Body.Args.join(' ') }
	Process = (): void => this.Send(this.jargs);
	
	ArgsToLower = (): void => { this.jargs = this.jargs.toLowerCase(); }
	ArgsToUpper = (): void => { this.jargs = this.jargs.toUpperCase() }
	ArgsRepeat(times: number): void {
		if (this.jargs.length * times < Data.CharLimit) {
			this.jargs += ' ';
			try { this.jargs = this.jargs.repeat(times) }
			catch { this.jargs = null }
		}
	}

	flagToFunction(flag: string, arg: string): void {
		if (!flags.Echo[flag]) return;
		// don't change the order: lower or upper , not both. repeat is not related.
		if (flag === flags.Echo.l || flag === flags.Echo.lower)
			this.ArgsToLower();
		else if (flag === flags.Echo.u || flag === flags.Echo.upper)
			this.ArgsToUpper();
		if (flag === flags.Echo.r || flag === flags.Echo.repeat)
			this.ArgsRepeat(Number(arg));
	}
}

export default Echo;