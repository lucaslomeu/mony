export interface Subscription {
  id?: number;
  name: string;
  price: number;
  startDate: string;
  categories: string[];
  description: string;
  // isActive: boolean;
  userId?: number;
}
