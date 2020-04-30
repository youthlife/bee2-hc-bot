import Command from "../interfaces/Command";
import { ICommand } from "../interfaces/UtilityManager";
import WebSocket from "ws";

class System extends Command {
	val: string;
	constructor(command: typeof ICommand, ws: WebSocket) {
		super(command, ws);
		this.ArgMgr();
	}

	ArgMgr() { this.val = this.command.Body.Args[0] }
	Process() {
		if (this.val)
			switch (this.val.toLowerCase()) {
				case 'cpu':
					this.Cpu();
					break;
				case 'info':
					this.Info();
					break;
				case 'uptime':
					this.Uptime();
					break;
				case 'memory':
					this.Memory();
					break;
				default:
					this.output = 
					'Invalid argument\ntry reading help on this command by running: ```$help system```';
					break;
			}
		else
			this.Info();

		this.Send(this.output);
	}

	Cpu() {
		let usg = process.cpuUsage();
		this.output =
			`< Cpu Usage > \n` +
			`User: ${usg.user}\n` +
			`System: ${usg.system}`;
	}
	Info() {
		this.output =
			`< System Info > \n` +
			`Arch: ${process.arch}` + '\n' +
			`Platform: ${process.platform}` + '\n' +
			`Number of processors: ${process.env['NUMBER_OF_PROCESSORS']}` + '\n' +
			`Processor level: ${process.env['PROCESSOR_LEVEL']}` + '\n' +
			`Processor architecture: ${process.env['PROCESSOR_ARCHITECTURE']}` + '\n' +
			`Processor identifier: ${process.env['PROCESSOR_IDENTIFIER']}`;
	}
	Uptime() { this.output = `bot uptime: ${process.uptime()}` }
	Memory() {
		let mem = process.memoryUsage();
		this.output =
			`< Memory Usage > \n` +
			`External: ${mem.external}\n` +
			`Heap Used: ${mem.heapUsed}\n` +
			`Heap Total: ${mem.heapTotal}\n` +
			`RSS (Resident Set Size): ${mem.rss}\n`;
	}
}

export default System;