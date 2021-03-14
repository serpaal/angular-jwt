import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Requerimientos } from './requerimientos';
import { RequerimientosService } from '../services/requerimientos.service';
import { OpenProjectService } from '../services/open-project.service';
import { Project } from '../open-project/project';

@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.css'],
  providers: [MessageService]
})
export class RequerimientosComponent implements OnInit {
  loading: boolean = true;
  requerimientos: Requerimientos[] = [];
  selectedRequerimiento: Requerimientos;
  projects: Project[] = [];
  selectedProject: Project;
  
  constructor(private requerimientosService: RequerimientosService, private openProjectService: OpenProjectService, private messageService: MessageService) { }

  ngOnInit(): void {  
    this.findRequerimientos();  
    this.getProjects();
  }

  findRequerimientos(): void {
    this.requerimientosService.findRequerimientos().subscribe(res => {
      this.requerimientosService.setRequerimientosJson({requerimientos_json: JSON.stringify(res)}).subscribe(res => {
        this.requerimientosService.getRequerimientos().subscribe(res =>{
          this.loading = false;
          this.requerimientos = res;
        })
       
      })     
    })
   
    /*  .then(data => {
        this.loading = false;
        this.requerimientos = data;
        this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    });*/
  } 

  getProjects(): void {
    this.openProjectService.getProjects()
    .then(data => {
      this.projects = data;
    });
  }  

  sendOpenProject(record): void {
    let payload = {
      subject: record.nro_req,
      description: {
          format: "markdown",
          raw: record.justific,
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
        record.open_project_id = data.id.toString();
        record.open_project_title = data._links.project.title;
        record.open_project_status = data._links.status.title;
        this.requerimientosService.updateRequerimiento(record.id, record).subscribe(res => {
          this.messageService.add({severity: 'success', summary: 'Crear User Story', detail: 'Registro exitoso'});
        });  
    });
  } 
  
  ngOnDestroy(): void {
  }
}
