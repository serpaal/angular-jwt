import { Component, OnInit } from '@angular/core';
import { JwtStorageService } from '../services/jwt-storage.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent implements OnInit {
  private items: MenuItem[];
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(private tokenStorageService: JwtStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.firstname.concat(' ', user.lastname);

      this.items = [
            { label: 'Requerimientos', icon: 'pi pi-cog', routerLink: ['/main/requerimientos']},
            { label: 'Incidentes', icon: 'pi pi-exclamation-triangle', routerLink: ['/main/productos']}
      ]    
     
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
