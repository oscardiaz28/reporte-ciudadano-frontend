import { Component, OnInit, ViewChild } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {

  get isUserLocationReady(){
    return this.placesService.isUserLocationReady;
  }

  constructor(private placesService : PlacesService){}


}
