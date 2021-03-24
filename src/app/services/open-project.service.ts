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

   getPhases(id:string)  {      
    const filter = `/${id}/work_packages?filters=[{"type_id":{"operator":"=","values":["3"]}}]&pageSize=1000`;    
    const url = environment.hostOpenProject.concat(environment.endpoints["projects"], filter);   
      
    const auth = window.btoa('apikey' + ':' + environment.apiKey); 
    const headers = { 'Authorization': `Basic ${auth}` };    
    
     return this.http.get<any>(`${url}`, { headers })
     .toPromise()
     .then(res =>res._embedded.elements)
     .then(data => { return data; });
   } 

   getPriorities(){
       
    const url = environment.hostOpenProject.concat(environment.endpoints["priorities"]);   
      
    const auth = window.btoa('apikey' + ':' + environment.apiKey); 
    const headers = { 'Authorization': `Basic ${auth}` };    
    
     return this.http.get<any>(`${url}`, { headers })
     .toPromise()
     .then(res =>res._embedded.elements)
     .then(data => { return data; });
   }
   
   getUsers(){
       
    const url = environment.hostOpenProject.concat(environment.endpoints["users"]);   
      
    const auth = window.btoa('apikey' + ':' + environment.apiKey); 
    const headers = { 'Authorization': `Basic ${auth}` };    
    
     return this.http.get<any>(`${url}`, { headers })
     .toPromise()
     .then(res =>res._embedded.elements)
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
      const headers = new HttpHeaders();
      headers.set('Authorization', `Basic ${auth}`);
      headers.set("Access-Control-Allow-Origin", "*");
      
      return this.http.get<any>(`${url}`, { headers })
        .toPromise()
        .then(response => { 
          return response; 
      });
   }

   getMemberships(id:string){
      const filter = `?filters=[{"project":{"operator":"=","values":[${id}]}}]&pageSize=1000`;    
      const url = environment.hostOpenProject.concat(environment.endpoints["memberships"], filter); 
      
      const auth = window.btoa('apikey' + ':' + environment.apiKey); 
      const headers = { 'Authorization': `Basic ${auth}` };    
      
      return this.http.get<any>(`${url}`, { headers })
       .toPromise()
       .then(res =>res._embedded.elements)
       .then(data => { return data; });
   }
   
}
