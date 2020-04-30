import WebColors from "../lib/WebColors";
import { ishexc } from "../JS_Exports";

namespace Latex {
	export const latexSize = {
		tiny: '\\tiny',
		huge: `\\huge`,
		small: `\\small`,
	}
	const mdsize = {
		h1: "#",
		h2: "##",
		h3: "###",
		h4: "####",
		h5: "#####",
		h6: "######"
	}
	export function ReSize(text: string, size: number): string {
		if (size > 0 && size < 7)
			return mdsize[`h${size}`] + ' ' + text;
	}
	export function IsColor(color: string) {
		let xcolor: string = color.startsWith('#') ? color : '#' + color;

		return WebColors[color] || ishexc(xcolor);
	}
	export function Compile(text: string,
		color: string = null,
		useText: boolean = false,
		size: string = null
	): string {
		let output: string = '$';

		if (useText)
			output += "\\text"
		if (size)
			output += size
		if (color)
			output += "\\color{" + color + "}";

		return output + "{" + text + "}" + '$';
	}
}

export default Latex;