import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  exports:[
    HeaderComponent,
    FooterComponent,
  ],
  bootstrap: [AppComponent]
})
export class SharedprojectModule { }
/*
@NgModule({})
export class SharedprojectModule { 
  static forRoot(): ModuleWithProviders<SharedprojectModule> {
    return {
      ngModule: SharedprojectModule,
      providers: [],
    }
  }
}
}
}
*/