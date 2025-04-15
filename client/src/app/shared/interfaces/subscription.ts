export interface Subscription {
  id?: string;
  name: string;
  price: number;
  startDate: string;
  category: any;
  description: string;
  // isActive: boolean;
  userId?: number;
}
