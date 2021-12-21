import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// this is the api url by json server
// if you start the json-server with diferrent port must replace the url
// with your own --port
export const base_url = () => {
  return "http://localhost:3000";
}