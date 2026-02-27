export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: number;
  category_name?: string;
  createdAt?: string;
  updatedAt?: string;
  is_available: boolean;
}

export interface Ingredient {
  id: number;
  name: string;
  stock: number;
  unit: string;
  minimum_stock: number;
  supplier: string;
  purchase_cost: number;
  supplier_contact: string;
}