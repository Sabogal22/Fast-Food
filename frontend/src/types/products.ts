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
