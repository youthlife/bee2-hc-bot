import isIP from 'is-ip';
import WebSocket from "ws";
import API from "../API/ipinfo";
import Command from "../interfaces/Command";
import { getjson } from "../JS_Exports";
import { ICommand } from "../interfaces/UtilityManager";
import { isUndefined } from "util";
import HelpTxt from '../lib/HelpTxt';
import Latex from '../tools/Latex';
import WebColors from '../lib/WebColors';

class IpInfo extends Command implements API.IAPI {
	IP: string;
	url: string;
	mode: API.modes;
	colon: string;
	constructor(cmd: typeof ICommand, ws: WebSocket) {
		super(cmd, ws);
		this.output = '';
		this.colon = Latex.Compile(':', WebColors.LightCoral);
		this.ArgMgr();
	}

	// example: [ip] [option] or [ip]
	ArgMgr() {
		let arg1 = this.command.Body.Args[0],
			arg2 = this.command.Body.Args[1],
			isip1 = arg1 ? isIP(arg1) : null;

		this.IP = arg1;

		if (arg1)
			if (isip1)
				if (arg2)
					if (isUndefined(API.modes[arg2]))
						this.Send(`Invalid option "${arg2}"!`);
					else
						this.mode = API.modes[arg2];
				else
					this.mode = API.modes.geo; // default mode
			else
				this.Send(`Invalid ip address "${arg1}"!`);
		else
			this.Send(HelpTxt.ipInfo);
	}
	Process() {
		if (isUndefined(this.mode)) return;
		this.CreateUrl();
		getjson(this.url)
			.then(res => {
				this.HandleRes(res)
				this.Send(this.output);
			})
			.catch(err => this.Send(err))
	}

	CreateUrl() {
		const urler = (mode: string):
			string => API.url.base + mode + '?' + API.url.key + "&ip=" + this.IP;
		switch (this.mode) {
			case API.modes.geo:
			case API.modes.currency:
				this.url = urler(API.url.modes.geo);
				break;
			case API.modes.astro:
			case API.modes.location:
				this.url = urler(API.url.modes.astro)
				break;
			case API.modes.timezone:
				this.url = urler(API.url.modes.timezone)
				break;
		}
	}
	HandleRes(res) {
		switch (this.mode) {
			case API.modes.location:
				this.LocationRes(res);
				break;
			case API.modes.currency:
				this.CurrencyRes(res);
				break;
			default:
				this.DefaultRes(res);
				break;
		}
	}
	DefaultRes(res) {
		let f: string;
		for (let k in res) {
			if (typeof res[k] == "string" && !API.locationSame.includes(k))
				if (res[k]) {
					f = k.charAt(0).toUpperCase() + k.slice(1);
					this.output += `${f.replace('_', ' ')} ${this.colon} ${res[k]}\n`;
				}
		}
	}
	CurrencyRes(res) {
		let f: string;
		for (let k in res)
			if (typeof res[k] == 'object' && k == 'currency')
				for (let i in res[k])
					if (res[k][i]) {
						f = i.charAt(0).toUpperCase() + i.slice(1);
						this.output += `${f.replace('_', ' ')} ${this.colon} ${res[k][i]}\n`;
					}
	}
	LocationRes(res) {
		let f: string;
		for (let k in res)
			if (typeof res[k] == 'object')
				for (let i in res[k])
					if (res[k][i]) {
						f = i.charAt(0).toUpperCase() + i.slice(1);
						this.output += `${f.replace('_', ' ')} ${this.colon} ${(res[k])[i]}\n`;
					}
	}
}

export default IpInfo;