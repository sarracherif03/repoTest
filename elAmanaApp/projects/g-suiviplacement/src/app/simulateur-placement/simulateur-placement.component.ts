import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { placement } from '../Models/placement';
import { OrganismeService } from '../services/organisme.service';
import { PlacementService } from '../services/placement.service';
import { TypeactionService } from '../services/typeaction.service';
import { TypecoteeService } from '../services/typecotee.service';

@Component({
  selector: 'app-simulateur-placement',
  templateUrl: './simulateur-placement.component.html',
  styleUrls: ['./simulateur-placement.component.scss']
})
export class SimulateurPlacementComponent implements OnInit {
  //required select
OrgHasError=true;
constructor(
  public typeactionS : TypeactionService,
  public organismeS : OrganismeService,
  public placementS : PlacementService,
  private dialog:MatDialog,
  public datepipe:DatePipe,
  public typeC: TypecoteeService,

) {  }

ngOnInit(): void {
  this.typeactionS.getTypeaction();
  this.organismeS.getOrganisme();
  this.typeC.getTypeCotee();
  this.placementS.fromData.pla_id_typ_placement = Number(localStorage.getItem("typePlacementId"))
  this.placementS.fromData.pla_id_fonds = Number(localStorage.getItem("typeFondId"))
  this.placementS.fromData.pla_id_sous_placement = Number(localStorage.getItem("typeSousPlacementId"))
  this.placementS.fromData.pla_id_sous_sous_placement = Number(localStorage.getItem("typeSousSousPlacementId"))


  this.placementS.getNameEntreprise();

}
//select required
ValidateOrg(value :any){
  if(value === 0){
  this.OrgHasError=true;
  }else {
    this.OrgHasError=false;

  }

}

resetForm(monForm:NgForm){
  monForm.form.reset();
  this.placementS.fromData = new placement();
}
resetTypeAction(monForm:NgForm){

  //this.placementS.fromData.pla_id_type_action=0;
  this.placementS.fromData.pla_organisme_societe=0;

  this.placementS.fromData.pla_taux_profit=0;
  //this.placementS.fromData.pla_id_type_action=0;
  this.placementS.fromData.pla_prix_jour=0;
  this.placementS.fromData.pla_value_consome_date_jour=0;
  this.placementS.fromData.pla_value_consome_trimestre_comptable=0;
  this.placementS.fromData.pla_value_consome_annee_comptable= 0;

 this.placementS.fromData.pla_societe=" ";
 this.placementS.fromData.pla_nbr_action=0;
 this.placementS.fromData.pla_prix_achat=0;
 this.placementS.fromData.pla_montant_depot=0;
 this.placementS.fromData.pla_date_souscription=" ";
 this.placementS.fromData.pla_date_echeance=" ";

}
//calculer le montant=Nbr action * PrixAchat
onCalculeMntD(){
  if(this.placementS.fromData.pla_prix_achat!=null && this.placementS.fromData.pla_nbr_action!=null){

  var PrixA = this.placementS.fromData.pla_prix_achat
  var NbrA =this.placementS.fromData.pla_nbr_action
  var res = PrixA*NbrA
  this.placementS.fromData.pla_montant_depot=res
  //this.placementS.fromData.pla_value_consome_date_jour=res
  //return res
  if(this.placementS.fromData.pla_prix_achat!=null && this.placementS.fromData.pla_prix_jour!=null){
    let NbrA =this.placementS.fromData.pla_nbr_action
    let NbrJ =this.placementS.fromData.pla_prix_jour
    let res1 = NbrA*NbrJ
    this.placementS.fromData.pla_montant_actualise=res1
    //+/-value
    var result = res1-(this.placementS.fromData.pla_montant_depot)
    this.placementS.fromData.pla_value_consome_date_jour=result

    if(this.placementS.fromData.pla_value_consome_date_jour >0){
         this.placementS.fromData.pla_value_consome_date_jour=this.placementS.fromData.pla_montant_depot

    }

  }


  }

}
  //calculer le montant actualiser =Nbr action * Prix du jour

onCalculeMntDA(){
   if(this.placementS.fromData.pla_prix_achat!=null && this.placementS.fromData.pla_prix_jour!=null){
  let NbrA =this.placementS.fromData.pla_nbr_action
  let NbrJ =this.placementS.fromData.pla_prix_jour
  let res1 = NbrA*NbrJ
  this.placementS.fromData.pla_montant_actualise=res1
  //+/-value
  var result = res1 + (this.placementS.fromData.pla_montant_depot)

  this.placementS.fromData.pla_value_consome_date_jour=result

}

}
  // retour nombre du jour from date

addDays(days : number,futureDate:Date): Date{
  futureDate.setDate(futureDate.getDate() + days);
  return futureDate;
}
    // difference entre 2 dates

elBarakaCalcule(days : number,futureDate:Date): Date{
  futureDate.setDate(futureDate.getDate() - days);
  return futureDate;
}
    // difference entre 2 dates (date souscription/ date echance )

CalculerDiffDate(){
  let myDateS = new Date(this.placementS.fromData.pla_date_souscription)

  let dateSys=new Date()
  var Diff_temps = myDateS.getTime() - dateSys.getTime()
  
  var Diff_jours = Diff_temps / (1000 * 3600 * 24)
  console.log("fffffffffffff")

  console.log(Diff_jours)
  Diff_jours= Math.abs(Math.trunc(Diff_jours))
  //console.log("fffffffffffff")

  //console.log(Diff_jours)
  return Diff_jours
}
    // difference entre 2 dates (date systeme/ date echance )

CalculerDiffDate2(){
  let myDateS = new Date(this.placementS.fromData.pla_date_souscription)

  let dateSys=new Date()
  let dateSys2= dateSys.getFullYear()+"/12/31"
  var Diff_temps = myDateS.getTime() - new Date(dateSys2).getTime()
  var Diff_jours = Diff_temps / (1000 * 3600 * 24)
  Diff_jours= Math.abs(Math.trunc(Diff_jours))
  console.log("zzzzzzzzzzzzzzz")

  console.log(Diff_jours)

  return Diff_jours
  
}
      // calculer PPDateJour

CalculerPPDateJour(){
  let MntD = this.placementS.fromData.pla_montant_depot
  let taux = this.placementS.fromData.pla_taux_profit

  console.log(MntD)

  //let dureeJours = this.placementS.fromData.pla_duree*365
  //console.log(dureeJours)

  //var result = (MntD/dureeJours)*(this.CalculerDiffDate())
  //var res1 = result.toFixed(3)
  var result = (MntD*taux)
  var result1 = (this.CalculerDiffDate()/365)
/*
  console.log("dddddddddddddddddd")
  console.log(this.CalculerD*iffDate())
  console.log(result)

  console.log("rrrrrrrrrrrr")
  console.log(result1)*/
  var result2 = result*result1
  /*console.log("jjjjjjjjjjjjjjjjjj")

  console.log(result2)*/

  var result3 = result2.toFixed(3)
  //console.log(MntD/dureeJours)
  //console.log(typeof(res1))
  this.placementS.fromData.pla_produits_placement_consommes_date_jour=Number(result3)

  //console.log(this.placementS.fromData.pla_produits_placement_consommes_date_jour)

}
        // calculer PPTrimestreCom

CalculerPPTrimestreCom(){
  let MntD = this.placementS.fromData.pla_montant_depot
  let taux = this.placementS.fromData.pla_taux_profit

  console.log(MntD)
  //let dureeJours = this.placementS.fromData.pla_duree*365
  //console.log(dureeJours)
  var result = (MntD*taux)

  var result1 = (90/365)
  var res1 = result*result1

  var resfinal = res1.toFixed(3)
  //console.log(MntD/dureeJours)
  console.log(typeof(res1))
  this.placementS.fromData.pla_produits_placement_consommes_trimestre_comptable=Number(resfinal)
  console.log(this.placementS.fromData.pla_produits_placement_consommes_trimestre_comptable)

}
        // calculer CalculerPPAnneeCom

CalculerPPAnneeCom(){
  let MntD = this.placementS.fromData.pla_montant_depot
  let taux = this.placementS.fromData.pla_taux_profit

  //console.log(MntD)
  //let dureeJours = this.placementS.fromData.pla_duree*365
 // console.log(dureeJours)

  var result = (MntD*taux)
  console.log("hhhhhhhhhhhhhhhhhh")
  console.log(result)
  var res2 = (this.CalculerDiffDate2()/365)
  var resfinal = result*res2
  var res1 = resfinal.toFixed(3)
  //console.log(MntD/dureeJours)
  //console.log(typeof(res1))
  this.placementS.fromData.pla_produits_placement_consommes_annee_comptable=Number(res1)
  //console.log(this.placementS.fromData.pla_produits_placement_consommes_annee_comptable)

}
/*onlyNumberKey(event: { charCode: number; }) {

  return (event.charCode == 8 || event.charCode == 0  ) ? null : event.charCode >= 48 && event.charCode <= 57;
}*/

// calculer date d'échance
onCalculeDateEchance(){
  if(this.placementS.fromData.pla_organisme_societe!=0 && this.placementS.fromData.pla_date_souscription!=null && this.placementS.fromData.pla_duree!=0 ){

    if(this.placementS.fromData.pla_organisme_societe == 1){
      let myDate = new Date(this.placementS.fromData.pla_date_souscription)

      let numberDays = this.placementS.fromData.pla_duree*365
      var futureDate = this.addDays(numberDays,myDate)
      futureDate=this.elBarakaCalcule(this.placementS.fromData.pla_duree*2,futureDate)
      let resCalculeEchance=this.datepipe.transform(futureDate, 'yyyy-MM-dd') || '{}';
      this.placementS.fromData.pla_date_echeance =resCalculeEchance

    }
    if(this.placementS.fromData.pla_organisme_societe != 1){
      let myDate = new Date(this.placementS.fromData.pla_date_souscription)
      let numberDays = this.placementS.fromData.pla_duree*365
      var futureDate = this.addDays(numberDays,myDate)
      let resCalculeEchance=this.datepipe.transform(futureDate, 'yyyy-MM-dd') || '{}';
      this.placementS.fromData.pla_date_echeance =resCalculeEchance
    }
    this.CalculerPPDateJour()
    this.CalculerPPAnneeCom()
    this.CalculerPPTrimestreCom()
  }
}

// Malek Modification
getTodayPrice(nomEntreprise:string){

  this.placementS.getPriceAction(nomEntreprise).subscribe(
    res=>{
      this.placementS.fromData.pla_prix_jour=Number(res)
    },
    err=>{
      this.placementS.fromData.pla_prix_jour=0
    }
  )
  /*
  if(this.placementS.fromData.pla_societe!=null){
    this.placementS.getPriceAction(nomEntreprise)

    this.placementS.fromData.pla_prix_jour =  Number(this.placementS.prixEntreprise)
  }
  else{
    this.placementS.fromData.pla_prix_jour=0
  }*/

  }

  onSubmit(monForm:NgForm){
    alert("BBBBBBBBBBBBB")

  }


}
