import { Component, OnInit, OnDestroy } from '@angular/core';
import { formatDate } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Project } from '../open-project/project';
import { IncidentesService } from '../services/incidentes.service';
import { Incidentes } from './incidentes';
import { OpenProjectService } from '../services/open-project.service';



@Component({
  selector: 'app-incidentes',
  templateUrl: './incidentes.component.html',
  styleUrls: ['./incidentes.component.css'],
  providers: [MessageService]
})
export class IncidentesComponent implements OnInit, OnDestroy {
 
  incidentes: Incidentes[] = [];
  loading: boolean = true;
  selectedIncidente: Incidentes; 
  projects: Project[] = [];
  selectedProject: Project;    

  constructor(private incidentesService: IncidentesService, private openProjectService: OpenProjectService, private messageService: MessageService) { }

  ngOnInit(): void {   
    this.getIncidentes();  
    this.getProjects(); 
  }

  getIncidentes(): void {
    this.incidentesService.getIncidentes()
    .subscribe(res => {
      this.incidentes = res;
      this.loading = false;
    });
  }

  getProjects(): void {
    this.openProjectService.getProjects()
    .then(data => {
      this.projects = data;
    });
  }

  sendOpenProject(record): void {
    let payload = {
      subject: record.nro_inc,
      description: {
          format: "markdown",
          raw: record.descrip,
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
       this.messageService.add({severity: 'success', summary: 'Crear User Story', detail: 'Registro exitoso'})
    });
  }  

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    //this.dtTrigger.unsubscribe();
  }

}
