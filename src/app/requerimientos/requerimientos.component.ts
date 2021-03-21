import { Component, Input, OnInit } from '@angular/core';
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
  esRequerimiento: boolean;
  assignee:any[] = [];


  projects:Project[] = []; 
  phases:any = [];
  priorities: any = [];
  users: any = [];

  selectedProject:Project; 
  selectedPhase:any; 
  selectedPriority: any;
  selectedUser: any;


  displayModal:boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private requerimientosService: RequerimientosService, 
    private openProjectService: OpenProjectService, 
    private messageService: MessageService
  ) { }

  ngOnInit() {    
    this.displayModal = false;
    this.esRequerimiento = true;
    this.findRequerimientos(); 
  }

  findRequerimientos(): void {
    this.spinner.show();
    this.assignee = [];
    let params = {cod_u_rbl: "VBUS01"};
    this.requerimientosService.findRequerimientos(params).subscribe(res => {
      this.requerimientosService.setRequerimientosJson({requerimientos_json: JSON.stringify(res)}).subscribe(res => {
        this.requerimientosService.getRequerimientos(params).subscribe(res =>{
          this.requerimientos = res;
          for(let requerimiento of this.requerimientos){
            if(requerimiento.open_project_id){
              const id:number = +requerimiento.open_project_id;
              this.getWorkerPackage(id, requerimiento).then(data =>{
                const checkAssigneeExistence = assigneeParam => this.assignee.some( ({value}) => value == assigneeParam);
                if(data.open_project_assignee && !checkAssigneeExistence(data.open_project_assignee.toString()))
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
  
  sendOpenProject(record) {
    this.selectedRequerimiento = record;
    this.displayModal = true;
  }

  dismissModal(ev){
    this.displayModal = false;
    if(!ev.isSaved)
      return;
    
    this.requerimientosService.updateRequerimiento(ev.requerimiento.id, ev.requerimiento).subscribe(res => {
      this.messageService.add({severity: 'success', summary: 'Crear User Story', detail: 'Registro exitoso'});
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
  
  ngOnDestroy(): void {
  }
}
