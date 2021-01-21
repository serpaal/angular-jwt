import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtStorageService } from './jwt-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://159.203.189.218:9001/product';
  constructor(private jwtService: JwtStorageService, private http: HttpClient) { }

  getProductos(): any {       
    const headers = { 'Authorization': 'Bearer ' + this.jwtService.getToken() };
    return this.http.get<any>(`${this.url}`, { headers });
  }
}
