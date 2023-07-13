//// IMPORTS
//
import {
	pathFetch,
	topicFetch,
	fetchJSON,
} from './Fetcher';
//
// import FetchError from './FetchError';
//
import FetchError, {
	ResponseFetchError,
	NoResponseFetchError,
} from './FetchError';
//
import type {
	IAuthData,
	IGuest,
} from './types-auth';
//
//
type TListener = (payload: string, tail: string) => void;
type TChecker = (checker: boolean) => void;
type integer = number;
type AUTH_OR_NULL = IAuthData | null;
type DEAUTHORISED = (error?: Error) => void;
type METHOD = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type HEADERS_I = Record<string, string>; // || HeadersInit
type ListenerForError40X = (fetchError :FetchError) => void;

//
interface IConfig {
	api_url: string;
	auth_topic: string; // i.e. 'users/login'
	fes_url: string;
	gis_url: string;
	mqtt: {
		host: string;
		port: integer;
		use_SSL?: boolean; // defaults to true
		useSSL?: boolean; // 
		console_log?:boolean; // defaults to false
		consoleLog?:boolean; //
	}
}
//
interface _Service {
	_start ? :() => void;
	_stop ? :() => void;
}
interface Service {
	// name :string;
	start ? :() => void;
	stop ? :() => void;
}
//
//



//// EXPORTS
export {
	pathFetch,
	topicFetch,
	fetchJSON,
	//
	ResponseFetchError,
	NoResponseFetchError,
	//
	//
	TListener,
	TChecker,
	integer,
	IConfig,
	AUTH_OR_NULL,
	DEAUTHORISED,
	//
	METHOD,
	HEADERS_I,
	//
	_Service,
	Service,
	//
	//
	IAuthData,
	IGuest,
	//
	ListenerForError40X,
	FetchError,
};