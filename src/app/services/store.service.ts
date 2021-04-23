import { Injectable } from '@angular/core';


export const LANG = 'wsm-lang';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() {}

  public getItem(key: string) {
    return localStorage.getItem(key);
  }

  public setItem(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  public removeItem(key: string) {
    return localStorage.removeItem(key);
  }

  public clearAll() {
    localStorage.clear();
  }
}
