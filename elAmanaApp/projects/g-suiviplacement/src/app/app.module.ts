import { NgModule,ModuleWithProviders } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlacementComponent } from './placement/placement.component';
import { NavbarPlacementComponent } from './navbar-placement/navbar-placement.component';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import {MatSortModule} from '@angular/material/sort'; //   Tri table : ng add @angular/materiall
import { SharedprojectModule } from 'projects/shared-project/src/app/app.module';
import { AddPlacementComponent } from './placement/add-placement/add-placement.component';
import { MatTableModule } from '@angular/material/table';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { DashboardPlacementComponent } from './dashboard-placement/dashboard-placement.component';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker'; // datePicker
import {MatNativeDateModule} from '@angular/material/core'; //  datePicker
import {MatOptionModule} from '@angular/material/core';
import {MatAutocompleteModule, MAT_AUTOCOMPLETE_SCROLL_STRATEGY} from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { PlacementImmobilierComponent } from './placement-immobilier/placement-immobilier.component';
import { AddPlacementImmobilierComponent } from './placement-immobilier/add-placement-immobilier/add-placement-immobilier.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { SimulateurPlacementComponent } from './simulateur-placement/simulateur-placement.component';

@NgModule({
  declarations: [
    AppComponent,
    PlacementComponent,
    NavbarPlacementComponent,
    AddPlacementComponent,
    DashboardPlacementComponent,
    PlacementImmobilierComponent,
    AddPlacementImmobilierComponent,
    SimulateurPlacementComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SharedprojectModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ToastrModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    ScrollingModule,
    MatTableExporterModule
  ],
  providers: [
    
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER
   ],
  bootstrap: [AppComponent]
})

export class AppModule { }
@NgModule({})
export class gSuiviPlacementSharedModule { 
  static forRoot(): ModuleWithProviders<gSuiviPlacementSharedModule> {
    return {
      ngModule: gSuiviPlacementSharedModule,
      providers: [],
    }
  }
}
