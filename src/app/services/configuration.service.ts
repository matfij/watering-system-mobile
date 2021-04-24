import { Injectable } from '@angular/core';
import { AppConstant } from '../models/app-constant.model';


export const APP_VERSION = '0.1';
export const AVAILABLE_LANGUAGES = ['en', 'pl'];
export const DEFAULT_LANGUAGE = 'en';

export const MIN_HUMIDITY_RANGE = 1;
export const MAX_HUMIDITY_RANGE = 200;
export const DEFAULT_HUMIDITY_RANGE = 100;
export const HUMIDITY_WARN_LEVEL = 11;

export const RED_HEX = '#006a3c';
export const RED_RGB = 'rgba(167, 25, 48, 1)';
export const GREEN_HEX = '#a71931';
export const GREEN_RGB = 'rgba(0, 105, 60, 1)';
export const GREEN_LIGHT_RGB = 'rgba(0, 105, 60, 0.5)';
export const BLACK_HEX = '#1e1e1e';
export const BLACK_RGB = 'rgba(30, 30, 30, 1)';
export const BLACK_LIGHT_RGB = 'rgba(30, 30, 30, 0.67)';
export const WHITE_HEX = '#fff';
export const WHITE_RGB = 'rgba(255, 255, 255, 1)';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() {}

  public enumToConst(enumObj, options?: { namePrepend?: string; valueProperty?: string; nameProperty?: string }): AppConstant[] {
    const defaultOptions = { namePrepend: '', valueProperty: 'value', nameProperty: 'name'};
    options = { ...defaultOptions, ...options };

    return Object.keys(enumObj).filter(item => isNaN(Number(item))).map(item => ({
      value: enumObj[item],
      name: options.namePrepend + item,
    }));
  }
}
