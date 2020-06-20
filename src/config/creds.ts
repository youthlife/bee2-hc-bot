import Bee from '../bin/bee'
import Feat from '../bin/feat'
import Help from '../bin/help'
import Echo from '../bin/echo'
import Astro from '../bin/astro'
import System from '../bin/system'
import IpInfo from '../bin/ipinfo'
import CountryInfo from '../bin/countryInfo';
import key from './keys'


export const UtilityPrograms = {
	bee: Bee,
	echo: Echo,
	help: Help,
	feat: Feat,
	astro: Astro,
	system: System,
	ipInfo: IpInfo,
	countryInfo: CountryInfo,
}

const starify = (arr: Array<string>, dot: boolean = true): string => {
	let output: string = '';
	arr.forEach(sentence => output += '\\* ' + sentence + (dot ? '.' : '') + '\n');
	return output;
}

export const creds = {
	sign: '$',
	name: 'Bee',
	nick: 'Bee',
	trip: key.trip, // keys.trip
	channel: keys.channel,
	join: () => creds.nick + (creds.trip ? '#' + creds.trip : ''),
	author: 'ltp',
	version: '2',
	copyRight: '(c) 2018-2020',
	repo: "https://github.com/youthlife/bee2-hc-bot",
	bugs: "https://github.com/youthlife/bee2-hc-bot/issues",
	description:
		starify([
			'commands are case-sensitive',
			'all flags come after a single hyphen (-)',
			'commands are unique. meaning: there are no aliases (yet)',
			'arguments are recognized before and after each flag',
			'the vertical bar (|) is used to seperate items e.g. between arguments',
			'on help command, only arguments and flags which have a (*) sign before them are required'
		])
}

export const newFeatures: string = starify([
	`fixed and improved help`,
	`improved documentation on github readme`,
	`code flag option added to countryInfo command`,
	`help command's help defines each sign used by it`
])

export const UtilityNames = (): Array<string> => {
	let arr: Array<string> = [];
	for (let k in UtilityPrograms)
		arr.push(k.toString());
	return arr;
}
