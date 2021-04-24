import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(
    private translateService: TranslateService,
    private toastController: ToastController,
  ) {}

  async presentToast(message: string, duration: number = 2000) {
    message = this.translateService.instant(message);

    const toast = await this.toastController.create({
      message,
      duration,
    });
    toast.present();
  }

  getDate(): string {
    const date = new Date();
    const datetime = date.getDate() + '/' + this.addZeroBefore((date.getMonth()+1)) + '/' + this.addZeroBefore(date.getFullYear()) + ' '
     + this.addZeroBefore(date.getHours()) + ':' + this.addZeroBefore(date.getMinutes()) + ':' + this.addZeroBefore(date.getSeconds());

    return datetime;
  }

  private addZeroBefore(n: any) {
    return (n < 10 ? '0' : '') + n;
  }

}
