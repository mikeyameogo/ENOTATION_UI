import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from '../_nav';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  
  public sidebarMinimized = false;
  public navItems = navItems;
 

  toggleMinimize(e: boolean) {
    this.sidebarMinimized = e;
  }
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}

