export enum NotyType {
	LOGIN = 'login',
	LOGOUT = 'logout'
};

export type Listener = (type: NotyType) => void;

const listeners: Listener[] = [];

function notifySubs(type: NotyType) {
	listeners.forEach(listener => listener(type));
}

function subOnAuth(listener: Listener) {
	const listenerIndex = listeners.findIndex(handler => handler === listener);

	if(listenerIndex === -1) console.warn('Listener already exist');
	else 	listeners.push(listener);
}

function unsubFromAuth(listener: Listener) {
	const listenerIndex = listeners.findIndex(handler => handler === listener);
	if(listenerIndex !== -1) listeners.splice(listenerIndex, 1);
	else console.warn('Listener was not found');
}

// function subOnLogout() {
// 	//
// }

export { notifySubs, subOnAuth, unsubFromAuth }
// function unsubOnLogout() {
// 	//
// }