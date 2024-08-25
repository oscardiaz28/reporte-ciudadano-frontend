import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  searchInput! : string;
  
  handleQuery( event : Event ){
    if( (<HTMLInputElement>event.target).value == "" ){
      this.mapService.hideSearchResults();
      return;
    };
    this.mapService.showSearchResults();
    // setTimeout(() => {
    this.placesService.getPlacesByQuery(this.searchInput);
    // }, 400);
  }

  constructor(private placesService : PlacesService, private mapService : MapService){}

}
