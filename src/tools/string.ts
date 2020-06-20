/**
 * @description works like linux `head` command.
 * @param str whole string with multiple lines
 * @param line number of lines
 * @returns string or null if correct line number or wrong
 */
export function Head(str: string, line: number): string | null {
	let s, ll, a;
	a = []
	ll = line - 1;
	s = str.split('\n');

	if (ll <= s.length) {
		for (let i = 0; i < line; i++) a.push(s[i]);
		let output = a.join('\n');
		return output;
	}
	else return null;
}