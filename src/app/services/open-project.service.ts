import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtStorageService } from './jwt-storage.service';
import { Project } from '../open-project/project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenProjectService {
  

  
   constructor(private jwtService: JwtStorageService, private http: HttpClient) { }
  
   getProjects()  {      
    const url = environment.hostOpenProject.concat(environment.endpoints["projects"]);
      
    const auth = window.btoa('apikey' + ':' + environment.apiKey); 
    const headers = { 'Authorization': `Basic ${auth}` };
    

     return this.http.get<any>(`${url}`, { headers })
     .toPromise()
     .then(res => <Project[]>res._embedded.elements)
     .then(data => { return data; });
   } 

   setWorkPackage(payload: any){
   

    const url = environment.hostOpenProject.concat(environment.endpoints["workPackages"]);

    const auth = window.btoa('apikey' + ':' + environment.apiKey); 
    const headers = { 'Authorization': `Basic ${auth}` };
   
     return this.http.post<any>(`${url}`, payload, { headers })
     .toPromise()
     .then(response => { 
       return response; 
      });
   }

   getWorkPackage(id: number): any{
      const url = environment.hostOpenProject.concat(environment.endpoints["workPackages"], '/', id.toString());

      const auth = window.btoa('apikey' + ':' + environment.apiKey); 
      const headers = { 'Authorization': `Basic ${auth}` };
      
      return this.http.get<any>(`${url}`, { headers })
        .toPromise()
        .then(response => { 
          return response; 
      });
   }
   
}
