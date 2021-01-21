import { Component, OnInit } from '@angular/core';
import { Requerimientos } from './requerimientos';
import { RequerimientosService } from '../services/requerimientos.service';

@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.css']
})
export class RequerimientosComponent implements OnInit {
  loading: boolean = true;
  requerimientos: Requerimientos[] = [];
  
  constructor(private requerimientosService: RequerimientosService) { }

  ngOnInit(): void {
  
    this.requerimientos = this.requerimientosService.getRequerimientos()
      .subscribe(data => {
        this.loading = false;
        this.requerimientos = data;
      });
  }

  ngOnDestroy(): void {
  }

  sendOpenProject(record): void {
    console.log('requerimiento');
    console.dir(record);
  }

}
