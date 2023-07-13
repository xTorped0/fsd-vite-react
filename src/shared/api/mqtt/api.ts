/*

(i)(!) WARNING: Topics with placeholders and wildcards are not supported

*/

//// IMPORT
// PAHO API: https://www.eclipse.org/paho/files/jsdoc/index.html


// import  IPaho  from 'paho-mqtt';
import { PahoClient, PahoMessage } from './paho-mqtt';
// import type TPahoMQTT from 'paho-mqtt/index';
import type { TListener, TChecker } from '../types';
//
// TYPES


//// VARIABLES
// const MODULE_NAME = 'network-mqtt';
// let mqtt_host, mqtt_port, broker_id;
// const root_topic = 'local'; // ['local']
const sub_topic_root = 'local', pub_topic_root = 'remote';
// , PahoMQTT = Paho.MQTT;
const checkers: TChecker[] = [];
let hashListeners: TListener[] = [];
let listeners: Record<string, TListener[]> = {}; // = null
let client_id: string = String( Date.now() );;
let pahoClient: Paho.MQTT.Client | null = null;
let console_log = false;


//// MQTT
const MQTT = {
	//// [ getters/setters ]
	get connected(): boolean { return isConnected(); },
	// get client() { return pahoClient; },
	get consoleLog(): boolean { return console_log; },
	set consoleLog(value: boolean) {
		console.warn(`[NETWORK][MQTT] Deprecated setter. Please, use setConsoleLog(:boolean = true) instead.`);
	},
	//// [ methods ]
	// start, stop,
	subscribe,
	unsubscribe,
	publish,
	onConnection,
	setConsoleLog,
	//
	//
	onconnect: onConnection,
	subscriptions(): string[] { return Object.keys(listeners); },
	//
	//
	_fakeIncomingMessage(topic: string, payload: any = {}) {
		const payloadStr = JSON.stringify(payload);
		notify(topic, payloadStr);
	},
};


//// BODY
Object.freeze(MQTT);


//// EXPORTED METHODS

// START
function start(host: string, port: number, useSSL=false, brokerId?: any, consoleLog?: boolean) {
	// if(!brokerId) { console.error(`[NETWORK.MQTT] Error: Cannot start without broker id`); return; }
	// [ variables ]
	console_log = consoleLog || false;
	// client_id = Network.auth.data.card._id + "-" + Date.now(); // Math.random() * 1000
	client_id = String( Date.now() );
	// root_topic = 'client/' + brokerId;
	// [ client set-up ]
	pahoClient = new PahoClient(host, Number(port), client_id);
	if(pahoClient){
		// errors
	pahoClient.onConnectionLost = function(responseObject) {
		// if(event.errorCode && event.errorCode < 18) {
		//	 console.error("MQTT: ERROR EVENT", event.errorMessage);
		//	 checkers.forEach(checker => { checker(false); });
		// }
		// else { console.error("MQTT: ERROR EVENT", event) };
		// if(disconnected via stop)
		console.warn("[NETWORK.MQTT] CONNECTION LOST. ERROR CODE:", responseObject.errorCode, "MESSAGE:", responseObject.errorMessage);
		informCheckers(false);
	};
	// messages
	pahoClient.onMessageArrived = function(message) {
		// let data;
		// if(message.payloadString)
		//	 try { data = JSON.parse(message.payloadString); }
		//	 catch(error) { data = null; console.error("[NETWORK.MQTT] COULDN'T PARSE EVENT.DATA", message); }
		// else data = null;
		let payload = message.payloadString;
		// [ logging ]
		const topic = message.destinationName;
		if(console_log) console.debug(`[NETWORK.MQTT] Message on topic '${topic}' with payload:`, payload);
		// [ notifying ]
		const topicStr = topic.substring(sub_topic_root.length + 1);
		notify(topicStr, payload);
	};
	// connect
	pahoClient.connect({
		onSuccess: function() {
			pahoClient?.subscribe(sub_topic_root + '/#');
			console.info(`[NETWORK.MQTT] CONNECTED`); // TODO: may wanna provide connection details
			informCheckers(true);
		},
		// @ts-expect-error
		reconnect: true,
		// reconnectInterval: 5,
		// userName: ,
		// password: ,
		useSSL
	});
	}
	
}

// STOP
function stop() {
	if(pahoClient) {
		pahoClient.disconnect();
		pahoClient = null;
	}
	// listeners = null;
	hashListeners = [], listeners = {};
}

// SUBSCRIPTIONS

/**
*	@arg topicStr :String
*	@arg listener :function(payload, tail) {
*		@arg payload :String
*		@arg tail :String - Remaining tail of the topic
*		** Example **
*		Say, `topicStr === 'piece1/piece2'`. Then, if message arrives on topic 'piece1/piece2/piece3', `tail === 'piece3'`
*	}
*/
function subscribe(topicStr: string, listener: TListener) {
	// if(!topicStr) { console.warn(`[NETWORK.MQTT] Couldn't subscribe to an empty topic`); return; }
	const topic = topicStr; // ? `${root_topic}/${topicStr}` : root_topic;
	//
	if(topicStr && topicStr !== '#') {
		if(!listeners[topic]) listeners[topic] = [];
		listeners[topic].push(listener);
	}
	else hashListeners.push(listener);
	//
	if(!pahoClient) console.warn(`[NETWORK.MQTT] Subscribed to the topic '${topicStr}'. But no connection is expected`);
}

/**
*	@arg topicStr: :String - Consider dropping this argument
*	@arg listener: :Function
*	? @return result :Boolean || :Integer - to indicate the outcome of unsubscribing
*/
function unsubscribe(topicStr: string | null, listener: TListener) {
	const topic = topicStr; // ? `${root_topic}/${topicStr}` : root_topic;
	//
	if(!topicStr || topicStr === '#') {
		const i = hashListeners.indexOf(listener);
		if(i > -1) hashListeners.splice(i, 1);
	}
	else if(topic && listeners[topic]) {
		const i = listeners[topic].indexOf(listener);
		if(i > -1) listeners[topic].splice(i, 1);
	}
	else console.warn(`[NETWORK.MQTT] Couldn't unsubscribe from '${topicStr}' listener`, listener);
}

/**
*	@arg topicStr: :String
*	@arg msgStr: :String
*/
function publish(topicStr: string, msgStr: string):boolean {
	if(isConnected() && pahoClient) {
		const topic = pub_topic_root + '/' + topicStr;
		const pahoMsg = new PahoMessage(msgStr);
		pahoMsg.destinationName = topic;
		pahoClient.send(pahoMsg);
		if(console_log) console.debug(`[NETWORK.MQTT] Published to topic '${topic}' with data:`, msgStr);
		return true;
	}
	// if(console_log)
	console.warn(`[NETWORK.MQTT] Couldn't publish without connection`);
	return false;
}

/**
*	@arg checker: :Function
*	@arg removeChecker: :Boolean
*/
function onConnection(checker: TChecker, removeChecker=false) {
	if(removeChecker) {
		const i = checkers.indexOf(checker);
		if(i > -1) checkers.splice(i, 1);
	}
	else if(!checkers.includes(checker)) checkers.push(checker);
	else console.warn(`[NETWORK.MQTT] Couldn't add connection checker`);
}

function setConsoleLog(toSet=true) {
	if(!!toSet === !!console_log) return;
	else if(toSet) { console_log = true; console.debug("[NETWORK.MQTT] Started logging messages to the console"); }
	else { console_log = false; console.debug("[NETWORK.MQTT] Stopped logging messages to the console"); }
}


//// PRIVATE FUNCTIONS

function isConnected() {
	return pahoClient ? pahoClient.isConnected() : false;
}

function notify(topicString: string, payload: string) {
	const topicArray = topicString.split('/');
	const topicLength = topicArray.length;
	let topic = topicArray.shift();
	if(topic){
		for(let i = 0; i < topicLength; i++) {
			let receivers = listeners[topic];
			if(receivers) {
				//
				let tail = topicArray.length ? topicArray.join('/') : null;
				if(!tail){
					//
					topic += '/' + topicArray.shift();
					// continue;
				}
				for(let listener of receivers) try {
					listener(payload, tail || '');
				}
				catch(error) {
				// [ logging ]
				//
					console.error(`[NETWORK.MQTT] Message listener call error:`, error);
				}
			}
			
			topic += '/' + topicArray.shift();
			// else console.warn(`[NETWORK.MQTT] ...`);
		}
	}
	
	// hash listeners
	for(let listener of hashListeners) try {
		listener(payload, topicString);
	}
	catch(error) {
		// [ logging ]
		//
		console.error(`[NETWORK.MQTT] Message listener call error:`, error);
	}
}

function informCheckers(connected: boolean) {
	// const connected = isConnected();
	checkers.forEach(checker => {
		try { checker(connected); }
		catch(error) { console.error(`[NETWORK.MQTT] Connection checker error:`, error); }
	});
}


//// EXPORT
export default MQTT;
export { start, stop };



/* RUBBISH

*/