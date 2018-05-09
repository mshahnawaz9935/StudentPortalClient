import { Component, OnInit } from '@angular/core';
import { DataService } from '../DataService';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  constructor(private DataService: DataService) { }

  ngOnInit() {
  }

}
