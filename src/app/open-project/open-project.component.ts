import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { formatDate } from '@angular/common';
import { OpenProjectService } from '../services/open-project.service';
import { OpenProject } from './open-project';
import { Incidentes } from '../incidentes/incidentes';
import { Requerimientos } from '../requerimientos/requerimientos';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'modal-open-project',
  templateUrl: './open-project.component.html',
  styleUrls: ['./open-project.component.css'],
  providers: [MessageService]
})
export class OpenProjectComponent implements OnInit {
  @Input() display:boolean; 
  @Input() requerimiento: Requerimientos;
  @Input() incidente: Incidentes;
  @Input() esRequerimiento: boolean;
  @Output() dismissModal: EventEmitter<OpenProject> = new EventEmitter<OpenProject>();

  projects:any[] = []; 
  phases:any = [];
  memberships: any = [];
  priorities: any = [];
  users: any = [];

  selectedProject:any; 
  selectedPhase:any; 
  selectedMembership: any;
  selectedPriority: any;
  selectedUser: any;

  constructor(
    private openProjectService: OpenProjectService, 
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
     this.getProjects();
     this.getPriorities(); 
     this.getUsers();
  }

  getProjects(): void {
    this.openProjectService.getProjects()
    .then(data => {
      this.projects = data;
    });
  }  

  workpackageSelected(){
    if(this.selectedProject){
      this.getPhases(this.selectedProject.id.toString());
      this.getMemberships(this.selectedProject.id.toString());
    }   
  }

  getPhases(work_packages_id:string): void {
    this.openProjectService.getPhases(work_packages_id)
    .then(data => {
      this.phases = data;
    });
  }  

  getMemberships(work_packages_id:string): void {
    this.openProjectService.getMemberships(work_packages_id)
    .then(data => {
      this.memberships = data;
    });
  }  

  getPriorities(): void {
    this.openProjectService.getPriorities()
    .then(data => {
      this.priorities = data;
    });
  } 

  getUsers(): void {
    this.openProjectService.getUsers()
    .then(data => {
      this.users = data;
    });
  }
  
  sendOpenProject() {
    let _this = this;
    let payload = {
      subject: this.esRequerimiento ? this.requerimiento.nro_req : this.incidente.nro_inc,
      description: {
          format: "markdown",
          raw: this.esRequerimiento ? this.requerimiento.justific : this.incidente.descrip,
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
              href: this.selectedPriority ? this.selectedPriority._links.self.href : "/api/v3/priorities/8",
              title: this.selectedPriority ? this.selectedPriority._links.self.title : "Normal"
          },
          project: {
              href: this.selectedProject._links.self.href,
              title: this.selectedProject._links.self.title
          },
          status: {
              href: "/api/v3/statuses/1",
              title: "New"
          },
          responsible: {
              href: null
          },
          assignee: {
              href: this.selectedMembership ? this.selectedMembership._links.principal.href : null,
              title: this.selectedMembership ? this.selectedMembership._links.principal.title : null
          },
          version: {
              href: null
          },
          parent: {
            href: this.selectedPhase ? this.selectedPhase._links.self.href : null,
            title: this.selectedPhase ? this.selectedPhase._links.self.title : null
          }
      }
    };
    //this.spinner.show();
    
    this.openProjectService.setWorkPackage(payload)
    .then(data => {
      if(this.esRequerimiento){
        this.requerimiento.open_project_id = data.id.toString();
        this.requerimiento.open_project_identifier = data._embedded.project.identifier;
        this.requerimiento.open_project_title = data._links.project.title;
        this.requerimiento.open_project_status = data._links.status.title; 
        this.requerimiento.open_project_percentage_done = data.percentageDone;
        this.requerimiento.open_project_assignee = data._links.assignee.title;
        this.requerimiento.open_project_priority = data._links.priority.title;
      } else {
        this.incidente.open_project_id = data.id.toString();
        this.incidente.open_project_identifier = data._embedded.project.identifier;
        this.incidente.open_project_title = data._links.project.title;
        this.incidente.open_project_status = data._links.status.title; 
        this.incidente.open_project_percentage_done = data.percentageDone;
        this.incidente.open_project_assignee = data._links.assignee.title;
        this.incidente.open_project_priority = data._links.priority.title;
      }    
      
      this.dismissModal.emit({
        requerimiento: this.requerimiento,
        incidente: this.incidente,
        esRequerimiento: this.esRequerimiento,
        isSaved: true
      });

        //setTimeout(() => {
          //this.spinner.hide();
        //}, 1000);
       
        //this.requerimientosService.updateRequerimiento(record.id, record).subscribe(res => {
        ///  this.messageService.add({severity: 'success', summary: 'Crear User Story', detail: 'Registro exitoso'});
       // });  
    }, function(e){
      console.log(e);
      _this.messageService.add({severity: 'error', summary: 'Crear User Story', detail: e.error.message});
    });
  } 
  showModal(){
    this.selectedProject = null;
    this.selectedPhase = null;
    this.selectedMembership = null;
    this.selectedUser = null;
    this.selectedPriority = null;    
  }
  
  closeModal(){
    this.display = false;
    this.dismissModal.emit({
      requerimiento: this.requerimiento,
      incidente: this.incidente,
      esRequerimiento: this.esRequerimiento,
      isSaved: false
    });
  }

}
