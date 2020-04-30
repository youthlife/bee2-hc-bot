import Command from "../interfaces/Command";
import { creds } from "../config/creds";

class Bee extends Command {
	Process() {
		this.output =
			`name: ${creds.name}\n` +
			`sign: ${creds.sign}\n`+
			`author: ${creds.author}\n` +
			`version: ${creds.version}\n`+ 
			`copyright: ${creds.copyRight}\n`+
			`repository: ${creds.repo}\n`+
			`reporting bugs: ${creds.bugs}`

		this.Send(this.output);
	}
}

export default Bee;