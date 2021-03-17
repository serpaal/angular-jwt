import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
  assignee: any[] = [];
  selectedIncidente: Incidentes; 
  projects: Project[] = [];
  selectedProject: Project;    

  constructor(
    private incidentesService: IncidentesService, 
    private openProjectService: OpenProjectService, 
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {   
    this.findIncidentes({cod_u_rbl: "VBUS01"});  
    this.getProjects(); 
  }

  findIncidentes(params): void {
    this.assignee = [];
    this.spinner.show();
    this.incidentesService.findIncidentes(params).subscribe(res => {
      this.incidentesService.setIncidentesJson({incidentes_json: JSON.stringify(res)}).subscribe(res => {
        this.incidentesService.getIncidentes(params).subscribe(res =>{
          this.incidentes = res;
          for(let incidente of this.incidentes){
            if(incidente.open_project_id){
              const id:number = +incidente.open_project_id;
              this.getWorkerPackage(id, incidente).then(data =>{
                const checkAssigneeExistence = assigneeParam => this.assignee.some( ({value}) => value == assigneeParam);
                if(!checkAssigneeExistence(data.open_project_assignee.toString()))
                  this.assignee.push({ label: data.open_project_assignee.toString(), value: data.open_project_assignee.toString() });
              
                this.incidentesService.updateIncidente(data.id, data).subscribe(res =>{
                  setTimeout(() => {
                    this.spinner.hide();
                  }, 1000);
                }, err =>  {
                  this.messageService.add({severity: 'error', summary: 'Actualizar Incidente', detail: err.message });
                  this.spinner.hide();
                })
              }, err =>  {
                this.messageService.add({severity: 'error', summary: 'Incidente Open Project', detail: err.message });
                this.spinner.hide();
              })              
            }
          }
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);               
        }, err =>  {
          this.messageService.add({severity: 'error', summary: 'Get Incidentes Mesa Ayuda', detail: err.message });
          this.spinner.hide();
        })       
      }, err =>  {
        this.messageService.add({severity: 'error', summary: 'Set Incidentes JSON Mesa Ayuda', detail: err.message });
        this.spinner.hide();
      })     
    }, err =>  {
      this.messageService.add({severity: 'error', summary: 'Buscar Incidentes Mesa Ayuda', detail: err.message });
      this.spinner.hide();
    })   
  }     

  getProjects(): void {
    this.openProjectService.getProjects()
    .then(data => {
      this.projects = data;
    });
  }

  getWorkerPackage(id: number, incidente: Incidentes): any {
    return this.openProjectService.getWorkPackage(id).then(res => {
      incidente.open_project_status = res._embedded.status.name.replace(' ', '-');
      incidente.open_project_percentage_done = res.percentageDone;
      incidente.open_project_assignee = res._embedded.assignee ? res._embedded.assignee.name : null;       
      return incidente;
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
    this.spinner.show();
    this.openProjectService.setWorkPackage(payload)
    .then(data => {
      record.open_project_id = data.id.toString();
      record.open_project_title = data._links.project.title;
      record.open_project_status = data._links.status.title;

      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
     
      this.incidentesService.updateIncidente(record.id, record).subscribe(res => {
        this.messageService.add({severity: 'success', summary: 'Crear User Story', detail: 'Registro exitoso'});
      });    
    }, err =>  {
      this.messageService.add({severity: 'error', summary: 'Crear User Story Open Project', detail: err.message });
      this.spinner.hide();
    });
  }  

  ngOnDestroy(): void {
  }


}
