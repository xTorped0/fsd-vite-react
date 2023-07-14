const api_hostname = process.env.REACT_APP_API_URL;
const api_url = `http://${api_hostname}`;
//
const prostird_api_url = api_url;

const config = {
	inDevelopment: true, // defaults to false
	//
	network: {
		useOriginHostname: false, // defaults to `false` - substitute hostnames of all URLs by client origin's hostname
		//
		api_url,
		auth_topic: 'users/login', // Relative to the api_url's path
		//
		prostird_api_url, // (!) We still need a single API gateway!
		//
		mqtt: {
			host: api_hostname,
			port: process.env.REACT_APP_MQTT_PORT, //  19002 is a qa and 19003 is a dev
			useSSL: false, // defaults to `false`
			consoleLog: false, // defaults to `false`
			log: false // defaults to `false`
		}
	},
};

Object.freeze(config);
export { config };

window.config = config;