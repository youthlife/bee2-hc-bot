namespace API {
	export const url = 'https://restcountries.eu/rest/v2/name/';

	export enum modes { general, translation, language, currency, code }

	export interface IAPI {
		url: string,
		mode: API.modes,
		colon: string,
		EncodeUri(uri): string,
		HandleRes(res: Array<object>): void,
		GuessRes(res: Array<object>): void,
		GeneralRes(res: object): void,
		Language(res: object): void,
		Currency(res: object): void,
		Translation(res: object): void,
	}

	export const SpecialResponses = ['currencies', 'translations', 'languages'];

	// if more than one array element:
	export interface Guess {
		name: string
	}
	// if only one array element
	export interface Res {
		name: string,
		topLevelDomain: Array<string>,
		alpha2Code: string,
		alpha3Code: string,
		callingCodes: Array<string>,
		capital: string,
		altSpellings: Array<string>,
		region: string,
		subregion: string,
		population: string,
		demonym: string,
		area: string,
		nativeName: string,
		numericCode: string,
		flag: string
	}
}

export default API;