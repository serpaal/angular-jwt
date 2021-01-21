import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtStorageService } from './jwt-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RequerimientosService {
  //url = 'http://elfweb01/mesaayuda/rq_lista.php';
  url = 'assets/requerimientos.json';
  constructor(private jwtService: JwtStorageService, private http: HttpClient) { }

  getRequerimientos(): any {       
    /*const headers = { 'Authorization': 'Bearer ' + this.jwtService.getToken() };
    return this.http.get<any>(`${this.url}`, { headers });*/
    return this.http.get<any>(`${this.url}`);
  }

  /*
    return this.http.get<any>('assets/showcase/data/products-small.json')
        .toPromise()
        .then(res => <Product[]>res.data)
        .then(data => { return data; });
  */
}
