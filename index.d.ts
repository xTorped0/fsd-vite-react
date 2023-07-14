import { config } from './config';

declare global {
	interface Window {
		config: config;
	}
	type nullish = null | undefined;
}

declare module '*.module.scss' {
	declare const content :Record<string, string>;
	export default content;
}

declare module '*.scss?inline' {
	const content: Record<string, string>;
	export default content;
}

declare module '*.png' {
	declare const fileURL :string;
	export default fileURL;
}

declare module '*.jpg' {
	declare const fileURL :string;
	export default fileURL;
}

declare module '*.jpeg' {
	declare const fileURL :string;
	export default fileURL;
}

declare module '*.gif' {
	declare const fileURL :string;
	export default fileURL;
}

declare module '*.mp3' {
	declare const fileURL :string;
	export default fileURL;
}