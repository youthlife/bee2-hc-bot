import Command from "../interfaces/Command";
import { creds } from "../config/creds";

class Bee extends Command {
	Process() {
		this.output =
			`name: ${creds.name}\n` +
			`author: ${creds.author}\n` +
			`sign (trigger): ${creds.sign}\n`+
			`version: ${creds.version}\n`+ 
			`copyright: ${creds.copyRight}`

		this.Send(this.output);
	}
}

export default Bee;