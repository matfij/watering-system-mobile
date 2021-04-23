import { Component } from '@angular/core';
import { Page } from 'src/app/models/page.enum';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  get page() { return Page; }

}
