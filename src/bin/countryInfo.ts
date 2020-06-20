import API from "../API/countryInfo";
import Latex from "../tools/Latex";
import Command from "../interfaces/Command";
import WebColors from "../lib/WebColors";
import WebSocket from "ws";
import { isUndefined, isObject } from "util";
import { getjson } from "../JS_Exports";
import { IUtility, ICommand } from "../interfaces/UtilityManager";
import HelpTxt from "../lib/HelpTxt";
import flags from "../interfaces/utility_flags";
import { Head } from "../tools/string";

class CountryInfo extends Command implements API.IAPI {
	url: string;
	mode: API.modes;
	colon: string;
	comma: string;
	catch: boolean;
	catchIndex: number;
	countryName: string;
	static MAX_GUESS = 15; // May dev: user can choose a higher or lower number.

	constructor(cmd: typeof ICommand, ws: WebSocket) {
		super(cmd, ws);
		this.output = '';
		this.catch = false;
		this.colon = Latex.Compile(':', WebColors.LightCoral)
		this.comma = Latex.Compile(',', WebColors.LightCoral)
		this.ArgMgr();
		this.FlagMgr();
	}

	ArgMgr(): void {
		let arg = this.command.Body.Args.join(' ');

		if (arg)
			this.countryName = arg;
		else
			this.Send(HelpTxt.countryInfo);
	}

	FlagMgr(): void {
		let flg1 = this.command.Body.Flags[0];
		let flg2 = this.command.Body.Flags[1];
		let a1 = flg1 ? flg1.arg : null;
		let a2 = flg2 ? flg2.arg : null;
		let f1 = flg1 ? flg1.name : null;
		let f2 = flg2 ? flg2.name : null;

		let na1 = Number(a1), na2 = Number(a2);

		// Force
		this.catch =
			f1 == flags.countryInfo.i || f1 == flags.countryInfo.index ||
			f2 == flags.countryInfo.i || f2 == flags.countryInfo.index;

		if (na1)
			this.catchIndex = na1;
		else if (na2)
			this.catchIndex = na2;
		else
			this.catch = false;

		// Modes
		if (f1)
			if (API.modes[f1])
				this.mode = API.modes[f1];
			else;
		if (f2)
			if (API.modes[f2])
				this.mode = API.modes[f2];
			else;
		if (!this.mode)
			this.mode = API.modes.general;// default
	}

	Process(): void {
		if (isUndefined(this.countryName) || isUndefined(this.mode)) return;
		this.url = API.url + this.EncodeUri(this.countryName);
		getjson(this.url)
			.then((res) => {
				this.HandleRes(res);
				this.Send(this.output);
			})
			.catch((e: String) => this.Send(e))
	}

	EncodeUri = (uri: string): string => encodeURIComponent(uri);

	Switcher(res: Array<object>, i: number): void {
		if (i <= res.length && i >= 0)
			switch (this.mode) {
				case API.modes.general:
					this.GeneralRes(res[i]);
					break;
				case API.modes.code:
					this.Code(res[i]);
				case API.modes.language:
					this.Language(res[i]);
					break;
				case API.modes.currency:
					this.Currency(res[i]);
					break;
				case API.modes.translation:
					this.Translation(res[i]);
					break;
			}
		else
			this.output = `Index out of range, must be between 0 and ${res.length}.`;
	}

	HandleRes(res: Array<object>): void {
		if (res.length > 1 && !this.catch) // if no index and there's more than one country found.
			this.GuessRes(res);
		else if (res.length > 1 && this.catch) // if there's more than one country found and there's an index.
			this.Switcher(res, this.catchIndex - 1);
		else if (res.length == 1) // if there's only one country found.
			this.Switcher(res, 0);
		else
			this.output = 'Nothing found';
	}

	GuessRes(res: Array<object>): void {
		let countries: Array<string> = [];
		for (let g = 0; g < res.length; g++)
			countries.push(`(${Latex.Compile((g + 1).toString(), WebColors.LightCoral)}) ${res[g]['name']}`);
		this.output = `I couldn't find the country you were looking for, is it on this list ?\n`;
		this.output += countries.slice(0, CountryInfo.MAX_GUESS).join(' ') + Latex.Compile('.', WebColors.LightCoral);
	}

	GeneralRes(res: object): void {
		for (let k in res)
			if (!API.SpecialResponses.includes(k) && res[k]) {
				this.output += `${k} ${this.colon} `;
				if (isObject(res[k])) {
					let arr = [];
					for (let i in res[k])
						arr.push(res[k][i]);
					this.output += ' ' + arr.join(this.comma + ' ') + '\n';
				}
				else
					this.output += res[k] + '\n';
			}
	}

	Code(res: object): void {
		for (let k in res) {
			this.output += `Country name ${this.colon} ` + res[k]['name'];
			this.output += `Country code ISO2 ${this.colon} ` + res[k]['alpha2Code'];
			this.output += `Country code ISO3 ${this.colon} ` + res[k]['alpha3Code'];
		}
	}

	// curr and lang are in array, unlike trans.
	Currency(res: object): void {
		for (let k in res)
			if (k == 'currencies')
				if (API.SpecialResponses.includes(k) && res[k])
					if (isObject(res[k]))
						for (let i in res[k]) {
							for (let a in res[k][i])
								if (res[k][i][a])
									this.output += `${a} ${this.colon} ${res[k][i][a]}\n`;
							this.output += '\\-'.repeat(10) + '\n';
						}
		this.output = Head(this.output.toString(), 20);
	}

	Language(res: object): void {
		for (let k in res)
			if (k == 'languages')
				if (API.SpecialResponses.includes(k) && res[k])
					if (isObject(res[k]))
						for (let i in res[k]) {
							for (let a in res[k][i])
								if (res[k][i][a])
									this.output += `${a} ${this.colon} ${res[k][i][a]}\n`;
							this.output += '\\-'.repeat(10) + '\n';
						}
		this.output = Head(this.output.toString(), 20);
	}

	Translation(res: object): void {
		for (let k in res)
			if (k == 'translations')
				if (API.SpecialResponses.includes(k) && res[k])
					if (isObject(res[k]))
						for (let i in res[k])
							if (res[k][i])
								this.output += `${i} ${this.colon} ${res[k][i]}\n`;
	}
}

export default CountryInfo;