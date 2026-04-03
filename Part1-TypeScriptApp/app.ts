import { InventoryItem, CategoryType, StockStatusType } from './interfaces.js';

// Use let for all global variables
let inventory: InventoryItem[] = [];
let feedbackEl = document.getElementById('appFeedback') as HTMLElement;
let formMsgEl = document.getElementById('formMessage') as HTMLElement;
let listEl = document.getElementById('inventoryList') as HTMLElement;


 // Display feedback messages on the page

 
function showMessage(element: HTMLElement, msg: string, isError: boolean): void {
    element.innerHTML = msg;
    element.style.color = isError ? "red" : "green";
    element.style.display = "block";
}


 //Function 1: Display the inventory list in a table
 //Iterates through the array and builds HTML table rows
 
function showInventoryList(): void {
    let tableHtml: string = `
        <table border="1" style="width:100%; border-collapse: collapse;">
            <tr><th>ID</th><th>Name</th><th>Category</th><th>Qty</th><th>Price</th><th>Status</th><th>Popular</th></tr>
    `;
    
    inventory.forEach(item => {
        tableHtml += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.quantity}</td>
                <td>$${item.price}</td>
                <td>${item.status}</td>
                <td>${item.popular ? "Yes" : "No"}</td>
            </tr>
        `;
    });
    
    tableHtml += "</table>";
    listEl.innerHTML = tableHtml;
}


  //Function 2: Add a new item to the inventory
 // Includes data validation and unique ID check

function addItem(): void {
    // Obtain HTML input elements
    let idIn = document.getElementById('itemId') as HTMLInputElement;
    let nameIn = document.getElementById('itemName') as HTMLInputElement;
    let catIn = document.getElementById('itemCategory') as HTMLSelectElement;
    let qtyIn = document.getElementById('itemQuantity') as HTMLInputElement;
    let priceIn = document.getElementById('itemPrice') as HTMLInputElement;
    let supIn = document.getElementById('itemSupplier') as HTMLInputElement;
    let statIn = document.getElementById('itemStatus') as HTMLSelectElement;
    let popIn = document.getElementById('itemPopular') as HTMLInputElement;
    let comIn = document.getElementById('itemComment') as HTMLTextAreaElement;

    // Retrieve values and convert types
    let id = idIn.value;
    let name = nameIn.value;
    let cat = catIn.value as CategoryType; // Cast to the specific string type
    let qty = parseInt(qtyIn.value);
    let price = parseFloat(priceIn.value);
    let sup = supIn.value;
    let stat = statIn.value as StockStatusType; // Cast to the specific string type
    let pop = popIn.checked;
    let com = comIn.value;

    // Data Validation: Ensure required fields are not empty
    if (id == "" || name == "" || isNaN(qty) || isNaN(price)) {
        showMessage(formMsgEl, "Error: Fill all required fields with valid data!", true);
        return;
    }

    // Uniqueness check for ID: Item ID must be unique 
    let exists = false;
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i].id == id) {
            exists = true;
            break;
        }
    }
    if (exists) {
        showMessage(formMsgEl, "Error: Item ID must be unique!", true);
        return;
    }

    // Create a new object using the Class Constructor
    let newItem = new InventoryItem(id, name, cat, qty, price, sup, stat, pop, com);
    
    // Add the new object to our array
    inventory.push(newItem);
    
    // Clear the form fields after successful addition
    idIn.value = ""; nameIn.value = ""; qtyIn.value = ""; priceIn.value = ""; supIn.value = ""; comIn.value = "";

    showMessage(formMsgEl, "Item '" + name + "' added successfully!", false);
    showInventoryList();
}


 //Function 3: Update existing items

function updateItem(): void {
    let searchNameIn = document.getElementById('searchItemName') as HTMLInputElement;
    let targetName = searchNameIn.value;

    let foundItem: InventoryItem = null;
    // Loop to find the item by name
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i].name.toLowerCase() == targetName.toLowerCase()) {
            foundItem = inventory[i];
            break;
        }
    }

    if (foundItem) {
        // Update values using the inputs currently in the form
        let qtyIn = document.getElementById('itemQuantity') as HTMLInputElement;
        let priceIn = document.getElementById('itemPrice') as HTMLInputElement;
        
        if (qtyIn.value != "") foundItem.quantity = parseInt(qtyIn.value);
        if (priceIn.value != "") foundItem.price = parseFloat(priceIn.value);

        showMessage(feedbackEl, "Item '" + targetName + "' updated!", false);
        showInventoryList();
    } else {
        showMessage(feedbackEl, "Item name not found!", true);
    }
}


 //Function 4: Delete Item with Confirmation
 
 
function deleteItem(): void {
    let searchNameIn = document.getElementById('searchItemName') as HTMLInputElement;
    let targetName = searchNameIn.value;

    let index = -1;
    // Find the item index by name
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i].name.toLowerCase() == targetName.toLowerCase()) {
            index = i;
            break;
        }
    }

    if (index != -1) {
        // Display a confirmation area inside the page 
        feedbackEl.innerHTML = `
            <div style="border:1px solid orange; padding:10px;">
                <p>Are you sure you want to delete "${targetName}"? 
                <button id='btnYes'>Yes, Delete</button> 
                <button id='btnNo'>Cancel</button></p>
            </div>
        `;
        
        // Define button logic
        document.getElementById('btnYes').onclick = function() {
            inventory.splice(index, 1); // Remove from array
            showInventoryList();
            showMessage(feedbackEl, "Item successfully deleted!", false);
        };
        document.getElementById('btnNo').onclick = function() {
            showMessage(feedbackEl, "Deletion cancelled.", false);
        };
    } else {
        showMessage(feedbackEl, "Name not found in inventory.", true);
    }
}

// Initial Button Bindings
document.getElementById('saveItemBtn').onclick = addItem;
document.getElementById('showAllItemsBtn').onclick = showInventoryList;
document.getElementById('deleteBtn').onclick = deleteItem;
document.getElementById('updateItemBtn').onclick = updateItem;