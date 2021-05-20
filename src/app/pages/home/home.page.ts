import { Component } from '@angular/core';
import { GetHumidityParams } from 'src/app/models/get-humidity-params.model';
import { HumiditySample } from 'src/app/models/humidity-sample.model';
import { Page } from 'src/app/models/page.enum';
import { Plant } from 'src/app/models/plant.model';
import { ApiService } from 'src/app/services/api.service';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
// eslint-disable-next-line max-len
import { DEFAULT_HUMIDITY_RANGE, HUMIDITY_WARN_LEVEL, MAX_HUMIDITY_RANGE, MIN_HUMIDITY_RANGE, BLACK_LIGHT_RGB, BLACK_RGB, GREEN_LIGHT_RGB, GREEN_RGB, RED_RGB, DATE_PLACEHOLDER } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  getAvailablePlantsLoading: boolean;
  getPlantHumidityLoading: boolean;
  availablePlants: Plant[] = [];
  selectedPlant: Plant;
  plantHumiditySamples: HumiditySample[] = [];

  plantHumidityData: ChartDataSets[];
  plantHumidityLabels: Label[];
  dateRange: string;

  get page() { return Page; }
  get minHumidityRange() { return MIN_HUMIDITY_RANGE; }
  get maxHumidityRange() { return MAX_HUMIDITY_RANGE; }

  constructor(
    private apiService: ApiService,
  ) {}

  ionViewDidEnter() {
    this.cleanup();
    this.getAvailablePlants();
  }

  getAvailablePlants() {
    this.getAvailablePlantsLoading = true;
    this.apiService.getAvailablePlants().subscribe((plants: Plant[]) => {
      this.getAvailablePlantsLoading = false;
      this.availablePlants = plants;

      this.selectedPlant = plants[plants.length - 1];
      this.getPlantHumidity(this.selectedPlant.id, this.selectedPlant.name);
    }, error => {
      this.getAvailablePlantsLoading = false;
      console.log(error);
    });
  }

  getPlantHumidity(id: number, name: string, hours: number = DEFAULT_HUMIDITY_RANGE) {
    const params: GetHumidityParams = {
      plantId: id,
      samples: hours
    };
    this.getPlantHumidityLoading = true;
    this.apiService.getHistoricalHumidity(params).subscribe((samples: HumiditySample[]) => {
      this.getPlantHumidityLoading = false;
      this.plantHumiditySamples = samples;

      this.updateChartData(samples, name);
    }, error => {
      this.getPlantHumidityLoading = false;
      console.log(error);
    });
  }

  updateChartData(samples: HumiditySample[], name: string) {
    samples = samples.reverse();
    const values = samples.map(sample => sample.value);
    const labels = samples.map(_ => '');
    const statusColors = samples.map(sample => sample.value < HUMIDITY_WARN_LEVEL ? RED_RGB : GREEN_RGB);
    const borderColors = samples.map(_ => BLACK_RGB);

    this.plantHumidityData = [
      {
        label: name,
        data: values,
        backgroundColor: GREEN_LIGHT_RGB,
        borderColor: BLACK_LIGHT_RGB,
        pointBorderColor: borderColors,
        hoverBorderColor: statusColors,
        hoverBackgroundColor: statusColors,
        pointBackgroundColor:statusColors,
        pointHoverBorderColor: statusColors,
        pointStyle: 'circle',
      }
    ];
    this.plantHumidityLabels = labels;

    if (samples.length > 0) {
      const start = samples[0].date ? samples[0].date.replace('ď»ż', '') : DATE_PLACEHOLDER;
      const end = samples[samples.length - 1].date ? samples[samples.length - 1].date : DATE_PLACEHOLDER;
      this.dateRange = start + ' - ' + end;
    } else {
      this.dateRange = '-';
    }
  }

  plantSelectionChanged(plantId: number, hours: number = DEFAULT_HUMIDITY_RANGE) {
    const plantName = this.availablePlants.find(p => p.id === plantId).name;
    this.getPlantHumidity(plantId, plantName, hours);
  }

  cleanup() {
    this.availablePlants = [];
    this.plantHumiditySamples = [];
    this.getAvailablePlantsLoading = false;
    this.getPlantHumidityLoading = false;
    this.selectedPlant = null;
    this.plantHumidityData = [];
    this.plantHumidityLabels = [];
    this.dateRange = null;
  }

}
