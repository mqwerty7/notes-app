import { INoteStore } from "./Interfaces";

export const LocalStorageService = {
  setStore: (store: INoteStore): void => {
    localStorage.setItem('store', JSON.stringify(store));
  },

  getStore: (): INoteStore => {
    return JSON.parse(localStorage.getItem('store') || '{ "notes": [], "noteToEdit": {}, "tags": [] }');
  }
};