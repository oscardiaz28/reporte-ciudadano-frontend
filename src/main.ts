import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Loader } from '@googlemaps/js-api-loader';

if( !navigator.geolocation){
    alert('El navegador no soporta la geolocalizacion');
}


export const initLoader = new Loader({
  apiKey: environment.googleMapsKey,
  version: "weekly"
});

platformBrowserDynamic().bootstrapModule(AppModule)
.catch(err => console.log(err))
