import { Injectable, input } from '@angular/core';
import { Place } from '../interfaces/place';
import { BehaviorSubject } from 'rxjs';
import { getAddressComponents } from '../../../utils/utils';

declare var google: any; 

@Injectable({
  providedIn: 'root'
})

export class MapService {

  private map? : any;
  private markers : any = [];
  private searchResultsSubject = new BehaviorSubject<boolean>(true);
  searchResult$ = this.searchResultsSubject.asObservable();

  showSearchResults(){
    this.searchResultsSubject.next(true);
  }

  hideSearchResults(){
    this.searchResultsSubject.next(false);
  }

  get isMapReady(){
    return this.map ? true : false;
  }

  setMap(map : any){
    this.map = map;
  }


  async addMarker(coords : [number, number]){
    let textAddress = "";
    const inputAddress = (<HTMLInputElement>document.getElementById('inputAddress'));

    this.cleanMarkers();

    const position = new google.maps.LatLng(coords[1], coords[0]);

    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    const marker = new AdvancedMarkerElement({
      position: position,
      map: this.map,
      gmpDraggable: true
    })

    const geocoder = new google.maps.Geocoder();

    const data = await this.getAddress(geocoder, position);


    const infoWindow = new google.maps.InfoWindow({
      content: `
          <p>${data.streetName} ${data.streetNumber}</p>
          <p>${data.city} ${data.postal}</p>
          <p>${data.state}</p>
          <p>${data.country}</p>
      `
    });

    inputAddress.value = `${data.streetName} ${data.streetNumber}`;

    infoWindow.open(this.map, marker);

    marker.addListener('click', () => {
      infoWindow.open(this.map, marker);
    })

    marker.addListener('dragend', async () => {
      const newPosition = marker.position as google.maps.LatLng;
      const data = await this.getAddress(geocoder, newPosition)

      inputAddress.value = `${data.streetName} ${data.streetNumber}`;

      infoWindow.close();
      infoWindow.setContent(`
          <p>${data.streetName} ${data.streetNumber}</p>
          <p>${data.city} ${data.postal}</p>
          <p>${data.state}</p>
          <p>${data.country}</p>
        `)
      infoWindow.open(this.map, marker);
    })

    this.markers.push(marker);  
  }

  async getAddress( geocoder : google.maps.Geocoder ,  position : google.maps.LatLng ){
    const data = {
      streetNumber : '',
      streetName : '',
      city : '',
      state : '',
      country : '',
      postal: ''
    }
    await geocoder.geocode( {location: position} )
      .then( (response) => {
        if( response.results && response.results.length > 0 ){
          const specificResult = response.results[0];
          const addressComponents = specificResult.address_components;
          const {
            streetNumber,
            route,
            locality,
            administrativeAreaLevel1,
            country,
            postalCode
          } = getAddressComponents(addressComponents);

          data.streetNumber = streetNumber;
          data.streetName = route;
          data.city = locality;
          data.state = administrativeAreaLevel1;
          data.country = country;
          data.postal = postalCode;
        }
      })
      .catch( err => console.log(err))
    return data;
  }
 
  cleanMarkers(){
    if( !this.markers ) return;
    for(const marker of this.markers){
      marker.setMap(null);
    }
    this.markers = [];
  }

  flyTo(coords : [number, number]){
    const [lon, lat] = coords;
    this.map.panTo(new google.maps.LatLng(lat, lon));
  }

  constructor() { }
}
