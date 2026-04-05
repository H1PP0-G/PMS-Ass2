/**
 * Author: Wenbo He
 * Student ID: 24832151
 * Assessment: PROG2005 Assessment 2 (A2) - Part 1*/

// Define Union Types instead of Enums for simplicity
export type CategoryType = "Electronics" | "Furniture" | "Clothing" | "Tools" | "Miscellaneous";
export type StockStatusType = "In Stock" | "Low Stock" | "Out of Stock";

// Class definition with a constructor 
export class InventoryItem {
    id: string;
    name: string;
    category: CategoryType;
    quantity: number;
    price: number;
    supplier: string;
    status: StockStatusType;
    popular: boolean;
    comment: string;

    constructor(id: string, name: string, category: CategoryType, quantity: number, price: number, supplier: string, status: StockStatusType, popular: boolean, comment: string) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
        this.supplier = supplier;
        this.status = status;
        this.popular = popular;
        // If no comment is provided, default to an empty string
        this.comment = comment ? comment : ""; 
    }
}