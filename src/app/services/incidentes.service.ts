import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtStorageService } from './jwt-storage.service';
import { Incidentes } from '../incidentes/incidentes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidentesService {
  constructor(private jwtService: JwtStorageService, private http: HttpClient) { }
  /**
   * Busca inicidentes en mesa de ayuda
   * @returns una coleccion de incidentes de mesa de ayuda
   */
  findIncidentes(params)  {   
    const url = environment.hostMesaAyuda.concat(environment.endpoints["incidentesMesaAyuda"]);
    let _params = new HttpParams();  
    for (let k of Object.keys(params))
      _params = _params.append(k, params[k]);
    return this.http.get<any[]>(`${url}`, {params: _params}) 
  }

  setIncidentesJson(params: any)  {  
    const url = environment.hostToolsOpenProject.concat(environment.endpoints["setIncidentes"]);      
    return this.http.post(`${url}`, params);   
  }

  updateIncidentesJson(params: any)  {  
    const url = environment.hostToolsOpenProject.concat(environment.endpoints["updateIncidentes"]);      
    return this.http.post(`${url}`, params);   
  }

  getIncidentes(params) {   
    const url = environment.hostToolsOpenProject.concat(environment.endpoints["incidentes"]);  
    /*const headers = { 'Authorization': 'Bearer ' + this.jwtService.getToken() };
    return this.http.get<any>(`${this.url}`, { headers });*/
    let _params = new HttpParams();  
    for (let k of Object.keys(params))
      _params = _params.append(k, params[k]);

    return this.http.get<Incidentes[]>(`${url}`, {params:_params});
  }

  updateIncidente(id:number, params: any)  {  
    const url = environment.hostToolsOpenProject.concat(environment.endpoints["incidentes"], "/", id.toString());  
    return this.http.put(`${url}`, params);   
  }
}
