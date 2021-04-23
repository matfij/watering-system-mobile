import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/models/page.enum';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor() {}

  ngOnInit() {}

  get page() { return Page; }

}
