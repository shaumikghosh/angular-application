import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  // this is passing as props from child to parent with emiter
  // @Output() is hepling to send parameter and EventEmitter is initialzing its as a function
  @Output() closeSidebarNow:EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // this  method is passing status a s false to hide the sidebar
  hideSidebar (){
    this.closeSidebarNow.emit(false);
  }


}
