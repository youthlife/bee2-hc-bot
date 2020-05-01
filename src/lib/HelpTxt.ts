import flags from "../interfaces/utility_flags";

// Description + flags + example + further deatail
const FLAGS = (u) => '\nFlags: ' + GetFlags(u);
const SYNTAX = (s: string) => '\nUsage:  \\$' + s;
const EXAMPLE = (exs: Array<string>): string => {
	let o = ''
	exs.forEach(ex => o += `\n \\> \\$${ex}`)
	return '\nExamples: ' + o;
}
const EXTRA = (ex: string) => `\nMore info: \n${ex}`;
const GetFlags = (u): string => {
	let arr: Array<string> = [];
	for (let p in u)
		arr.push(u[p]);
	return arr.join(', ');
}
const Bind = (description: string, flag?, syntax?: string, example?: Array<string>, extra?: string): string => {
	return (
		description + '.' +
		`${flag ? FLAGS(flag) : ''}` +
		`${syntax ? SYNTAX(syntax) : ''}` +
		`${example ? EXAMPLE(example) : ''}` +
		`${extra ? EXTRA(extra) : ''}`
	)
}

const HelpTxt = {
	bee:
		Bind('basic information about this bot'),
	echo:
		Bind(`Displays messages`, flags.Echo, 'echo [message: string] -u|-upper -l|-lower -r [times: number]', ['echo hello world!']),
	help:
		Bind(`Provides help information for commands`, null, 'help [command]', ['help echo']),
	astro:
		Bind(`Number of astronauts currently in space sorted by their crafts`, null, null, ['astro']),
	feat:
		Bind('Some notes and features about bee', null, null, ['feat']),
	system:
		Bind(`This tool displays info about operating system which this bot is running on`, null,
			'system [info|uptime|cpu|memory]', ['system cpu'], 'The default option is [info].'),
	ipInfo:
		Bind('Displays information about given IP address', null, 'ipInfo [ip: ip address] [geo|astro|location|currency|timezone]',
		['ipInfo 130.33.120.3', 'ipInfo 130.33.120.3 timezone'], 'The default option is [geo]'),
}

export default HelpTxt;

/* Note:
All utility programs start with small letter,
whereas all the utility program classes start with big letter.
so, in the classes, by getting the name of the class can get the
right class.
overall, it means that that this object is still case-sensitive ;
just not the first letter.
*/