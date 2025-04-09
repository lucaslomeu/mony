import { Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

export const DASHBOARD_ROUTES: Routes = [
  { path: '', component: DashboardHomeComponent },
];

// export const DASHBOARD_ROUTES: Routes = [
//   {
//     path: '',
//     component: DashboardHomeComponent,
//   },
//   {
//     path: 'assinaturas',
//     loadComponent: () =>
//       import('./assinaturas/assinaturas.component').then(
//         (m) => m.AssinaturasComponent
//       ),
//   },
// ];
