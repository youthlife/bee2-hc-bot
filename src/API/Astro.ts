namespace API {
	export const url = { base: 'http://api.open-notify.org/astros.json' };

	export interface IJsonBone {
		people: [{ craft: string, name: string, }],
		message: string,
		number: number
	}

	export interface IAPI {
		HandleRes(res: IJsonBone): void;
	}
}

export default API;