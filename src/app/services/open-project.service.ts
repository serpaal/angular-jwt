import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtStorageService } from './jwt-storage.service';
import { Project } from '../open-project/project';

@Injectable({
  providedIn: 'root'
})
export class OpenProjectService {
   
  
   constructor(private jwtService: JwtStorageService, private http: HttpClient) { }
 
   getProjects()  {      
    //const url = 'http://elflap03.elfec.com:88/OpenProject/api/v3/projects';
    const url = 'http://127.0.0.1:8080/api/v3/projects';
    const auth = window.btoa('apikey' + ':' + '9efc25bc5b43f6c17579c5e4615124886c18cbf2ff18bb5dc409e163a3984986');    
    const headers = { 'Authorization': `Basic ${auth}` };
    

     return this.http.get<any>(`${url}`, { headers })
     .toPromise()
     .then(res => <Project[]>res._embedded.elements)
     .then(data => { return data; });
   } 

   setWorkPackage(payload: any){
    const url = 'http://127.0.0.1:8080/api/v3/work_packages';
    const auth = window.btoa('apikey' + ':' + '9efc25bc5b43f6c17579c5e4615124886c18cbf2ff18bb5dc409e163a3984986');    
    
    const headers = { 'Authorization': `Basic ${auth}` };
     return this.http.post<any>(`${url}`, payload, { headers })
     .toPromise()
     .then(response => { 
       console.dir('response');
       return response; 
      });
   }
   
}
