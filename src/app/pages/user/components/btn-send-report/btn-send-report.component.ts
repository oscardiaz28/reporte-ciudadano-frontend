import { Component } from '@angular/core';

@Component({
  selector: 'app-btn-send-report',
  templateUrl: './btn-send-report.component.html',
  styleUrl: './btn-send-report.component.css'
})
export class BtnSendReportComponent {

  sendReport(){
    const inputAddress = (<HTMLInputElement>document.getElementById("inputAddress"));
    if(inputAddress.value == ""){
      alert("Por favor, ingresa una dirección");
      return;
    }

    
  }

  constructor(){}

}
