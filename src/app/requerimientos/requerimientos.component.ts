import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

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
  requerimientos: Requerimientos[] = [];
  selectedRequerimiento: Requerimientos;
  projects: Project[] = []; 
  assignee: any[] = [];
  selectedProject: Project;
  
  constructor(
    private spinner: NgxSpinnerService,
    private requerimientosService: RequerimientosService, 
    private openProjectService: OpenProjectService, 
    private messageService: MessageService
  ) { }

  ngOnInit() {    
    this.getProjects();  
    this.findRequerimientos({cod_u_rbl: "VBUS01"}); 
  }

  findRequerimientos(params): void {
    this.spinner.show();
    this.assignee = [];
    this.requerimientosService.findRequerimientos(params).subscribe(res => {
      this.requerimientosService.setRequerimientosJson({requerimientos_json: JSON.stringify(res)}).subscribe(res => {
        this.requerimientosService.getRequerimientos(params).subscribe(res =>{
          this.requerimientos = res;
          for(let requerimiento of this.requerimientos){
            if(requerimiento.open_project_id){
              const id:number = +requerimiento.open_project_id;
              this.getWorkerPackage(id, requerimiento).then(data =>{
                const checkAssigneeExistence = assigneeParam => this.assignee.some( ({value}) => value == assigneeParam);
                if(!checkAssigneeExistence(data.open_project_assignee.toString()))
                  this.assignee.push({ label: data.open_project_assignee.toString(), value: data.open_project_assignee.toString() });
                this.requerimientosService.updateRequerimiento(data.id, data).subscribe(res =>{
                  setTimeout(() => {
                    this.spinner.hide();
                  }, 1000);
                }, function(e){
                  setTimeout(() => {
                    this.spinner.hide();
                  }, 1000);
                })
              })              
            }
          }
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);               
        })       
      })     
    })   
  }   

  getProjects(): void {
    this.openProjectService.getProjects()
    .then(data => {
      this.projects = data;
    });
  }  

  getWorkerPackage(id: number, requerimiento: Requerimientos): any {
    return this.openProjectService.getWorkPackage(id).then(res => {
      requerimiento.open_project_status = res._embedded.status.name.replace(' ', '-');
      requerimiento.open_project_percentage_done = res.percentageDone;
      requerimiento.open_project_assignee = res._embedded.assignee ? res._embedded.assignee.name : null;       
      return requerimiento;
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
    this.spinner.show();
    
    this.openProjectService.setWorkPackage(payload)
    .then(data => {
        record.open_project_id = data.id.toString();
        record.open_project_title = data._links.project.title;
        record.open_project_status = data._links.status.title;

        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
       
        this.requerimientosService.updateRequerimiento(record.id, record).subscribe(res => {
          this.messageService.add({severity: 'success', summary: 'Crear User Story', detail: 'Registro exitoso'});
        });  
    });
  } 
  
  ngOnDestroy(): void {
  }
}
