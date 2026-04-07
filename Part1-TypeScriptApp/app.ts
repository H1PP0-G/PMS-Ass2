/**
 * Author: Wenbo He
 * Student ID: 24832151
 * Assessment: PROG2005 Assessment 2 (A2) - Part 1
 * Description: A standalone TypeScript-based Inventory Management System that 
 *              functions without server-side interaction.
 */

import { InventoryItem, CategoryType, StockStatusType } from './interfaces.js';

// --- Global constants and state management ---

/** @type {InventoryItem[]} stores a global array of all items in the inventory */
const inventory: InventoryItem[] = [];

/** Obtain the DOM element in the page used to display feedback information */
const feedbackEl = document.getElementById('appFeedback') as HTMLElement;
const formMsgEl = document.getElementById('formMessage') as HTMLElement;
const listEl = document.getElementById('inventoryList') as HTMLElement;

// --- Initialization and functions ---

function populateSelects(): void {
    const catSelect = document.getElementById('itemCategory') as HTMLSelectElement;
    const statSelect = document.getElementById('itemStatus') as HTMLSelectElement;

    const categories: CategoryType[] = ["Electronics", "Furniture", "Clothing", "Tools", "Miscellaneous"];
    const statuses: StockStatusType[] = ["In Stock", "Low Stock", "Out of Stock"];

    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = opt.textContent = cat;
        catSelect.appendChild(opt);
    });

    statuses.forEach(stat => {
        const opt = document.createElement('option');
        opt.value = opt.textContent = stat;
        statSelect.appendChild(opt);
    });
}

/**
 * Display interaction feedback messages on the page.
 * @param element - The HTML element where the message will be inserted.
 * @param msg - String representing the message content.
 * @param isError - Boolean value. If true, it displays red; if false, it displays green.
 */
function showMessage(element: HTMLElement, msg: string, isError: boolean): void {
    element.innerHTML = msg;
    element.style.color = isError ? "red" : "green";
    element.style.display = "block";
}

/** Traverse the entire inventory array and generate a dynamic HTML table.*/
function showInventoryList(): void {
    let tableHtml: string = `
        <table border="1" style="width:100%; border-collapse: collapse;">
            <tr><th>ID</th><th>Name</th><th>Category</th><th>Qty</th><th>Price</th><th>Supplier</th><th>Status</th><th>Popular</th></tr>
    `;
    
    inventory.forEach(item => {
        tableHtml += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.supplier}</td>
                <td>${item.status}</td>
                <td>${item.popular ? "Yes" : "No"}</td>
            </tr>
        `;
    });
    
    tableHtml += "</table>";
    listEl.innerHTML = tableHtml;
}

/**
* Add new project logic.
*/
function addItem(): void {
    const idIn = document.getElementById('itemId') as HTMLInputElement;
    const nameIn = document.getElementById('itemName') as HTMLInputElement;
    const catIn = document.getElementById('itemCategory') as HTMLSelectElement;
    const qtyIn = document.getElementById('itemQuantity') as HTMLInputElement;
    const priceIn = document.getElementById('itemPrice') as HTMLInputElement;
    const supIn = document.getElementById('itemSupplier') as HTMLInputElement;
    const statIn = document.getElementById('itemStatus') as HTMLSelectElement;
    const popIn = document.getElementById('itemPopular') as HTMLInputElement;
    const comIn = document.getElementById('itemComment') as HTMLTextAreaElement;

    const id = idIn.value.trim();
    const name = nameIn.value.trim();
    const cat = catIn.value as CategoryType;
    const qty = parseInt(qtyIn.value);
    const price = parseFloat(priceIn.value);
    const sup = supIn.value.trim();
    const stat = statIn.value as StockStatusType;
    const pop = popIn.checked;
    const com = comIn.value.trim();

    //  supplier Make sure all required fields have been filled in.
    if (id === "" || name === "" || isNaN(qty) || isNaN(price) || sup === "") {
        showMessage(formMsgEl, "Error: Fill all required fields (including Supplier)!", true);
        return;
    }

    // ID uniqueness check
    let exists = false;
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i].id === id) {
            exists = true;
            break;
        }
    }
    if (exists) {
        showMessage(formMsgEl, "Error: Item ID must be unique!", true);
        return;
    }

    // Validation of numerical validity
    if (isNaN(qty) || qty < 0 || isNaN(price) || price <= 0) {
        showMessage(formMsgEl, "Error: Quantity and Price must be valid positive numbers!", true);
        return;
    }

    const newItem = new InventoryItem(id, name, cat, qty, price, sup, stat, pop, com);
    inventory.push(newItem);
    
    // Clear the input box after success
    idIn.value = ""; nameIn.value = ""; qtyIn.value = ""; priceIn.value = ""; supIn.value = ""; comIn.value = "";
    popIn.checked = false;

    showMessage(formMsgEl, `Item '${name}' added successfully!`, false);
    showInventoryList();
}

/**
* Search function.
*/
function searchItem(): void {
    const searchNameIn = document.getElementById('searchItemName') as HTMLInputElement;
    const targetName = searchNameIn.value.trim().toLowerCase();
    
    if (targetName === "") {
        showMessage(feedbackEl, "Please enter a name to search.", true);
        return;
    }

    const results = inventory.filter(item => item.name.toLowerCase().includes(targetName));

    if (results.length > 0) {
        let tableHtml = `<h3>Search Results</h3><table border="1" style="width:100%; border-collapse: collapse;">
                         <tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th></tr>`;
        results.forEach(item => {
            tableHtml += `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.category}</td><td>$${item.price.toFixed(2)}</td></tr>`;
        });
        tableHtml += "</table>";
        listEl.innerHTML = tableHtml;
        showMessage(feedbackEl, `Found ${results.length} match(es).`, false);
    } else {
        showMessage(feedbackEl, "No items found with that name.", true);
    }
}

/**
* Update the existing project.
*/
function updateItem(): void {
    const nameIn = document.getElementById('itemName') as HTMLInputElement;
    const targetName = nameIn.value.trim();

    if (targetName === "") {
        showMessage(formMsgEl, "Error: Please enter the Item Name in the form to update!", true);
        return;
    }

    let foundItem: InventoryItem | null = null;
    for (let item of inventory) {
        if (item.name.toLowerCase() === targetName.toLowerCase()) {
            foundItem = item;
            break;
        }
    }

    if (foundItem) {
        const qtyIn = document.getElementById('itemQuantity') as HTMLInputElement;
        const priceIn = document.getElementById('itemPrice') as HTMLInputElement;
        const catIn = document.getElementById('itemCategory') as HTMLSelectElement;
        const statIn = document.getElementById('itemStatus') as HTMLSelectElement;
        
        const newQty = parseInt(qtyIn.value);
        const newPrice = parseFloat(priceIn.value);

        if (isNaN(newQty) || newQty < 0 || isNaN(newPrice) || newPrice <= 0) {
            showMessage(formMsgEl, "Error: Quantity and Price must be valid numbers!", true);
            return;
        }

        
        foundItem.quantity = newQty;
        foundItem.price = newPrice;
        foundItem.category = catIn.value as CategoryType;
        foundItem.status = statIn.value as StockStatusType;

        showMessage(formMsgEl, `Success: Item '${targetName}' updated successfully!`, false);
        showInventoryList();
    } else {
        showMessage(formMsgEl, `Error: Item '${targetName}' not found in inventory!`, true);
    }
}

/** Remove project logic.*/
function deleteItem(): void {
    const searchNameIn = document.getElementById('searchItemName') as HTMLInputElement;
    const targetName = searchNameIn.value.trim();

    if (targetName === "") {
        showMessage(feedbackEl, "Please enter a name to delete.", true);
        return;
    }

    let index = -1;
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i].name.toLowerCase() === targetName.toLowerCase()) {
            index = i;
            break;
        }
    }

    if (index !== -1) {
        feedbackEl.innerHTML = `
            <div style="border:1px solid orange; padding:10px; margin-top:10px;">
                <p>Are you sure you want to delete "${targetName}"? 
                <button id='btnYes'>Yes, Delete</button> 
                <button id='btnNo'>Cancel</button></p>
            </div>
        `;
        
        document.getElementById('btnYes')!.onclick = () => {
            inventory.splice(index, 1);
            showInventoryList();
            showMessage(feedbackEl, "Item deleted successfully.", false);
        };
        document.getElementById('btnNo')!.onclick = () => {
            showMessage(feedbackEl, "Deletion cancelled.", false);
        };
    } else {
        showMessage(feedbackEl, "Item name not found for deletion.", true);
    }
}

/** Popular product filter.*/
function showPopularItems(): void {
    const popularItems = inventory.filter(item => item.popular);
    
    if (popularItems.length === 0) {
        listEl.innerHTML = "<p>No popular items marked.</p>";
        return;
    }

    let tableHtml = `<h3>Popular Items</h3><table border="1" style="width:100%; border-collapse: collapse;">
            <tr><th>Name</th><th>Category</th><th>Price</th></tr>`;
    
    popularItems.forEach(item => {
        tableHtml += `<tr><td>${item.name}</td><td>${item.category}</td><td>$${item.price.toFixed(2)}</td></tr>`;
    });
    tableHtml += "</table>";
    listEl.innerHTML = tableHtml;
}



populateSelects();

/** Bind the click event of the HTML button to the corresponding TypeScript function */
document.getElementById('saveItemBtn')!.onclick = addItem;
document.getElementById('showAllItemsBtn')!.onclick = showInventoryList;
document.getElementById('showPopularItemsBtn')!.onclick = showPopularItems;
document.getElementById('searchBtn')!.onclick = searchItem;
document.getElementById('updateItemBtn')!.onclick = updateItem;
document.getElementById('deleteBtn')!.onclick = deleteItem;

/** Clearing form button logic: Reset all input fields to empty values */
document.getElementById('clearFormBtn')!.onclick = () => {
    (document.getElementById('itemId') as HTMLInputElement).value = "";
    (document.getElementById('itemName') as HTMLInputElement).value = "";
    (document.getElementById('itemQuantity') as HTMLInputElement).value = "";
    (document.getElementById('itemPrice') as HTMLInputElement).value = "";
    (document.getElementById('itemSupplier') as HTMLInputElement).value = "";
    (document.getElementById('itemComment') as HTMLTextAreaElement).value = "";
    (document.getElementById('itemPopular') as HTMLInputElement).checked = false;
    formMsgEl.style.display = "none";
};