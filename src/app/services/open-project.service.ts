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
    const url = 'http://192.168.100.102:8088/api/v3/projects';
    const auth = window.btoa('apikey' + ':' + '5f0ba1da6a19c55b70c4009781be469749973cef24a3aea960cf7f46977138de');    
    const headers = { 'Authorization': `Basic ${auth}` };
    

     return this.http.get<any>(`${url}`, { headers })
     .toPromise()
     .then(res => <Project[]>res._embedded.elements)
     .then(data => { return data; });
   } 

   setWorkPackage(payload: any){
    const url = 'http://192.168.100.102:8088/api/v3/work_packages';
    const auth = window.btoa('apikey' + ':' + '5f0ba1da6a19c55b70c4009781be469749973cef24a3aea960cf7f46977138de');    
    
    const headers = { 'Authorization': `Basic ${auth}` };
     return this.http.post<any>(`${url}`, payload, { headers })
     .toPromise()
     .then(response => { 
       console.dir('response');
       return response; 
      });
   }
   
}
