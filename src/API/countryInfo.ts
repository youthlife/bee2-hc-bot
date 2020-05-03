/*
	Res that i need
    {
        "name": "Bonaire, Sint Eustatius and Saba",
        "topLevelDomain": [".an",".nl"],
        "alpha2Code": "BQ",
        "alpha3Code": "BES",
        "callingCodes": [ "5997" ],
        "capital": "Kralendijk",
        "altSpellings": [ "BQ", "Boneiru" ],
        "region": "Americas",
        "subregion": "Caribbean",
        "population": 17408,
        "demonym": "Dutch",
        "area": 294,
        "nativeName": "Bonaire",
        "numericCode": "535",
        "currencies": [
            {
                "code": "USD",
                "name": "United States dollar",
                "symbol": "$"
            }
        ],
        "languages": [
            {
                "iso639_1": "nl",
                "iso639_2": "nld",
                "name": "Dutch",
                "nativeName": "Nederlands"
            }
        ],
        "translations": {
            "de": "Bonaire, Sint Eustatius und Saba",
            "es": null,
            "fr": "Bonaire, Saint-Eustache et Saba",
            "ja": null,
            "it": "Bonaire, Saint-Eustache e Saba",
            "br": "Bonaire",
            "pt": "Bonaire",
            "nl": null,
            "hr": null,
            "fa": "بونیر"
        },
        "flag": "https://restcountries.eu/data/bes.svg",
	}
*/

namespace API {
	export const url = 'https://restcountries.eu/rest/v2/name/';

	export enum modes { general, translation, language, currency }

	export interface IAPI {
		url: string,
		mode: API.modes,
		colon: string,
		EncodeUri(uri),
		HandleRes(res: Array<object>),
		GuessRes(res: Array<object>),
		GeneralRes(res: object),
		Language(res: object),
		Currency(res: object),
		Translation(res: object),
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