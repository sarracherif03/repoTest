import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { placement } from '../Models/placement';
import { FormControl, NgForm } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { PlacementService } from '../services/placement.service';
import { AddPlacementComponent } from './add-placement/add-placement.component';
import { AuthorizationWithoutRootService } from 'projects/g-acces/src/app/services/authorization-without-root.service';
import { OrganismeService } from '../services/organisme.service';
import { TypeactionService } from '../services/typeaction.service';
import { map, startWith } from 'rxjs/operators';
import * as XLSX from "xlsx"
import { MatTableExporterDirective, MatTableExporterModule } from 'mat-table-exporter';

//////////////////////////////////////////


@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  styleUrls: ['./placement.component.scss']
})
export class PlacementComponent implements OnInit {
filename="ExcelSheet.xlsx"
  constructor(public dialog:MatDialog,
    public plaService:PlacementService,
    public typeActService:TypeactionService,
    public toaster:ToastrService,
    public _liveAnnouncer: LiveAnnouncer,
    public _MatPaginatorIntl: MatPaginatorIntl,
    public authService:AuthorizationWithoutRootService,
    public orgService:OrganismeService) { }

    exportExcel( ): void {
      const timeSpan = new Date().toISOString();
      const prefix = "file" || 'ExportResult';
      const fileName = `${prefix}-${timeSpan}`;
      const targetTableElm = document.getElementById('excel-table');
      const wb = XLSX.utils.table_to_book(targetTableElm, { sheet: prefix } as 
      XLSX.Table2SheetOpts);
      XLSX.writeFile(wb, `${fileName}.xlsx`);
    }

    listfunctionalitiesInThisComponent=["ajouter placement"] // WARNING: The name of functionalities in this list must be the same in the function table
    displayedColumns: string[] ;
    dataSource:MatTableDataSource<any>;
    searchWord="" 
    filterDiv=""
    functionSearchfor : Function
    etatPlacement=true

    showTable="affiche1"

    sommepla_produits_placement_consommes_date_jour:number
    sommepla_produits_placement_consommes_trimestre_comptable:number
    sommepla_produits_placement_consommes_annee_comptable:number
    sommepla_value_consome_date_jour:number
    sommepla_value_consome_trimestre_comptable:number
    sommepla_value_consome_annee_comptable:number

    typeSousPlacementId:number
    typeSousSousPlacementId:number
    typeFondId:number
    typePlacementId:number

    myControl = new FormControl();
    filteredOptions: Observable<string[]>;
    

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator, { static: true } ) paginator :MatPaginator;
    @ViewChild(MatTableExporterDirective) matTableExporter: MatTableExporterDirective;


  onCreate(){
    // Popup Ajouter Placement
    this.dialog.open(AddPlacementComponent,{
      maxHeight:"100vh"
    })
  }

 

  applyFilter($event:any){
    // Filtre recherche Angular material
    this.dataSource.filter=$event.target.value;

  }

  announceSortChange(sortState: Sort) {
    // Tri Angular material table
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.authService.getFunctionalities(this.listfunctionalitiesInThisComponent) 
    // Récuperer les ids des bouttons dans le navBar à partire de localItem 
    this.typeSousPlacementId=Number(localStorage.getItem("typeSousPlacementId"))
    this.typePlacementId= Number(localStorage.getItem("typePlacementId"))
    this.typeSousSousPlacementId=Number(localStorage.getItem("typeSousSousPlacementId"))
    this.typeFondId= Number(localStorage.getItem("typeFondId"))

    // Appeles des webServices organismes et typeAction pour l'affichage
    this.orgService.getOrganisme()
    this.typeActService.getTypeaction()

    this._MatPaginatorIntl.itemsPerPageLabel="Placement par page" // Change text in Angular Material Paginator

}


  ngAfterViewInit() {
    // Initialement on charge la page avec des placements de type : contrat Moudharaba / Titres Participatifs / Contrat Isthmar ...
    this.showTable="affiche1"
    try{
      let listplacement: any = [ ];
      this.sommepla_produits_placement_consommes_date_jour=0
      this.sommepla_produits_placement_consommes_trimestre_comptable=0
      this.sommepla_produits_placement_consommes_annee_comptable=0
  
      this.plaService.getPlacementResolver().subscribe(data=>{
        for(let item of data){
          if( item.pla_id_typ_placement == this.typePlacementId && item.pla_id_fonds == this.typeFondId && item.pla_id_sous_placement == this.typeSousPlacementId && item.pla_id_sous_sous_placement == this.typeSousSousPlacementId ){ 
            if( item.pla_id_type_action == 1  || item.pla_id_type_action ==2 || item.pla_id_type_action == 3 || item.pla_id_type_action == 4 || item.pla_id_type_action == 5 ){
              listplacement.push(item)
              //Somme
              this.sommepla_produits_placement_consommes_date_jour=this.sommepla_produits_placement_consommes_date_jour+item.pla_produits_placement_consommes_date_jour
              this.sommepla_produits_placement_consommes_trimestre_comptable=this.sommepla_produits_placement_consommes_trimestre_comptable+item.pla_produits_placement_consommes_trimestre_comptable
              this.sommepla_produits_placement_consommes_annee_comptable=this.sommepla_produits_placement_consommes_annee_comptable+item.pla_produits_placement_consommes_annee_comptable
  
              this.displayedColumns = ["pla_organisme_societe","pla_montant_depot","pla_taux_profit","pla_date_souscription","pla_date_echeance","pla_duree",
              "pla_produits_placement_consommes_date_jour", "pla_produits_placement_consommes_trimestre_comptable","pla_produits_placement_consommes_annee_comptable","pla_taux_retenue","taux_moudharba"];
            }
          }
        }
      
        this.dataSource= new MatTableDataSource(listplacement)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
    }
    catch{
      try{
        // Si on trouve pas de palcement dans le premeir type on charge 
        this.showTable="affiche2"
      }
      catch{
        this.showTable="affiche3"
      }
    }

  }


  ShowDiv(divVal: string) {
      this.filterDiv = divVal;
      this.plaService.fromData.pla_id_type_action==0
      // Display all users
      this.ngAfterViewInit();
      
  }

    search(functionSearchfor : NgForm){
      let listplacement: any = [ ];
      if(functionSearchfor.value.typePlacement == 1 || functionSearchfor.value.typePlacement == 1 || 
        functionSearchfor.value.typePlacement == 3 || functionSearchfor.value.typePlacement == 4 ||
        functionSearchfor.value.typePlacement == 5  ){
        this.ngAfterViewInit();
      }
      
      if(functionSearchfor.value.placementCote == 1){
        this.showTable="affiche2"
        this.sommepla_value_consome_date_jour=0
        this.sommepla_value_consome_trimestre_comptable=0
        this.sommepla_value_consome_annee_comptable=0
        this.plaService.getPlacementResolver().subscribe(data=>{
          for(let item of data){
            if( item.pla_id_typ_placement == this.typePlacementId && item.pla_id_fonds == this.typeFondId && item.pla_id_sous_placement == this.typeSousPlacementId && item.pla_id_sous_sous_placement == this.typeSousSousPlacementId ){              if( item.pla_id_type_action == 6  && item.pla_action_cotee ==1 ){ 
                listplacement.push(item)
                //Somme
                this.sommepla_value_consome_date_jour=this.sommepla_value_consome_date_jour + item.pla_value_consome_date_jour
                this.sommepla_value_consome_trimestre_comptable=this.sommepla_value_consome_trimestre_comptable +item.pla_value_consome_trimestre_comptable
                this.sommepla_value_consome_annee_comptable=this.sommepla_value_consome_annee_comptable + item.pla_value_consome_annee_comptable

                this.displayedColumns = ["pla_societe","pla_nbr_action","pla_prix_achat","pla_montant_depot","pla_date_souscription","pla_prix_jour","pla_montant_actualise",
                "pla_value_consome_date_jour", "pla_value_consome_trimestre_comptable","pla_value_consome_annee_comptable"];
              }
            }
          }
        
          this.dataSource= new MatTableDataSource(listplacement)
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        })
      }

      if(functionSearchfor.value.placementCote == 2){
        this.showTable="affiche3"
        this.plaService.getPlacementResolver().subscribe(data=>{
          for(let item of data){
            if( item.pla_id_typ_placement == this.typePlacementId && item.pla_id_fonds == this.typeFondId && item.pla_id_sous_placement == this.typeSousPlacementId && item.pla_id_sous_sous_placement == this.typeSousSousPlacementId ){             
               if( item.pla_id_type_action == 6  && item.pla_action_cotee ==2 ){ 
                listplacement.push(item)
                this.displayedColumns = ["pla_societe","pla_nbr_action","pla_prix_achat","pla_montant_depot","pla_date_souscription"];
              }
            }
          }
        
          this.dataSource= new MatTableDataSource(listplacement)
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        })
      }

      if(functionSearchfor.value.typePlacement == 7){
        this.sommepla_value_consome_annee_comptable= 0 

          this.showTable="affiche4"
          this.plaService.getPlacementResolver().subscribe(data=>{
            for(let item of data){
              if( item.pla_id_typ_placement == this.typePlacementId && item.pla_id_fonds == this.typeFondId && item.pla_id_sous_placement == this.typeSousPlacementId && item.pla_id_sous_sous_placement == this.typeSousSousPlacementId ){             
                if( item.pla_id_type_action == 7 ){ 
                  listplacement.push(item)
                  this.sommepla_value_consome_annee_comptable=this.sommepla_value_consome_annee_comptable + item.pla_value_consome_annee_comptable

                  this.displayedColumns = ["pla_montant_depot","pla_date_souscription","pla_Vliqui","pla_value_consome_annee_comptable"];
                }
              }
            }
          
            this.dataSource= new MatTableDataSource(listplacement)
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          })
        
      }
    }

    importAsXlsx(){
      this.matTableExporter.exportTable('xlsx', {fileName:'test', sheet: 'sheet_name'});
      }
      
}

