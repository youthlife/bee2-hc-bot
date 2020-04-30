import api_key from "../config/api_keys";

namespace API {
	export const url = {
		key: 'apiKey=' + api_key.ipinfo,
		base: `https://api.ipgeolocation.io/`,
		modes: {
			ipgeo: 'ipgeo',
			timezone: 'timezone',
			astronomy: 'astronomy',
		}
	}

	export interface IAPI {
		CreateUrl(),
		HandleRes(res),
	}
}

export default API;