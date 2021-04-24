import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { ChartsModule } from 'ng2-charts';
import { SpinnerComponent } from '../components/spinner/spinner.component';


const CHILD_PROVIDERS = [
  ...TranslateModule.forChild().providers
];

@NgModule({
  declarations: [
    SpinnerComponent,
  ],
  imports: [
    ChartsModule,
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  exports: [
    ChartsModule,
    IonicModule,
    TranslateModule,
    SpinnerComponent,
  ],
  providers: []
})
export class ThemeAppModule {

  public static forChild(): ModuleWithProviders<ThemeAppModule> {
    return {
      ngModule: ThemeAppModule,
      providers: [
        ...CHILD_PROVIDERS
      ]
    };
  }
}
