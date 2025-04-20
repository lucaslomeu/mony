export interface Subscription {
  id?: number;
  name: string;
  price: number;
  startDate: string;
  category: string[];
  description: string;
  // isActive: boolean;
  userId?: number;
}
