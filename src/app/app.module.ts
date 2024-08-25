import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ReportesComponent } from './pages/admin/reportes/reportes.component';
import { MapaComponent } from './pages/admin/mapa/mapa.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { HomeComponent } from './pages/user/screens/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { MapViewComponent } from './pages/user/components/map-view/map-view.component';
import { LoadingComponent } from './pages/user/components/loading/loading.component';
import { BtnMyLocationComponent } from './pages/user/components/btn-my-location/btn-my-location.component';
import { SearchBarComponent } from './pages/user/components/search-bar/search-bar.component';
import { SearchResultsComponent } from './pages/user/components/search-results/search-results.component';
import { FormsModule } from '@angular/forms';
import { ReportModalComponent } from './pages/user/components/report-modal/report-modal.component';
import { BtnSendReportComponent } from './pages/user/components/btn-send-report/btn-send-report.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ReportesComponent,
    MapaComponent,
    DashboardComponent,
    HomeComponent,
    PageNotFoundComponent,
    SidebarComponent,
    WelcomeComponent,
    LoadingComponent,
    MapViewComponent,
    BtnMyLocationComponent,
    SearchBarComponent,
    SearchResultsComponent,
    ReportModalComponent,
    BtnSendReportComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ButtonModule,
    BreadcrumbModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
  
})


export class AppModule { }


