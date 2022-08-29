import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { he_IL } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import he from '@angular/common/locales/he';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MapComponent } from './components/map/map.component';
import { ZipcodeFinderComponent } from './containers/zipcode-finder/zipcode-finder.component';
import { NgzorroModule } from './ngzorro.module';


registerLocaleData(he);

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ZipcodeFinderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiYWhyb25iMzUiLCJhIjoiY2w3ZDdleWNlMWtvMjNub2w2eHJtd2lteiJ9.qvPGmM-MgDHU68F0w7JuJw',
    }),
    NgzorroModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
