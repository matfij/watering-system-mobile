import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LANG, StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  lang: string;

  constructor(
    private translateService: TranslateService,
    private storeService: StoreService,
    private navController: NavController,
  ) {}

  ngOnInit() {
    this.lang = this.storeService.getItem(LANG);
    this.translateService.use(this.lang);

    this.navController.navigateForward(['']);
  }
}
