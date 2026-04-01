// Defines an enum for product categories
export enum CategoryEnum {
  Electronics = "Electronics",
  Furniture = "Furniture",
  Clothing = "Clothing",
  Tools = "Tools",
  Miscellaneous = "Miscellaneous"
}

// Defines an enum for stock status
export enum StockStatusEnum {
  InStock = "In Stock",
  LowStock = "Low Stock",
  OutOfStock = "Out of Stock"
}

// Defines the interface for an inventory item
export interface InventoryItem {
  id: string; // Unique identifier, cannot be changed after initial entry
  name: string; // Product name
  category: CategoryEnum; // Category, uses the enum
  quantity: number; // Quantity in stock
  price: number; // Price of the item
  supplier: string; // Name of the supplier
  status: StockStatusEnum; // Stock status, uses the enum
  popular: boolean; // Indicates if the item is popular (Yes/No)
  comment?: string; // Optional comment
}