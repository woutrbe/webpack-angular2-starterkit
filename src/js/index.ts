// Import CSS
import '../css/index.scss';

import 'reflect-metadata';
import 'zone.js/dist/zone';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import AppModule from './app.module';

export function main() {
	document.removeEventListener('DOMContentLoaded', main);

	return platformBrowserDynamic().bootstrapModule(AppModule);
}

// Only bootstrap the app when document is ready
if (document.readyState === 'complete') {
	main();
} else {
	document.addEventListener('DOMContentLoaded', main);
}