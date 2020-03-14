import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceComponent } from './service.component'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  title = 'condominium-front';
    
  formField: FormGroup;
	users: Object = [];  
	condominiumsId: Object = [];
	databaseMap : Object = [];   
  databaseBytes;
  databaseBytesWithoutHeader64;

	constructor(
		private service: ServiceComponent,
		private formBuilder: FormBuilder){

		this.formField = this.formBuilder.group({
	  		database: ['', Validators.required],
        email: ['', Validators.required],
        result: [''],
		}); 
	} 

	get form() {
	  return this.formField.controls;
	}

  onFileSelected(event){
    const target= event.target as HTMLInputElement;
    var file: File = (target.files as FileList)[0];    
   
    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.databaseBytes = myReader.result; 
    }
    myReader.readAsDataURL(file); 
  }

  readDatabase(){   
    if(this.databaseBytes != null){ 
      this.databaseBytesWithoutHeader64 = this.databaseBytes.split(',')[1];
      this.service.readDatabase(this.databaseBytesWithoutHeader64).subscribe(
        	(data:any)=> {
           	 	this.databaseMap =  data;
           	 	this.users =  data.users;
           	 	this.condominiumsId =  data.condominiumsId;
              alert("Banco de dados carregado");
        	},
        	error => {
        	    this.service.handleErrors(error);
      });	 
    }
  }  

	findHigherUserPermissions(){ 
      this.service.findHigherUserPermissions(this.form.email.value,this.databaseMap).subscribe(
          (data:any)=> {
              this.form.result.setValue(data.result);         
          },
          error => {
            this.service.handleErrors(error);
      }); 
  } 
}
