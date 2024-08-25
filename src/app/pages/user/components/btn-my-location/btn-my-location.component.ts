import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {

  goToMyLocation(){
    if( this.placesService.isUserLocationReady ){
      this.mapService.flyTo(this.placesService.userLocation!);
      this.mapService.addMarker(this.placesService.userLocation!)
    }
  }

  constructor(private placesService : PlacesService, private mapService : MapService){}

}
