import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './core/alert/alert/alert.component';
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
import { PrivacyPolicyComponent } from './pages/landing-page/privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './pages/landing-page/terms-of-use/terms-of-use.component';
import { AdminSideNavComponent } from './pages/shared/components/admin-side-nav/admin-side-nav.component';
import { AdminTopNavComponent } from './pages/shared/components/admin-top-nav/admin-top-nav.component';
import { SideNavigationComponent } from './pages/shared/components/side-navigation/side-navigation.component';
import { TopNavigationComponent } from './pages/shared/components/top-navigation/top-navigation.component';
import { SanitizePermissionsPipe } from './pages/shared/pipes/sanitize-permissions.pipe';
import { UserLayoutComponent } from './pages/user/user-layout/user-layout.component';
import { DashboardComponent } from './pages/user/user-layout/dashboard/dashboard.component';
import { TerminalsComponent } from './pages/user/user-layout/terminals/terminals.component';
import { MerchantsComponent } from './pages/user/user-layout/merchants/merchants.component';
import { AcquirerComponent } from './pages/user/user-layout/acquirer/acquirer.component';
import { StationsComponent } from './pages/user/user-layout/stations/stations.component';
import { TransactionsComponent } from './pages/user/user-layout/transactions/transactions.component';
import { SettlementsComponent } from './pages/user/user-layout/settlements/settlements.component';
import { AuditLogsComponent } from './pages/user/user-layout/audit-logs/audit-logs.component';

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
    PrivacyPolicyComponent,
    TermsOfUseComponent,
    AdminSideNavComponent,
    AdminTopNavComponent,
    SideNavigationComponent,
    TopNavigationComponent,
    SanitizePermissionsPipe,
    UserLayoutComponent,
    DashboardComponent,
    TerminalsComponent,
    MerchantsComponent,
    AcquirerComponent,
    StationsComponent,
    TransactionsComponent,
    SettlementsComponent,
    AuditLogsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
