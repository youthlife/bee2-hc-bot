import flags from "../interfaces/utility_flags";
import CountryInfo from "../bin/countryInfo";
import Latex from "../tools/Latex";
import WebColors from "./WebColors";

// Description + flags + example + further deatail
const FLAGS = u => '\nFlags: ' + GetFlags(u);
const EXTRA = (ex): string => `\nMore info: \n${ex}.`;
const SYNTAX = (s: string) => '\nUsage:  \\$' + s;
const EXAMPLE = (exs: Array<string>): string => {
	let o = ''
	exs.forEach(ex => o += `\n \\> \\$${ex}`)
	return '\nExamples: ' + o;
}

const GetFlags = (u): string => {
	let arr: Array<string> = [];
	for (let p in u)
		arr.push(u[p]);
	return arr.join(', ');
}
const Bind = (description: string, flag?, syntax?: string, example?: Array<string>, extra?: string): string =>
	description + '.' +
	`${flag ? FLAGS(flag) : ''}` +
	`${syntax ? SYNTAX(syntax) : ''}` +
	`${example ? EXAMPLE(example) : ''}` +
	`${extra ? EXTRA(extra) : ''}`;

const colon = Latex.Compile(':', WebColors.LightCoral);
const HelpTxt = {
	bee:
		Bind('basic information about this bot'),
	echo:
		Bind(`Displays messages`, flags.Echo, 'echo *{message: string} [-u|upper] [-l|lower] [-r *{times: number}]',
			['echo hello world!']),
	help:
		Bind(`Provides help information for utility programs (commands)`, null, 
			'help {command}', ['help echo'],
			`Syntax signs:\n` +
			`[] ${colon} a container for the exact flag or option of a command.\n` +
			`{} ${colon} a container which has the hint for arg (or perhaps flag).\n` +
			`: ${colon} type of an option or arg comes after it. e.g. in here, message is a string type: {message: string}\n` +
			`| ${colon} OR operator, used for showing various/similar options or flags.\n` +
			`\\- ${colon} comes before a flag. for example 'l' and 'lower' are the same (-l OR -lower): -l|lower.\n` +
			`\\* ${colon} the option, flag or arg which comes after it, is required.` +
			`Note that {} is also used as flag's arg which is usually required, example: [-t *{seconds}]`),
	astro:
		Bind(`Number of astronauts currently in space sorted by their crafts`, null, null, ['astro']),
	feat:
		Bind('Some notes and features about bee', null, 'feat [new]', ['feat']),
	system:
		Bind(`This tool displays info about operating system which this bot is running on`, null,
			'system [info|uptime|cpu|memory]', ['system cpu'], 'The default option is info'),
	ipInfo:
		Bind('Displays information about given IP address', null, 'ipInfo [ip: ip address] [geo|astro|location|currency|timezone]',
			['ipInfo 130.33.120.3', 'ipInfo 130.33.120.3 timezone'], 'The default option is geo'),
	countryInfo:
		Bind('Gives information about the given country', null,
			'countryInfo *[country: string] [-general|translation|language|currency|code] [-i|index [integer]]',
			['countryInfo Iraq', 'countryInfo Iraq -language -index 1'],
			`The default option is general and Maximum number of guesses is ${CountryInfo.MAX_GUESS} countries (to avoid spam)`)
}

export default HelpTxt;

/* Note:
All utility programs start with small letter, whereas all the utility program classes start with big letter.
so, in the classes, by getting the name of the class can get the right class.
overall, this means that this object is still case-sensitive except for the first letter.
*/