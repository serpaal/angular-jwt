import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { Requerimientos } from './requerimientos';
import { RequerimientosService } from '../services/requerimientos.service';
import { OpenProjectService } from '../services/open-project.service';
import { Project } from '../open-project/project';

@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.css']
})
export class RequerimientosComponent implements OnInit {
  loading: boolean = true;
  requerimientos: Requerimientos[] = [];
  selectedRequerimiento: Requerimientos;
  projects: Project[] = [];
  selectedProject: Project;
  
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


    let payload = {
      subject: record.nro_req,
      description: {
          format: "markdown",
          raw: record.Detalle,
          html: ""
      },
      scheduleManually: false,
      startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      dueDate: null,
      estimatedTime: null,
      percentageDone: 0,
      remainingTime: null,
      _links: {
          category: {
              href: null
          },
          type: {
              href: "/api/v3/types/6",
              title: "User story"
          },
          priority: {
              href: "/api/v3/priorities/8",
              title: "Normal"
          },
          project: {
              href: record.project._links.self.href,
              title: record.project._links.self.title
          },
          status: {
              href: "/api/v3/statuses/1",
              title: "New"
          },
          responsible: {
              href: null
          },
          assignee: {
              href: null
          },
          version: {
              href: null
          },
          parent: {
              href: null,
              title: null
          }
      }
    };
    this.loading = true;
    this.openProjectService.setWorkPackage(payload)
    .then(data => {
        this.loading = false;
        console.dir(data);
    });
  }  
}
