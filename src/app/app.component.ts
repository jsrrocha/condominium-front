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
	selectUserEmail = 'Selecione';  

	constructor(
		private service: ServiceComponent,
		private formBuilder: FormBuilder){

		this.formField = this.formBuilder.group({
	  		database: ['', Validators.required],
        result: [''],
		}); 
	} 

	get form() {
	  return this.formField.controls;
	}

	readDatabase(){   
    	this.service.readDatabase(this.form.database.value).subscribe(
        	(data:any)=> {
           	 	console.log(data);  
           	 	this.databaseMap =  data;
           	 	this.users =  data.users;
           	 	this.condominiumsId =  data.condominiumsId;

           	 	console.log(this.users);  
			        console.log(this.condominiumsId);  

        	},
        	error => {
        	    this.service.handleErrors(error);
           		console.log(error); //arrumar file não encontrado!
      });	
    }  

  	findHigherUserPermissions(){ 
      if(this.selectUserEmail != 'Selecione'){
        this.service.findHigherUserPermissions(this.selectUserEmail,this.databaseMap).subscribe(
            (data:any)=> {
                console.log(data); 
                this.form.result.setValue(data.result);         
            },
            error => {
              this.service.handleErrors(error);
              console.log(error);
        }); 
      }
    } 
}
