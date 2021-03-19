import { Component, Input, OnInit } from '@angular/core';
import { OpenProjectService } from '../services/open-project.service';
import { Project } from './project';

@Component({
  selector: 'modal-open-project',
  templateUrl: './open-project.component.html',
  styleUrls: ['./open-project.component.css']
})
export class OpenProjectComponent implements OnInit {
  @Input() display:boolean;

  projects:Project[] = []; 
  phases:any = [];
  priorities: any = [];
  users: any = [];

  selectedProject:Project; 
  selectedPhase:any; 
  selectedPriority: any;
  selectedUser: any;

  constructor(private openProjectService: OpenProjectService) { }

  ngOnInit(): void {
     
  }

  getProjects(): void {
    this.openProjectService.getProjects()
    .then(data => {
      this.projects = data;
    });
  }  

  getPhases(work_packages_id:string): void {
    this.openProjectService.getPhases(work_packages_id)
    .then(data => {
      this.phases = data;
    });
  }  

  getPriorities(): void {
    this.openProjectService.getPriorities()
    .then(data => {
      this.priorities = data;
    });
  } 

  getUsers(): void {
    this.openProjectService.getusers()
    .then(data => {
      this.users = data;
    });
  } 


}
