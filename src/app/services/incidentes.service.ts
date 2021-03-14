import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtStorageService } from './jwt-storage.service';
import { Incidentes } from '../incidentes/incidentes';

@Injectable({
  providedIn: 'root'
})
export class IncidentesService {
  url = 'http://localhost:5002/api/incidentesinf';
  constructor(private jwtService: JwtStorageService, private http: HttpClient) { }

  getIncidentes()  {
    return this.http.get<Incidentes[]>(`${this.url}`)     
  }
}
