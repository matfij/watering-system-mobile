import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetHumidityParams } from '../models/get-humidity-params.model';
import { HumiditySample } from '../models/humidity-sample.model';
import { Plant } from '../models/plant.model';
import { PumpControlParams, PumpState } from '../models/pump-control-params.model';
import { Pump } from '../models/pump.model';
import { StatusMessage } from '../models/status-message.model';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = environment.apiUrl;

  constructor(
    private utilitiesService: UtilitiesService,
    private httpClient: HttpClient,
  ) {}

  getAvailablePlants(): Observable<Plant[]> {
    const url = this.baseUrl + 'plants';
    return this.httpClient.get<Plant[]>(url);
  }

  getHistoricalHumidity(params: GetHumidityParams): Observable<HumiditySample[]> {
    const url = this.baseUrl + 'humidity';
    return this.httpClient.post<HumiditySample[]>(url, params);
  }

  getAvailablePumps(): Observable<Pump[]> {
    const url = this.baseUrl + 'pumps';
    return this.httpClient.get<Pump[]>(url);
  }

  sendPumpControlSignal(params: PumpControlParams): Observable<StatusMessage> {
    const url = this.baseUrl + 'pumpControl';
    return this.httpClient.post<StatusMessage>(url, params);
  }

  getAvailablePlantsMock(): Observable<Plant[]> {
    const response: Plant[] = [
      { id: 0, name: 'Plant A' },
      { id: 1, name: 'Plant C' },
      { id: 2, name: 'Plant D' },
    ];
    return of(response);
  }

  getHistoricalHumidityMock(params: GetHumidityParams): Observable<HumiditySample[]> {
    const response: HumiditySample[] = [
      { id: 1, value: 12.5, date: '22:15' },
      { id: 2, value: 11.5 },
      { id: 3, value: 10.5 },
      { id: 4, value: 9.5 },
      { id: 5, value: 8.5 },
      { id: 6, value: 7.5 },
      { id: 7, value: 6.5 },
      { id: 8, value: 15 },
      { id: 9, value: 14 },
      { id: 10, value: 13 },
      { id: 11, value: 12.5 },
      { id: 12, value: 12, date: '3:00' },
    ];
    return of(response);
  }

  getAvailablePumpsMock(): Observable<Pump[]> {
    const response: Pump[] = [
      { id: 0, name: 'Plant A', state: PumpState.stop },
      { id: 1, name: 'Plant C', state: PumpState.stop },
      { id: 2, name: 'Plant D', state: PumpState.start },
    ];
    return of(response);
  }

  sendPumpControlSignalMock(params: PumpControlParams): Observable<StatusMessage> {
    const response: StatusMessage = {
      message: 'Pump status updated',
      code: 200,
    };
    return of(response);
  }

}
