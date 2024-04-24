import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  get(key: string): any {
    if (this.isLocalStorageSupported) {
      return this.storage.getItem(key);
    }
    return null;
  }

  getJson(key: string): any {
      return JSON.parse(this.get(key));
  }

  set(key: string, value: string): boolean {
    if (this.isLocalStorageSupported) {
      this.storage.setItem(key, value);
      return true;
    }
    return false;
  }

  setJson(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  get isLocalStorageSupported(): boolean {
    return !!this.storage
  }
}