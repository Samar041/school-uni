import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackadminRoutingModule } from './backadmin-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from './shared/shared.module';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { DialogModule } from "primeng/dialog";
import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { InputNumberModule } from 'primeng/inputnumber';
import { FieldsetModule } from "primeng/fieldset";
import { SplitterModule } from "primeng/splitter";
import { AnimateModule } from 'primeng/animate';
import { CheckboxModule } from "primeng/checkbox";
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from "primeng/avatar";
import { CardModule } from "primeng/card";
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectButtonModule } from "primeng/selectbutton";
import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { LoginComponent } from './auth/login/login.component';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { HeaderBackadminComponent } from './shared/header-backadmin/header-backadmin.component';
import { ResetComponent } from './auth/reset/reset.component';
import { ForgetComponent } from './auth/forget/forget.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ViewUserComponent } from './users/view-user/view-user.component';
import { AdminsComponent } from './admins/admins.component';
import { ViewAdminComponent } from './admins/view-admin/view-admin.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { AddAdminComponent } from './admins/add-admin/add-admin.component';
import { UpdateAdminComponent } from './admins/update-admin/update-admin.component';
import { UpdatePasswordComponent } from './admins/update-password/update-password.component';
import { CompaniesComponent } from './companies/companies.component';
import { AddCompanyComponent } from './companies/add-company/add-company.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { EditCompanyComponent } from './companies/edit-company/edit-company.component';
import { ViewCompanyComponent } from './companies/view-company/view-company.component';
import { DatePipe } from '@angular/common';
import { MultiSelectModule } from "primeng/multiselect";
import { TagModule } from 'primeng/tag';
import { ActivitiesAreaComponent } from './activities-area/activities-area.component';
import { AddActivityComponent } from './activities-area/add-activity/add-activity.component';
import { UpdateActivityComponent } from './activities-area/update-activity/update-activity.component';
import { SpecialitesComponent } from './activities-area/specialites/specialites.component';
import { AddSpecialitesComponent } from './activities-area/specialites/add-specialites/add-specialites.component';
import { UpdateSpecialitesComponent } from './activities-area/specialites/update-specialites/update-specialites.component';
import { TabViewModule } from 'primeng/tabview';
import { TreeSelectModule } from 'primeng/treeselect';
import { RegionsComponent } from './regions/regions.component';
import { AddRegionComponent } from './regions/add-region/add-region.component';
import { UpdateRegionComponent } from './regions/update-region/update-region.component';
import { AffichePublicitaireComponent } from './affiche-publicitaire/affiche-publicitaire.component';
import { EditPubComponent } from './affiche-publicitaire/edit-pub/edit-pub.component';
import { AddPubComponent } from './affiche-publicitaire/add-pub/add-pub.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DetailAfficheComponent } from './affiche-publicitaire/detail-affiche/detail-affiche.component';
import { PromoListComponent } from './promos/promo-list.component';
import { EditPromoComponent } from './promos/edit-promo/edit-promo.component';
import { DetailPromoComponent } from './promos/detail-promo/detail-promo.component';
import { AddPromoComponent } from './promos/add-promo/add-promo.component';
import { AnnoncesListComponent } from './annonces/annonces-list.component';
import { DetailAnnoncesComponent } from './annonces/detail-annonce/detail-annonces.component';
import { EditAnnoncesComponent } from './annonces/edit-annonce/edit-annonces.component';
import { AddAnnounceComponent } from './annonces/add-annonce/add-annonces.component';
import { AddDemandeComponent } from './demandes/add-demande/add-demande.component';
import { UpdateDemandeComponent } from './demandes/update-demande/update-demande.component';
import { DemandeListComponent } from './demandes/demande-list.component';
import { SuiviDemandesComponent } from './suivi-demandes/suivi-demandes.component';
import { DragDropModule } from 'primeng/dragdrop';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DetailsDemandeComponent } from './suivi-demandes/details-demande/details-demande.component';
import { CardDemandeComponent } from './suivi-demandes/card-demande/card-demande.component';
import { DataViewModule } from 'primeng/dataview';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { InputMaskModule } from 'primeng/inputmask';
import { AssignProviderModalComponent } from './suivi-demandes/assign-provider-modal/assign-provider-modal.component';
import { ToastModule } from 'primeng/toast';
import { AssignRegionComponent } from './admins/assign-region/assign-region.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginComponent,
    SidebarComponent,
    HeaderBackadminComponent,
    ResetComponent,
    ForgetComponent,
    DashboardComponent,
    UsersComponent,
    AddUserComponent,
    ViewUserComponent,
    UpdateUserComponent,
    AdminsComponent,
    AddAdminComponent,
    UpdateAdminComponent,
    ViewAdminComponent,
    UpdatePasswordComponent,
    CompaniesComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    ViewCompanyComponent,
    ActivitiesAreaComponent,
    AddActivityComponent,
    UpdateActivityComponent,
    SpecialitesComponent,
    AddSpecialitesComponent,
    UpdateSpecialitesComponent,
    RegionsComponent,
    AddRegionComponent,
    UpdateRegionComponent,
    AffichePublicitaireComponent,
    EditPubComponent,
    AddPubComponent,
    DetailAfficheComponent,
    PromoListComponent,
    EditPromoComponent,
    DetailPromoComponent,
    AddPromoComponent,
    AnnoncesListComponent,
    DetailAnnoncesComponent,
    EditAnnoncesComponent,
    AddAnnounceComponent,
    AddDemandeComponent,
    UpdateDemandeComponent,
    DemandeListComponent,
    SuiviDemandesComponent,
    DetailsDemandeComponent,
    CardDemandeComponent,
    MessagerieComponent,
    ConfigurationsComponent,
    AssignProviderModalComponent,
    AssignRegionComponent
  ],
  bootstrap: [AdminLayoutComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    TabViewModule,
    BackadminRoutingModule,
    NgChartsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    TableModule,
    DropdownModule,
    SkeletonModule,
    ButtonModule,
    RippleModule,
    MenuModule,
    InputNumberModule,
    FieldsetModule,
    SplitterModule,
    AnimateModule,
    CheckboxModule,
    AutoCompleteModule,
    AvatarModule,
    CardModule,
    NgbDatepickerModule,
    NgbNavModule,
    SelectButtonModule,
    CalendarModule,
    ProgressSpinnerModule,
    SplitButtonModule,
    NgxIntlTelInputModule,
    MultiSelectModule,
    TagModule,
    TreeSelectModule,
    DataViewModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RadioButtonModule,
    NgScrollbarModule,
    DragDropModule,
    InputMaskModule,
    ToastModule
  ],
  providers: [DatePipe]
})
export class BackadminModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
