export interface Subscription {
  id?: string;
  name: string;
  price: number;
  startDate: string;
  category: string;
  description: string;
  // isActive: boolean;
  userId?: number;
}
