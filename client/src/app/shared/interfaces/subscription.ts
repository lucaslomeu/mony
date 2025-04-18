export interface Subscription {
  id?: number;
  name: string;
  price: number;
  startDate: string;
  categoryName: any;
  description: string;
  // isActive: boolean;
  userId?: number;
}
