import { Injectable } from '@angular/core';
import { Place } from '../interfaces/place';

@Injectable({
  providedIn: 'root'
})

export class PlacesService {

  public userLocation? : [number, number];
  isLoadingPlaces : boolean = false;
  places : Place[] = [];

  get isUserLocationReady() : boolean{
    return this.userLocation ? true : false;
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise( (resolve, reject) => {

      setTimeout(() => {
        navigator.geolocation.getCurrentPosition(
          ( {coords} ) => {
            this.userLocation = [coords.longitude, coords.latitude]
            resolve(this.userLocation);
          },
          (err) => {
            alert("No se pudo obtener la ubicación")
            reject();
          }
        )
      }, 1000);
    })
  }


  async getPlacesByQuery( query : string ){

    this.places = [];

    if(query.length === 0){
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }

    this.isLoadingPlaces = true;

    // @ts-ignore
    const obj = {
      lat: this.userLocation![1],
      lng: this.userLocation![0]
    }

    const { PlacesService, AutocompleteSessionToken, AutocompleteSuggestion } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
    let request = {
      input: query,
      locationRestriction: {
        west: -79.8600,
        north: -6.7490,
        east: -79.8300,
        south: -6.8000,
      },
      origin: obj,
      language: "es-PE",
      region: "pe"
    }

    const token = new AutocompleteSessionToken();
    // @ts-ignore
    request.sessionToken = token;
    const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);

    this.isLoadingPlaces = false;

    const service = new PlacesService(document.createElement('div'));

    for(let suggestion of suggestions){
        // Obtener el place_id de la sugerencia
      const placeId = suggestion.placePrediction?.placeId;

      if (placeId) {
        const detailsRequest = {
          placeId: placeId,
          fields: ['name', 'geometry', 'formatted_address']
        };

        // Obtener detalles del lugar
        service.getDetails(detailsRequest, (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            const name = place.name;
            const address = place.formatted_address;
            const coordinates = place.geometry?.location;
            if (coordinates) {

              const placeObj : Place = {
                name: name!,
                address: address!,
                lat: coordinates?.lat(),
                lng: coordinates?.lng()
              }
              const placeExists = this.places.some( currentPlace => 
                currentPlace.lat === coordinates.lat() && currentPlace.lng === coordinates.lng()
              );
              if( !placeExists ){
                this.places.push(placeObj);
              }
            }
          }
        });

      }
    }
    this.places = this.places.slice(0, 8);
  }


  constructor() {
    this.getUserLocation();
  }

}
