import { Injectable } from '@angular/core';
import { InventoryItem } from '../models/inventory-item';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  // Used to store items during the conversation
  private items: InventoryItem[] = [];

  constructor() {}

  // Get the list of all items
  getItems(): InventoryItem[] {
    return this.items;
  }

  // 1. Add item with unique Item ID
  addItem(item: InventoryItem): boolean {
    let exists = this.items.find(i => i.id === item.id);
    if (exists) {
      return false; // ID 已存在，添加失败
    }
    this.items.push(item);
    return true;
  }

  // 2. Update by Name
  updateItem(name: string, updatedData: InventoryItem): boolean {
    let index = this.items.findIndex(i => i.name === name);
    if (index !== -1) {
      this.items[index] = updatedData;
      return true;
    }
    return false;
  }

  // 3. Delete by Name
  deleteItem(name: string): boolean {
    let index = this.items.findIndex(i => i.name === name);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
}