import { Component, OnInit } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Place } from '../../interfaces/place';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit {

  stateSearchResult : boolean = true;

  get isLoadingPlace(){
    return this.placesService.isLoadingPlaces;
  }

  get places(){
    return this.placesService.places;
  }

  flyTo(place : Place){
    console.log(place)
    this.mapService.flyTo([place.lng, place.lat]);
    this.mapService.addMarker([place.lng, place.lat]);
    this.mapService.hideSearchResults();
   (<HTMLInputElement>document.getElementById('inputSearch')).value = "";
  }

  constructor(private placesService : PlacesService, private mapService : MapService){}

  ngOnInit(): void {
    this.mapService.searchResult$.subscribe( value => this.stateSearchResult = value );
  }

}
