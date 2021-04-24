/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LANG, StoreService } from './services/store.service';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from './services/configuration.service';
import { BottomHeaderComponent } from './components/bottom-header/bottom-header.component';
import { TopHeaderComponent } from './components/top-header/top-header.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    BottomHeaderComponent,
    TopHeaderComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    TranslateModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {

  constructor(
    _storeService: StoreService,
    _translateService: TranslateService,
  ) {
    _translateService.setDefaultLang(DEFAULT_LANGUAGE);
    _translateService.addLangs(AVAILABLE_LANGUAGES);
    _translateService.use('pl');
    _translateService.use('en');

    const lang = _storeService.getItem(LANG);
    _translateService.use(lang ? lang : DEFAULT_LANGUAGE);
  }
}
