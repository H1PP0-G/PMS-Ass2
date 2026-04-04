import { Injectable } from '@angular/core';
import { InventoryItem } from '../models/inventory-item';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  // Core data array: Used to store items during the session
  private items: InventoryItem[] = [];

  constructor() {}

  // Get the list of all items
  getItems(): InventoryItem[] {
    return this.items;
  }

  // 1. add item
  addItem(item: InventoryItem): boolean {
    let exists = this.items.find(i => i.id === item.id);
    if (exists) {
      return false; // ID already excited
    }
    this.items.push(item);
    return true;
  }

  // 2. update by name
  updateItem(name: string, updatedData: InventoryItem): boolean {
    let index = this.items.findIndex(i => i.name === name);
    if (index !== -1) {
      this.items[index] = updatedData;
      return true;
    }
    return false;
  }

  // 3. delete by namne
  deleteItem(name: string): boolean {
    let index = this.items.findIndex(i => i.name === name);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
}