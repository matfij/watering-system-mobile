import { Injectable } from '@angular/core';
import { AppConstant } from '../models/app-constant.model';


export const APP_VERSION = '0.1';
export const AVAILABLE_LANGUAGES = ['en', 'pl'];
export const DEFAULT_LANGUAGE = 'en';

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
