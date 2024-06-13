import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import {provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FileUploadComponent } from './services/common/file-upload/file-upload.component';
import { FileUploadDialogComponent } from './dialogs/file-upload-dialog/file-upload-dialog.component';
import {JwtModule} from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    JwtModule.forRoot({
      config : {
        tokenGetter:  () => localStorage.getItem("accessToken"),
        allowedDomains : ["localhost:7000"]
      }
    })
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: "baseUrl", useValue: "https://localhost:7000/api", multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
