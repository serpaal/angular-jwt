import { Component, OnInit } from '@angular/core';
import { Requerimientos } from './requerimientos';
import { RequerimientosService } from '../services/requerimientos.service';
import { OpenProjectService } from '../services/open-project.service';

@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.css']
})
export class RequerimientosComponent implements OnInit {
  loading: boolean = true;
  requerimientos: Requerimientos[] = [];
  projects: any;
  selectedProject: any;
  
  constructor(private requerimientosService: RequerimientosService, private openProjectService: OpenProjectService) { }

  ngOnInit(): void {  
    this.getRequerimientos();  
    this.getProjects();
  }

  getRequerimientos(): void {
    this.requerimientosService.getRequerimientos()
      .then(data => {
        this.loading = false;
        this.requerimientos = data;
    });
  }

  getProjects(): void {
    this.openProjectService.getProjects()
    .then(data => {
      this.projects = data;
    });
  }

  ngOnDestroy(): void {
  }

  sendOpenProject(record): void {
    console.log('requerimiento');
    console.dir(record);
    console.dir(this.selectedProject);
  }

}
