import IncomingDataHandler from "../controllers/IncomingDataHandler";
import { IChat } from "../interfaces/datahandle";
import { creds, UtilityPrograms } from "../config/creds";
import Latex from "./Latex";
import WebColors from "../lib/WebColors";

export namespace ChatValidation {
	export function ValSign(sign: string) {
		return sign.charAt(0) === creds.sign;
	}
	export function ValFlag(text: string): boolean {
		let sp: Array<string>;
		sp = text.split(' ');
		sp = sp.filter((el) => {
			return el.startsWith('-');
		});
		return new Set(sp).size === sp.length;
	}
	export function ValUtilityProgram(text: string): boolean {
		let program: string, sp: Array<string>;
		sp = text.split(' ');
		program = sp[0].replace(creds.sign, '');
		return UtilityPrograms[program] !== undefined;
	}
	export function ValTripNick(data: IChat): boolean {
		return data.nick !== creds.nick && data.trip !== creds.trip;
	}
	export function ValCommand(IDH: IncomingDataHandler, data: IChat): boolean {
		if (ValSign(data.text))
			if (ValUtilityProgram(data.text))
				if (ValFlag(data.text))
					return true;
				else {
					IDH.ws.send(JSON.stringify({
						cmd: 'chat',
						text: Latex.Compile(
							`Don't use duplicate flags!`,
							WebColors.MediumVioletRed,
							true
						)
					}));
					return false;
				}
			else
				return false;
		else
			return false;
	}
}