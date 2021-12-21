import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  // default property for sidebar 
  // by defauld it should be closed mode so it set to false
  // but using function expandSidebarNow() and   closeSidebarNow()
  // is able to change expandSidebar = true or false

  public expandSidebar:boolean = false;

  expandSidebarNow(action:boolean){
    this.expandSidebar = action;
  }

  closeSidebarNow(action:boolean){
    this.expandSidebar = action;
  }
}
