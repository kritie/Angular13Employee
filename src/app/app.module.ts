import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { AuthInterceptorService } from '../app/services/interceptors/auth-interceptor.service';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { HomeComponent } from './ui/home/home.component';
import { EmployeeComponent } from './ui/employee/employee.component';
import { ViewAllComponent } from './ui/employee/view-all/view-all.component';
import { AddUpdateComponent } from './ui/employee/add-update/add-update.component';
import { OptionHighlighterDirective } from './shared/directives/option-highlighter/option-highlighter.directive';
import { SearchPipe } from './shared/pipes/searchEmp/search.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    EmployeeComponent,
    ViewAllComponent,
    AddUpdateComponent,
    OptionHighlighterDirective,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
