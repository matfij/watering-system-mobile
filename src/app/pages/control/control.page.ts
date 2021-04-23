import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/models/page.enum';

@Component({
  selector: 'app-control',
  templateUrl: './control.page.html',
  styleUrls: ['./control.page.scss'],
})
export class ControlPage implements OnInit {

  constructor() {}

  ngOnInit() {}

  get page() { return Page; }

}
