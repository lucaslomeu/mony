import { Subscription } from './subscription';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  subscriptions: Subscription[];
}
