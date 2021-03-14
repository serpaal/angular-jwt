import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtStorageService } from './jwt-storage.service';
import { Requerimientos } from '../requerimientos/requerimientos';
import { environment } from 'src/environments/environment';
import { env } from 'process';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RequerimientosService {
 
  constructor(private jwtService: JwtStorageService, private http: HttpClient) { }
  /**
   * Busca requerimientos en mesa de ayuda
   * @returns una coleccion de requerimientos de mesa de ayuda
   */
  findRequerimientos()  {   
    const url = environment.hostMesaAyuda.concat(environment.endpoints["requerimientosMesaAyuda"]);
    //const url = 'http://localhost:5002/api/requeriminf';    
    /*const headers = { 'Authorization': 'Bearer ' + this.jwtService.getToken() };
    return this.http.get<any>(`${this.url}`, { headers });*/
    return this.http.get<any[]>(`${url}`) 
  }

  setRequerimientosJson(params: any)  {  
    const url = environment.hostToolsOpenProject.concat(environment.endpoints["setRequerimientos"]);  
    //var formData: any = new FormData();
    //formData.append("requerimientos_json", params['requerimientos_json']);
    /*const headers = { 'Authorization': 'Bearer ' + this.jwtService.getToken() };
    return this.http.get<any>(`${this.url}`, { headers });*/
    return this.http.post(`${url}`, params);   
  }

  getRequerimientos() {   
    const url = environment.hostToolsOpenProject.concat(environment.endpoints["requerimientos"]);  
    /*const headers = { 'Authorization': 'Bearer ' + this.jwtService.getToken() };
    return this.http.get<any>(`${this.url}`, { headers });*/
    return this.http.get<Requerimientos[]>(`${url}`) 
  }

  updateRequerimiento(id:number, params: any)  {  
    const url = environment.hostToolsOpenProject.concat(environment.endpoints["requerimientos"], "/", id.toString());  
    //var formData: any = new FormData();
    //formData.append("requerimientos_json", params['requerimientos_json']);
    /*const headers = { 'Authorization': 'Bearer ' + this.jwtService.getToken() };
    return this.http.get<any>(`${this.url}`, { headers });*/
    console.log('acutalizar requerimiento');
    return this.http.put(`${url}`, params);   
  }
 
}
