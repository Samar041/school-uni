import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/*
 * GUARDS
 */
import { AuthGuard } from '../_guard/auth.guard';
import { GuestGuard } from '../_guard/guest.guard';
import { RoleGuard } from '../_guard/role.guard';
/*
 * COMPONENT
 */
import { ActivitiesAreaComponent } from './activities-area/activities-area.component';
import { SpecialitesComponent } from './activities-area/specialites/specialites.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminsComponent } from './admins/admins.component';
import { ViewAdminComponent } from './admins/view-admin/view-admin.component';
import { AffichePublicitaireComponent } from './affiche-publicitaire/affiche-publicitaire.component';
import { AnnoncesListComponent } from './annonces/annonces-list.component';
import { ForgetComponent } from './auth/forget/forget.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetComponent } from './auth/reset/reset.component';
import { CompaniesComponent } from './companies/companies.component';
import { ViewCompanyComponent } from './companies/view-company/view-company.component';
// import { ConfigurationsComponent } from './configurations/configurations.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DemandeListComponent } from './demandes/demande-list.component';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { PromoListComponent } from './promos/promo-list.component';
// import { RegionsComponent } from './regions/regions.component';
import { SuiviDemandesComponent } from './suivi-demandes/suivi-demandes.component';
import { UsersComponent } from './users/users.component';
import { ViewUserComponent } from './users/view-user/view-user.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        canActivate: [RoleGuard],
        component: DashboardComponent,
      },
    ],
  },
  /*
   * AUTH MODULE
   */
  {
    canActivate: [GuestGuard],
    path: 'login',
    component: LoginComponent,
  },
  {
    canActivate: [GuestGuard],
    path: 'forget',
    component: ForgetComponent,
  },
  {
    canActivate: [GuestGuard],
    path: 'reset',
    component: ResetComponent,
  },
  /*
   * DASHBOARD
   */
  {
    path: '',
    canActivate: [AuthGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'users',
        data: { activeFilter: 'users' },
        children: [
          {
            path: '',
            component: UsersComponent,
          },
          {
            path: 'details/:id',
            component: ViewUserComponent,
          },
        ],
      },
      {
        path: 'admins',
        data: { activeFilter: 'users' },
        children: [
          {
            path: '',
            component: AdminsComponent,
          },
          {
            path: 'details/:id',
            component: ViewAdminComponent,
          },
        ],
      },

      {
        path: 'companies',
        data: { activeFilter: 'users' },
        children: [
          {
            path: '',
            component: CompaniesComponent,
          },
          {
            path: 'details/:id',
            component: ViewCompanyComponent,
          },
          {
            path: 'activities',

            children: [
              {
                path: '',
                component: ActivitiesAreaComponent,
              },
              {
                path: ':id',
                component: SpecialitesComponent,
              },
            ],
          },
        ],
      },
      // {
      //   path: 'regions',
      //   component: RegionsComponent,
      // },
      {
        path: 'affiche-publicitaire',
        component: AffichePublicitaireComponent,
      },
      {
        path: 'promos',
        component: PromoListComponent,
      },
      {
        path: 'annonces',
        component: AnnoncesListComponent,
      },
      {
        path: 'demandes',
        data: { activeFilter: 'demande' },
        component: DemandeListComponent,
      },
      {
        path: 'suivi-demandes',
        data: { activeFilter: 'demande' },
        component: SuiviDemandesComponent,
      },
      {
        path: 'messagerie',
        component: MessagerieComponent,
      },
      // {
      //   path: 'configurations',
      //   component: ConfigurationsComponent,
      // },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackadminRoutingModule {}
