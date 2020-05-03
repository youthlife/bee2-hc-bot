export function Line(str: string, line: number) {
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