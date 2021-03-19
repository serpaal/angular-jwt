import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtStorageService } from './jwt-storage.service';
import { Requerimientos } from '../requerimientos/requerimientos';
import { environment } from 'src/environments/environment';

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
  findRequerimientos(params)  {   
    const url = environment.hostMesaAyuda.concat(environment.endpoints["requerimientosMesaAyuda"]);
    //const url = 'http://localhost:5002/api/requeriminf';    
    /*const headers = { 'Authorization': 'Bearer ' + this.jwtService.getToken() };
    return this.http.get<any>(`${this.url}`, { headers });*/

    let _params = new HttpParams();  
    for (let k of Object.keys(params))
      _params = _params.append(k, params[k]);

    return this.http.get<any[]>(`${url}`, { params: _params });
  }

  setRequerimientosJson(params: any)  {  
    const url = environment.hostToolsOpenProject.concat(environment.endpoints["setRequerimientos"]);  
    //var formData: any = new FormData();
    //formData.append("requerimientos_json", params['requerimientos_json']);
    /*const headers = { 'Authorization': 'Bearer ' + this.jwtService.getToken() };
    return this.http.get<any>(`${this.url}`, { headers });*/
    return this.http.post(`${url}`, params);   
  }

  updateRequerimientosJson(params: any)  {  
    const url = environment.hostToolsOpenProject.concat(environment.endpoints["updateRequerimientos"]);      
    return this.http.post(`${url}`, params);   
  }

  getRequerimientos(params) {   
    const url = environment.hostToolsOpenProject.concat(environment.endpoints["requerimientos"]);  
    /*const headers = { 'Authorization': 'Bearer ' + this.jwtService.getToken() };
    return this.http.get<any>(`${this.url}`, { headers });*/
    
    let _params = new HttpParams();  
    for (let k of Object.keys(params))
      _params = _params.append(k, params[k]);

    return this.http.get<Requerimientos[]>(`${url}`, {params: _params}); 
  }

  updateRequerimiento(id:number, params: any)  {  
    const url = environment.hostToolsOpenProject.concat(environment.endpoints["requerimientos"], "/", id.toString());  
    //var formData: any = new FormData();
    //formData.append("requerimientos_json", params['requerimientos_json']);
    /*const headers = { 'Authorization': 'Bearer ' + this.jwtService.getToken() };
    return this.http.get<any>(`${this.url}`, { headers });*/
    return this.http.put(`${url}`, params);   
  }
 
}
