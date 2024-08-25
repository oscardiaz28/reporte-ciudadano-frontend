import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { initLoader } from '../../../../../main';

declare var google: any; 

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})

export class MapViewComponent implements AfterViewInit {

  @ViewChild("mapDiv") mapDiv! : ElementRef;
  map: any;
  
  constructor(private placesService : PlacesService, private mapService : MapService){}

  ngAfterViewInit(): void {

    if(!this.placesService.userLocation) throw new Error("No se pudo obtener...");
    this.initMap();
  }

  async initMap(){

    initLoader.load().then( async () => {

      const {Map} = await google.maps.importLibrary("maps");
      const [longitude, latitude] = this.placesService.userLocation!;

      const mapOptions = {
        center: {lat: latitude, lng: longitude}, // Lima, Perú
        zoom: 15,
        mapId: "DEMO_APP_ID"
      };

      this.map = new Map(this.mapDiv.nativeElement, mapOptions);
      this.mapService.addMarker([longitude, latitude]);
      this.mapService.setMap( this.map );

    })
    
  }

}
