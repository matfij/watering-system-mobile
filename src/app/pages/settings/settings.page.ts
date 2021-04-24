import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AVAILABLE_LANGUAGES } from 'src/app/services/configuration.service';
import { LANG, StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  availableLanguages: Language[] = AVAILABLE_LANGUAGES.map(each => ({ value: each, name: each.toUpperCase() }));
  selectedLanguage: string;

  constructor(
    private storeService: StoreService,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.selectedLanguage = this.storeService.getItem(LANG);
  }

  updateLanguage(lang: string) {
    this.translateService.use(lang);
    this.storeService.setItem(LANG, lang);
  }

}

export interface Language {
  value: string;
  name: string;
}
