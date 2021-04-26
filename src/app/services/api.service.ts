import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetHumidityParams } from '../models/get-humidity-params.model';
import { HumiditySample } from '../models/humidity-sample.model';
import { Plant } from '../models/plant.model';
import { PumpControlParams } from '../models/pump-control-params.model';
import { Pump } from '../models/pump.model';
import { StatusMessage } from '../models/status-message.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
  ) {}

  getAvailablePlants(): Observable<Plant[]> {
    const url = this.baseUrl + 'plant/';
    return this.httpClient.get<Plant[]>(url);
  }

  getHistoricalHumidity(params: GetHumidityParams): Observable<any> {
    const url = this.baseUrl + 'humiditySamples/';
    return this.httpClient.post<HumiditySample[]>(url, params);
  }

  getAvailablePumps(): Observable<Pump[]> {
    const url = this.baseUrl + 'pump/';
    return this.httpClient.get<Pump[]>(url);
  }

  sendPumpControlSignal(params: PumpControlParams): Observable<StatusMessage> {
    const url = this.baseUrl + 'pump/' + params.id + '/';
    return this.httpClient.patch<StatusMessage>(url, params);
  }

}
