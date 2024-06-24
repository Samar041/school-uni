import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsService {
  private googleMapsApiScriptLoaded = false;
  private key = `${environment.mapKey}`;

  loadGoogleMapsApi(): Promise<void> {
    if (!this.googleMapsApiScriptLoaded) {
      return new Promise<void>((resolve) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${this.key}&libraries=geometry,drawing&callback=Function.prototype`;
        script.onload = () => {
          this.googleMapsApiScriptLoaded = true;
          resolve();
        };
        document.head.appendChild(script);
      });
    }
    else {
      return Promise.resolve();
    }
  }
}
