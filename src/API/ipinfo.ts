import keys from "../config/keys";

namespace API {
	export const url = {
		key: 'apiKey=' + keys.api_key.ipinfo,
		base: `https://api.ipgeolocation.io/`,
		modes: {
			geo: 'ipgeo',
			astro: 'astronomy',
			timezone: 'timezone'
		}
	}
	export interface IAPI {
		CreateUrl(),
		HandleRes(res),
		DefaultRes(res),
		CurrencyRes(res),
		LocationRes(res),
	}
	export enum modes {
		geo,
		astro,
		timezone,
		// inside geo => currency
		currency,
		// inside astro => if object = this one
		location
	}

	export const locationSame = [
		'city',
		'zipcode',
		'latitude',
		'district',
		'longitude',
		'state_prov',
		'country_name',
		'country_code2',
		'country_code3'
	]
}

export default API;