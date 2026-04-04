import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventory-item';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {
  // Define a temporary object for bidirectional binding with HTML forms
  letItem: InventoryItem = {
    id: '',
    name: '',
    category: 'Electronics',
    quantity: 0,
    price: 0,
    supplierName: '',
    stockStatus: 'In Stock',
    popularItem: 'No',
    comment: ''
  };

  // The variable used to display feedback information 
  feedbackMessage: string = "";
  isError: boolean = false;

  // The variable used to control the display of the "Confirm Deletion" box
  showDeleteConfirm: boolean = false;

  constructor(public invService: InventoryService) {}

  // add item
  onAdd() {
    // Ensure that all required fields are not empty
    if (this.letItem.id === "" || this.letItem.name === "") {
      this.showFeedback("Error: ID and Name are required!", true);
      return;
    }

    let success = this.invService.addItem({ ...this.letItem });
    if (success) {
      this.showFeedback("Success: Item added to inventory!", false);
      this.resetForm();
    } else {
      this.showFeedback("Error: Item ID must be unique!", true);
    }
  }

  // update item by name
  onUpdate() {
    let success = this.invService.updateItem(this.letItem.name, { ...this.letItem });
    if (success) {
      this.showFeedback("Success: Item updated successfully!", false);
    } else {
      this.showFeedback("Error: Item name not found!", true);
    }
  }

  // Click the delete button
  onDeleteRequest() {
    if (this.letItem.name === "") {
      this.showFeedback("Error: Enter Item Name to delete!", true);
      return;
    }
    this.showDeleteConfirm = true;
    this.feedbackMessage = "";
  }

  // Actually carry out the deletion process
  executeDelete() {
    let success = this.invService.deleteItem(this.letItem.name);
    if (success) {
      this.showFeedback("Success: Item has been removed.", false);
      this.resetForm();
    } else {
      this.showFeedback("Error: Could not delete item.", true);
    }
    this.showDeleteConfirm = false;
  }

  // Display prompt message
  showFeedback(msg: string, error: boolean) {
    this.feedbackMessage = msg;
    this.isError = error;
  }

  // void MakeEmpty
  resetForm() {
    this.letItem = {
      id: '', name: '', category: 'Electronics',
      quantity: 0, price: 0, supplierName: '',
      stockStatus: 'In Stock', popularItem: 'No', comment: ''
    };
  }
}