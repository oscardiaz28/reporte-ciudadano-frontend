import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrl: './report-modal.component.css'
})
export class ReportModalComponent implements OnInit {

  @ViewChild("modal") modal! : ElementRef;
  @ViewChild("formElement") formElement! : ElementRef;

  form! : FormGroup;
  formSubmitted : boolean = false;

  showModal(){
    (<HTMLDivElement>this.modal.nativeElement).classList.remove('hide');
    (<HTMLDivElement>this.modal.nativeElement).classList.add('show');
  }

  hideModal(){
    (<HTMLDivElement>this.modal.nativeElement).classList.remove('show');
    (<HTMLDivElement>this.modal.nativeElement).classList.add('hide');
  }

  sendReport(){
    const inputAddress = (<HTMLInputElement>document.getElementById("inputAddress"));
    if(inputAddress.value == ""){
      alert("Por favor, ingresa una dirección");
      return;
    }
    this.showModal();
  }

  fileValidator(control : AbstractControl) : ValidationErrors | null {
    const file = control.value;
    if(file && file.length > 0){
      return null; // no errors
    }

    return {fileRequired: true}; // error

  }

  constructor(private fb : FormBuilder){}

  ngOnInit(): void {
    this.form = this.fb.group({
      dni : ['', Validators.required],
      descripcion : ['', Validators.required],
      tipo : ['', Validators.required],
      prioridad : ['', Validators.required],
      evidencia : ['', this.fileValidator]
    }) 
  }

  onFileSelect(event : Event){
  }

  handleSubmit(){
    this.formSubmitted = true;
    if( this.form.invalid ){
      console.log('invalid')
      this.showAlert();
      return;
    }

    const formData = new FormData(this.formElement.nativeElement);

    //@ts-ignore
    Swal.fire({
      title: "Buen Trabajo!",
      text: "Su reporte ha sido registrado con éxito, se dará el aviso correspondiente a las autoridades",
      icon: "success",
      customClass: {
        title: 'custom-title',
        content: 'custom-content'
      }
    }).then( () => {
      (<HTMLFormElement>this.formElement.nativeElement).reset();
      this.hideModal();
    } )

  }

  showAlert(){

    document.querySelectorAll('.alert-danger').forEach( elem => {
      elem.remove();
    } )

    const container = document.getElementById('optionsDiv');
    const div = document.createElement('div');
    div.classList.add('alert');
    div.classList.add('alert-danger')
    div.innerHTML = `<p>Todos los campos son obligatorios</p>`;

    container?.parentNode?.insertBefore(div, container);

    setTimeout(() => {
      div.remove();
    }, 5000);

  }

}
