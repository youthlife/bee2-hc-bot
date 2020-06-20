import WebSocket from 'ws';
import Latex from '../tools/Latex';
import Command from '../interfaces/Command';
import WebColors from '../lib/WebColors';

import { getjson } from "../JS_Exports";
import { ICommand } from '../interfaces/UtilityManager';
import API from '../API/Astro';


class Astro extends Command implements API.IAPI {
	constructor(command: typeof ICommand, ws: WebSocket) { super(command, ws); }

	Process(): void {
		getjson(API.url.base, (error, res: API.IJsonBone) => {
			if (!error)
				if (res.message.includes('success'))
					this.HandleRes(res);
				else
					this.output = `Response failure.`;
			else
				this.output = `Error: ${error}`;

			this.Send(this.output);
		});
	}

	private SortPeople(people): object {
		let sortedPeople = {};
		for (let k of people) {
			if (!sortedPeople[k.craft])
				sortedPeople[k.craft] = [];
			sortedPeople[k.craft].push(k.name);
		}
		return sortedPeople;
	}

	HandleRes(res: API.IJsonBone): void {
		let sortedPeople = this.SortPeople(res.people);

		this.output += `${Latex.Compile(res.number.toString(), WebColors.AliceBlue, true)} Astronauts are currently in space`;
		for (let craft in sortedPeople) {
			this.output += `\nCraft: ${craft}`;
			for (let astronaut of sortedPeople[craft])
				this.output += `\n \\* ${astronaut}`;
		}
	}
}

export default Astro;