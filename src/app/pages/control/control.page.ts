import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Page } from 'src/app/models/page.enum';
import { PumpControlParams, PumpState } from 'src/app/models/pump-control-params.model';
import { Pump } from 'src/app/models/pump.model';
import { StatusMessage } from 'src/app/models/status-message.model';
import { ApiService } from 'src/app/services/api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.page.html',
  styleUrls: ['./control.page.scss'],
})
export class ControlPage implements OnInit {

  getAvailablePumpsLoading: boolean;
  sendPumpControlSignalLoading: boolean;
  availablePumps: Pump[];
  selectedPump: Pump;

  get pumpState() { return PumpState; }
  get pumpStatusChoice() { return this.configurationService.pumpStatusChoice; }

  constructor(
    private apiService: ApiService,
    private configurationService: ConfigurationService,
    private translateService: TranslateService,
    private utilitiesService: UtilitiesService,
  ) {}

  ngOnInit() {
    this.cleanup();
    this.getAvailablePumps();
  }

  getAvailablePumps() {
    this.getAvailablePumpsLoading = true;
    this.apiService.getAvailablePumpsMock().subscribe((pumps: Pump[]) => {
      this.getAvailablePumpsLoading = false;
      this.availablePumps = pumps;
    }, error => {
      this.getAvailablePumpsLoading = false;
      console.log(error);
    });
  }

  pumpSelected(id: number) {
    this.selectedPump = this.availablePumps.find(p => p.id === id);
    console.log(this.selectedPump);
  }

  getPumpStateName(state: PumpState) {
    const resName = this.configurationService.pumpStatusChoice[state].name;
    return this.translateService.instant(resName);
  }

  sendPumpControlSignal(state: PumpState) {
    if (this.selectedPump && (state || state === 0)) {
      const params: PumpControlParams = {
        id: this.selectedPump.id,
        command: state
      };
      this.sendPumpControlSignalLoading = true;
      this.apiService.sendPumpControlSignalMock(params).subscribe((message: StatusMessage) => {
        this.sendPumpControlSignalLoading = false;
        this.selectedPump.state = state;
        this.utilitiesService.presentToast(message.message);
      }, error => {
        this.sendPumpControlSignalLoading = false;
        console.log(error);
      });
    } else {
      this.utilitiesService.presentToast('messages.enerAllRequiredData');
    }
  }

  cleanup() {
    this.getAvailablePumpsLoading = false;
    this.sendPumpControlSignalLoading = false;
    this.availablePumps = [];
    this.selectedPump = null;
  }

}
