import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BottomHeaderComponent } from '../components/bottom-header/bottom-header.component';
import { TopHeaderComponent } from '../components/top-header/top-header.component';
import { IonicModule } from '@ionic/angular';


const CHILD_PROVIDERS = [
  ...TranslateModule.forChild().providers
];

@NgModule({
  declarations: [
    BottomHeaderComponent,
    TopHeaderComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  exports: [
    IonicModule,
    TranslateModule,
    BottomHeaderComponent,
    TopHeaderComponent,
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
