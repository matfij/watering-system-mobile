import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlPageRoutingModule } from './control-routing.module';

import { ControlPage } from './control.page';
import { ThemeAppModule } from 'src/app/theme-app/theme-app.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControlPageRoutingModule,
    ThemeAppModule.forChild(),
  ],
  declarations: [
    ControlPage,
  ]
})
export class ControlPageModule {}
