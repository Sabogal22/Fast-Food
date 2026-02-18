export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  minimum_stock: number;
  category: number;
  category_name?: string;
  createdAt?: string;
  updatedAt?: string;
}
