/**
 * Author: Wenbo He
 * Student ID: 24832151
 * Assessment: PROG2005 Assessment 2 (A2) - Part 2*/
export type Category = "Electronics" | "Furniture" | "Clothing" | "Tools" | "Miscellaneous";
export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";
export type PopularItem = "Yes" | "No";

export interface InventoryItem {
  id: string;         // Item ID (Unique)
  name: string;       // Item Name
  category: Category;
  quantity: number;
  price: number;
  supplierName: string;
  stockStatus: StockStatus;
  popularItem: PopularItem;
  comment?: string;   // 可选字段
}