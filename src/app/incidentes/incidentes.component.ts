import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { formatDate } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Project } from '../open-project/project';
import { IncidentesService } from '../services/incidentes.service';
import { Incidentes } from './incidentes';
import { OpenProjectService } from '../services/open-project.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-incidentes',
  templateUrl: './incidentes.component.html',
  styleUrls: ['./incidentes.component.css'],
  providers: [MessageService]
})
export class IncidentesComponent implements OnInit, OnDestroy {
  displayModal:boolean = false;
  esRequerimiento:boolean = false;
  incidentes: Incidentes[] = [];
  assignee: any[] = [];
  selectedIncidente: Incidentes; 
  

  constructor(
    private incidentesService: IncidentesService, 
    private openProjectService: OpenProjectService, 
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {   
    this.displayModal = false;
    this.esRequerimiento = false;
    this.findIncidentes();  
  }

  findIncidentes(): void {
    let params = {cod_u_rbl: "VBUS01"};
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
                if(data.open_project_assignee && !checkAssigneeExistence(data.open_project_assignee.toString()))
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
 

  getWorkerPackage(id: number, incidente: Incidentes): any {
    return this.openProjectService.getWorkPackage(id).then(res => {
      incidente.open_project_status = res._embedded.status.name.replace(' ', '-');
      incidente.open_project_percentage_done = res.percentageDone;
      incidente.open_project_assignee = res._embedded.assignee ? res._embedded.assignee.name : null;       
      return incidente;
    });
  }

  sendOpenProject(record) {    
    this.selectedIncidente = record;
    this.displayModal = true;
  }

  dismissModal(ev){
    this.displayModal = false;
    if(!ev.isSaved)
      return;
    
    this.incidentesService.updateIncidente(ev.incidente.id, ev.incidente).subscribe(res => {
      this.messageService.add({severity: 'success', summary: 'Crear User Story', detail: 'Registro exitoso'});
    });  
  }

  goOpenProject(incidente: Incidentes){
    let serverOpenProject = environment.serverOpenProject;
    let work_packages_id = incidente.open_project_id;
    let identifier = incidente.open_project_identifier;
    window.open(`${serverOpenProject}/projects/${identifier}/work_packages/${work_packages_id}`, "_blank");
  }

  ngOnDestroy(): void {
  }


}
