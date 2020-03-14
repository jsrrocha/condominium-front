import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ServiceComponent {
  backendUrl = "https://condominium-front.netlify.com/";

  constructor(private http: HttpClient) {}

  readDatabase(path: string){
      const url = this.backendUrl + "database/read";
      return this.http.post(url,path);
  }

  findHigherUserPermissions(email: string, data: object){
      const url = this.backendUrl + "user/" + email + "/permission/find"; 
      return this.http.post(url,data);  
  } 

  handleErrors(error: any){ 
    if(error.error != undefined){
      alert (error.error);
    }else{ 
      alert ("Opss! Algo deu errado \nTente novamente");
    }
  } 
}
