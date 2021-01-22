import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtStorageService } from './jwt-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OpenProjectService {

   //url = 'http://elflap03.elfec.com:88/OpenProject/api/v3/projects';
   url = 'assets/projects.json';
   constructor(private jwtService: JwtStorageService, private http: HttpClient) { }
 
   getProjects()  {      
    let headers = new HttpHeaders();
    headers.append("Authorization", "Basic " + btoa("apikey:ba0ed49e95b880bac58fb24ab0a1c2c4fd948e996dd91a920f6031523c772838"));
    headers.append("Content-Type", "application/x-www-form-urlencoded");
     
     return this.http.get<any>(`${this.url}`, { headers })
     .toPromise()
     .then(res => res._embedded)
     .then(data => { return data.elements; });
   } 
   
}
