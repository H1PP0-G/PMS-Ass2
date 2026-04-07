/**
 * Author: Wenbo He
 * Student ID: 24832151
 * Assessment: PROG2005 Assessment 2 (A2) - Part 2*/

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventory-item';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  // Search term binding
  searchQuery: string = "";
  
  // Show "All" or "Popular"?
  viewType: string = 'all'; 

  constructor(public invService: InventoryService) {}

  // Obtain the list that has been filtered through search.
  getFilteredItems(): InventoryItem[] {
    let allItems = this.invService.getItems();
    let query = this.searchQuery.toLowerCase().trim();

    // If no search is made, simply return all.
    if (query === "") {
      return allItems;
    }

    // Otherwise perform the search filtering by name
    return allItems.filter(item => 
      item.name.toLowerCase().includes(query)
    );
  }

  // Obtain popular items
  getPopularItems(): InventoryItem[] {
    let filtered = this.getFilteredItems();
    return filtered.filter(item => item.popularItem === 'Yes');
  }
}