import Command from "../interfaces/Command";
import WebSocket from "ws";
import API from "../API/ipinfo";
import { getjson } from "../JS_Exports";
import { ICommand } from "../interfaces/UtilityManager";

class IpInfo extends Command implements API.IAPI {
	url: string;
	constructor(cmd: typeof ICommand, ws: WebSocket) {
		super(cmd, ws);
	}

	Process() {
		this.CreateUrl();
		getjson(this.url, (error, res) => {
			if (!error) {
				this.output = '';
				for (let k in res)
					this.output += k + ': ' + res[k];
				this.Send(this.output);
			}
		})
	}

	CreateUrl() {
		this.url = API.url.base + API.url.modes.ipgeo + '?' + API.url.key;
	}
	HandleRes(res) { }
}

export default IpInfo;