import { Component, OnInit } from '@angular/core';
import { navItems } from '../_nav';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public sidebarMinimized = false;
  public navItems = navItems;
  toggleMinimize(e: boolean) {
    this.sidebarMinimized = e;
  }
  constructor() { }

  ngOnInit(): void {

  }
}
