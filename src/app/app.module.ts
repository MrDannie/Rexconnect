import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './core/alert/alert/alert.component';
import { InterceptorService } from './core/helpers/interceptors/interceptor.service';
import { AllServicesComponent } from './pages/landing-page/all-services/all-services.component';
import { CompleteRegistrationComponent } from './pages/landing-page/authentication/complete-registration/complete-registration.component';
import { CreateAccountComponent } from './pages/landing-page/authentication/create-account/create-account.component';
import { RecoverPasswordComponent } from './pages/landing-page/authentication/recover-password/recover-password.component';
import { SetNewPasswordComponent } from './pages/landing-page/authentication/set-new-password/set-new-password.component';
import { SignInComponent } from './pages/landing-page/authentication/sign-in/sign-in.component';
import { FaqsComponent } from './pages/landing-page/faqs/faqs.component';
import { FooterComponent } from './pages/landing-page/footer/footer.component';
import { HomeComponent } from './pages/landing-page/home/home.component';
import { LandingNavComponent } from './pages/landing-page/landing-nav/landing-nav.component';
import { AdminSideNavComponent } from './pages/shared/components/admin-side-nav/admin-side-nav.component';
import { AdminTopNavComponent } from './pages/shared/components/admin-top-nav/admin-top-nav.component';
import { SharedModule } from './pages/shared/modules/shared.module';
import { AuditLogsComponent } from './pages/user/user-layout/audit-logs/audit-logs.component';
import { DashboardComponent } from './pages/user/user-layout/dashboard/dashboard.component';
import { PtspManagementModule } from './pages/user/user-layout/ptsp-managements/ptsp-management.module';
// import { DashboardComponent } from './pages/user/user-layout/dashboard/dashboard.component';
// import { MerchantsComponent } from './pages/user/user-layout/merchants/merchants.component';
// import { SettlementsComponent } from './pages/user/user-layout/settlements/settlements.component';
// import { StationsComponent } from './pages/user/user-layout/stations/stations.component';
import { TransactionsComponent } from './pages/user/user-layout/transactions/transactions.component';
// import { SanitizePermissionsPipe } from './pages/shared/pipes/sanitize-permissions.pipe';
import { UserLayoutComponent } from './pages/user/user-layout/user-layout.component';
import { ResolveTimeDifferncePipe } from './pages/shared/pipes/resolve-time-differnce.pipe';
import { TransactionDetailsComponent } from './pages/user/user-layout/transactions/transaction-details/transaction-details.component';
// // import { ResolveTimeDifferncePipe } from './pages/shared/pipes/resolve-time-differnce.pipe';
// import { TerminalsComponent } from './pages/user/user-layout/terminals/terminals.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    AllServicesComponent,
    CompleteRegistrationComponent,
    CreateAccountComponent,
    RecoverPasswordComponent,
    SetNewPasswordComponent,
    SignInComponent,
    FaqsComponent,
    FooterComponent,
    HomeComponent,
    LandingNavComponent,

    AdminSideNavComponent,
    AdminTopNavComponent,
    // SanitizePermissionsPipe,
    UserLayoutComponent,
    AuditLogsComponent,
    DashboardComponent,
    TransactionsComponent,
    ResolveTimeDifferncePipe,
    TransactionDetailsComponent,
    // TerminalsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    DatePickerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    ResolveTimeDifferncePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
