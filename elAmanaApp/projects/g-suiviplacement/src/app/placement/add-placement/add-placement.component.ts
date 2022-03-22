import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { PlacementService } from './../../services/placement.service';
import { TypeactionService } from './../../services/typeaction.service';
import {MatDialog} from '@angular/material/dialog';
import { placement } from './../../Models/placement';
import { OrganismeService } from './../../services/organisme.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from './../../services/navbar.service';
import { TypecoteeService } from './../../services/typecotee.service';
import { Component, OnInit } from '@angular/core';
import { NumberValue } from 'd3';
import { intermediaireB } from '../../Models/intermediaireB';
import { IntermediaireBService } from '../../services/intermediaire-b.service';
import { DetailsEmpService } from '../../services/details-emp.service';

@Component({
  selector: 'app-add-placement',
  templateUrl: './add-placement.component.html',
  styleUrls: ['./add-placement.component.scss']
})
export class AddPlacementComponent implements OnInit {

//hypothese
//private hypo: string[];
selecthypothese=0

//required select
OrgHasError=true;
constructor(
  public typeactionS : TypeactionService,
  public organismeS : OrganismeService,
  public placementS : PlacementService,
  private dialog:MatDialog,
  public datepipe:DatePipe,
  public toaster:ToastrService,
  public navbarS : NavbarService,
  public typeC: TypecoteeService,
  public interB : IntermediaireBService,
  public detaisEmpS: DetailsEmpService
) {  }

ngOnInit(): void {
  this.typeactionS.getTypeaction();
  this.organismeS.getOrganisme();
  this.typeC.getTypeCotee();
  this.interB.getinterB();
  this.placementS.fromData.pla_id_typ_placement = Number(localStorage.getItem("typeSousPlacementId"))
  this.placementS.fromData.pla_id_fonds = Number(localStorage.getItem("typeFondId"))
  this.placementS.fromData.pla_id_sous_placement = Number(localStorage.getItem("typePlacementId"))
  this.placementS.getNameEntreprise();
  //this.hypo =  ['Hypothése 1', 'Hypothése 1'];


}


///////////////////////////////////////////////////////////////////////////

//select required
ValidateOrg(value :any){
  if(value === 0){
  this.OrgHasError=true;
  }else {
    this.OrgHasError=false;
  }
}
///////////////////////////////////////////////////////////////////////////

//close dialog
closeDialog(monForm : NgForm){
  this.dialog.closeAll();
  this.resetForm(monForm);
  //window.location.reload();
}
///////////////////////////////////////////////////////////////////////////

//insert data
insertData(){
  if(this.placementS.fromData.pla_id_type_action == 5 || this.placementS.fromData.pla_id_type_action == 6 || this.placementS.fromData.pla_id_type_action == 7 ){
    //
    this.placementS.fromData.pla_date_echeance=this.datepipe.transform("2100-12-31", 'yyyy-MM-dd') || '{}';

  }

  this.placementS.postPlacement().subscribe(
    res=>{
      //this.resetForm(monForm);
      //this.placementS.refreshComponent()
      console.log("test")

      this.toaster.success("Placement ajouté avec succès","Ajout")
      if(this.selecthypothese == 2 && this.placementS.fromData.pla_id_type_action==4 ){
        let listPlacement_id:number[]=[]
      this.placementS.getPlacementResolver().subscribe(
        res=>{
          let lastIdPlacement=0
          for(let item of res){
            lastIdPlacement=item.pla_id
          }

          for(let i=0;i<this.calculeEmpruntObligataire().listProduitPlacement.length;i++){
            listPlacement_id.push(lastIdPlacement)
          }
          // Add detail Emprunt Obligataire
          for(let i=0;i<this.calculeEmpruntObligataire().listProduitPlacement.length;i++ ){

            this.detaisEmpS.fromData.pla_id=listPlacement_id[i]
            this.detaisEmpS.fromData.Emp_annee=this.calculeEmpruntObligataire().listeAnnee[i]
            this.detaisEmpS.fromData.Emp_PP=this.calculeEmpruntObligataire().listProduitPlacement[i]
            this.detaisEmpS.postdetailsEmp().subscribe(
              res=>{
                this.toaster.success("Details Emprunts Obligataires ajoutés ","Ajout")


              },err=>{

              }
            )
          }



        }
      )
    }

    },
    err => {
      this.toaster.error("Échec d'ajouter Placement : ","Ajout")
      console.log(err);
    }
  );
}
///////////////////////////////////////////////////////////////////////////
// confirm form
onSubmit(monForm : NgForm){
  this.insertData()
  //this.closeDialog(monForm)
  //monForm.reset();
}
///////////////////////////////////////////////////////////////////////////

// reset from
resetForm(monForm:NgForm){
  monForm.form.reset();
  this.placementS.fromData = new placement();
}
///////////////////////////////////////////////////////////////////////////
//reset champs form
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
 this.placementS.fromData.pla_mois=0;
 this.placementS.fromData.pla_produits_placement_consommes_ech_final=0;
}


///////////////////////////////////////////////////////////////////////////
//Clcuper produit placement compte rémunéré
/*
oncalculeCompteR(){
  if(this.placementS.fromData.pla_montant_depot!=null && this.placementS.fromData.pla_taux_profit!=null){
  let MntD = this.placementS.fromData.pla_montant_depot
  let taux = this.placementS.fromData.pla_taux_profit
  let res = MntD*taux
  this.placementS.fromData.pla_value_consome_annee_comptable=res
  }

}*/
///////////////////////////////////////////////////////////////////////////
/*************************************************************************/
//calculer le montant depot action cotee

onCalculeMntD1(){
  if(this.placementS.fromData.pla_prix_achat!=null && this.placementS.fromData.pla_nbr_action!=null){
  var PrixA = this.placementS.fromData.pla_prix_achat
  var NbrA =this.placementS.fromData.pla_nbr_action
  var res = PrixA*NbrA
  this.placementS.fromData.pla_montant_depot=res

}
}
///////////////////////////////////////////////////////////////////////////
//calculer le montant depot
onCalculeMntD():any{
  if(this.placementS.fromData.pla_prix_achat!=null && this.placementS.fromData.pla_nbr_action!=null&& this.placementS.fromData.pla_prix_jour!=null){
  let PrixJ=this.placementS.fromData.pla_prix_jour
  this.placementS.fromData.pla_prix_achat=PrixJ
  var PrixA = this.placementS.fromData.pla_prix_achat
  var NbrA =this.placementS.fromData.pla_nbr_action
  var res = PrixA*NbrA
  this.placementS.fromData.pla_montant_depot=res
  //this.placementS.fromData.pla_value_consome_date_jour=res
  //return res
    let NbrJ =this.placementS.fromData.pla_prix_jour
    let res1 = NbrA*NbrJ
    this.placementS.fromData.pla_montant_actualise=res1
    return res1
    //  +/-value à la date du jour
    //var result = res1-res
    //this.placementS.fromData.pla_value_consome_date_jour=result
    /*if(this.placementS.fromData.pla_value_consome_date_jour >0){
         this.placementS.fromData.pla_value_consome_date_jour=this.placementS.fromData.pla_montant_depot
    }*/
  }
}
///////////////////////////////////////////////////////////////////////////
//calculer le montant Actualisé

onCalculeMntDA(){

   if(this.placementS.fromData.pla_prix_achat!=null && this.placementS.fromData.pla_prix_jour!=null){
  let NbrA =this.placementS.fromData.pla_nbr_action
  let NbrJ =this.placementS.fromData.pla_prix_jour
  let res1 = NbrA*NbrJ
  this.placementS.fromData.pla_montant_actualise=res1
  let res=this.onCalculeMntD()
  //+/-value
  var result = res1 - res
  this.placementS.fromData.pla_value_consome_date_jour=result
  //let PrixJ=this.placementS.fromData.pla_prix_jour
  //this.placementS.fromData.pla_prix_achat=PrixJ

}

}
///////////////////////////////////////////////////////////////////////////
//retourner  nombres de jours entre une date bien détéminée

addDays(days : number,futureDate:Date): Date{
  futureDate.setDate(futureDate.getDate() + days);
  return futureDate;
}
////////////////////////////////////////////////////////////////////////////
//retourner  nombres de jours entre une date bien détéminée

/*
elBarakaCalcule(days : number,futureDate:Date): Date{
  futureDate.setDate(futureDate.getDate() - days);
  return futureDate;
}*/

////////////////////////////////////////////////////////////////////////////
// *Difference entre 2 dates = nombres de jours  (date souscription- date systéme )

CalculerDiffDate(){
  let myDateS = new Date(this.placementS.fromData.pla_date_souscription)

  let dateSys=new Date()
  var Diff_temps = myDateS.getTime() - dateSys.getTime()

  var Diff_jours = Diff_temps / (1000 * 3600 * 24)
  //console.log("fffffffffffff")

  console.log(Diff_jours)
  Diff_jours= Math.abs(Math.trunc(Diff_jours))
  //console.log("fffffffffffff")
  //console.log(Diff_jours)
  return Diff_jours
}
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//ajouter nombre de mis à date systéme
oncalculeMois():Date{

  console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
  var m = this.placementS.fromData.pla_mois;
  var d=new Date(this.placementS.fromData.pla_date_souscription); // date du jour

  console.log("ddddddddddddddddddd")
  console.log(d)


   m= (d.getMonth() + m );

  console.log("aaaaaaaaaaaaaaaaa")
  console.log(m)
  d.setMonth(m);


  console.log("bbbbbbbbbbbbbbbbbbbbbbbbb")
  console.log(d)


  return d
  }
////////////////////////////////////////////////////////////////////////////////////
// *Difference entre 2 dates = nombres de jours  (date souscription- date antérieur)

CalculerDiffDateDuree(){
  let myDateS = this.oncalculeMois()

  let dateSys=new Date(this.placementS.fromData.pla_date_souscription)
  var Diff_temps = myDateS.getTime() - dateSys.getTime()

  var Diff_jours = Diff_temps / (1000 * 3600 * 24)
  console.log("1111111111")

  console.log(Diff_jours)
  Diff_jours= Math.abs(Math.trunc(Diff_jours))
  console.log("2222222222222222")

  console.log(Diff_jours)
  return Diff_jours
}
////////////////////////////////////////////////////////////////////////////////////
// *Difference entre 2 dates = nombres de jours  (date souscription-31/12/annee)

CalculerDiffDate2(){
  let myDateS = new Date(this.placementS.fromData.pla_date_souscription)

  let dateSys=new Date(this.placementS.fromData.pla_date_souscription)
  let dateSys2= dateSys.getFullYear()+"/12/31"
  var Diff_temps = myDateS.getTime() - new Date(dateSys2).getTime()
  var Diff_jours = (Diff_temps / (1000 * 3600 * 24) )
  Diff_jours= Math.abs(Math.trunc(Diff_jours)-2)
  console.log("SARAAAAAAAAAAAAAAAAA")

  console.log(Diff_jours)

  return Diff_jours

}
////////////////////////////////////////////////////////////
//calculer produits placements fin echeance

CalculerDiffecheance(){
  let myDateS = new Date(this.placementS.fromData.pla_date_echeance)

  let dateSys=new Date(this.placementS.fromData.pla_date_souscription)
  var Diff_temps = myDateS.getTime() - new Date(dateSys).getTime()
  var Diff_jours = (Diff_temps / (1000 * 3600 * 24) )
  Diff_jours= Math.abs(Math.trunc(Diff_jours))

  console.log("zzzzzzzzzzzzzzz")

  console.log(Diff_jours)

  return Diff_jours

}
//////////////////////////////////////////////////////////////////
//Vérifier si annee bisextille ou non
CalculerAnneeBisextille():any{
  let myDateS = new Date(this.placementS.fromData.pla_date_souscription)
  let myDateS1= myDateS.getFullYear()
  if (myDateS1 / 4 == 0)
  { if ( 100 / myDateS1 == 0 )
     { if ( 400 / myDateS1  ==0)
     {
      var res =366
      return res
      }
    }
  } else
  {
      var res =365
      return res
  }
}
//////////////////////////////////////////////////////////////////
//calculer PPDateJour
CalculerPPDateJour(){
  let MntD = this.placementS.fromData.pla_montant_depot
  let taux = this.placementS.fromData.pla_taux_profit
  var s1 =this.CalculerAnneeBisextille()
  var result = ((MntD*taux)/100)/s1
  var result1 = (this.CalculerDiffDate())
  var result2 = result*result1
  var result3 = result2.toFixed(3)
  this.placementS.fromData.pla_produits_placement_consommes_date_jour=Number(result3)
}

//////////////////////////////////////////////////////////////////
//calculer PPTrimestreCom


CalculerPPTrimestreCom(){
  let MntD = this.placementS.fromData.pla_montant_depot
  let taux = this.placementS.fromData.pla_taux_profit
  var s1 =this.CalculerAnneeBisextille()
  var result = ((MntD*taux)/100)/s1
  var result1 = (90/s1)
  var res1 = result*result1
  var resfinal = res1.toFixed(3)
  this.placementS.fromData.pla_produits_placement_consommes_trimestre_comptable=Number(resfinal)

}
//////////////////////////////////////////////////////////////////
//calculer CalculerPPAnneeCom
CalculerPPAnneeCom(){
  let MntD = this.placementS.fromData.pla_montant_depot

  let taux = this.placementS.fromData.pla_taux_profit

  var s1 =this.CalculerAnneeBisextille()
  var result = ((MntD*taux)/100)/s1

  var a1=this.CalculerDiffDate2()

  var resfinal = result*a1

  var res1 = resfinal.toFixed(3)
  this.placementS.fromData.pla_produits_placement_consommes_annee_comptable=Number(res1)
}
/////////////////////////////////
//calculer CalculerPPFinEcheance
CalculerPPFinEcheance(){
  let MntD = this.placementS.fromData.pla_montant_depot
  console.log("mmmmmmmmmmmmm")
  console.log(MntD)
  let taux = this.placementS.fromData.pla_taux_profit
  console.log("tttttttttttttt")
  console.log(taux)

  var s1 =this.CalculerAnneeBisextille()
  var result = ((MntD*taux)/100)/s1
  var a1=this.CalculerDiffecheance()

  if(this.placementS.fromData.pla_organisme_societe==1){
    var result = ((MntD*taux)/100)/(s1)
    var a1=this.CalculerDiffecheance() -2


  }
  console.log("rrrrrrrrrrrrr")
  console.log(result)
  //console.log("aaaaaaaaaaaaaaaaaaaa")
  //console.log(a1)
  var resfinal = result*a1
  console.log("aaaaaaaaaaaaaaaaaaaa")
  console.log(resfinal)
  var res1 = resfinal.toFixed(3)
  this.placementS.fromData.pla_produits_placement_consommes_ech_final=Number(res1)

  //this.placementS.fromData.pla_produits_placement_consommes_annee_comptable=Number(res1)
}

////////////////////////////////////////////////////////////////////////
// calculer date d'échance
onCalculeDateEchance(){
  if(this.placementS.fromData.pla_organisme_societe!=0 && this.placementS.fromData.pla_date_souscription!=null && (this.placementS.fromData.pla_duree!=0 || this.placementS.fromData.pla_mois!=0 )){
/* el baraka */
    /*if(this.placementS.fromData.pla_organisme_societe == 1){
      let myDate = new Date(this.placementS.fromData.pla_date_souscription)

      let numberDays = this.placementS.fromData.pla_duree*365
      var futureDate = this.addDays(numberDays,myDate)
      futureDate=this.elBarakaCalcule(this.placementS.fromData.pla_duree*2,futureDate)
      let resCalculeEchance=this.datepipe.transform(futureDate, 'yyyy-MM-dd') || '{}';
      this.placementS.fromData.pla_date_echeance =resCalculeEchance

    }*/
    /////////////////////////////////////////////////////////////////////////////////
    if(this.placementS.fromData.pla_organisme_societe != 0){
      let myDate = new Date(this.placementS.fromData.pla_date_souscription)
      var s1 =this.CalculerAnneeBisextille()
      let numberDays = ((this.placementS.fromData.pla_duree*(s1)) + this.CalculerDiffDateDuree())
      var futureDate = this.addDays(numberDays,myDate)
      let resCalculeEchance=this.datepipe.transform(futureDate, 'yyyy-MM-dd') || '{}';
      this.placementS.fromData.pla_date_echeance =resCalculeEchance
    }
    this.CalculerPPDateJour()
    this.CalculerPPAnneeCom()
    this.CalculerPPTrimestreCom()
    this.CalculerPPFinEcheance()
  }

}
/*
formaterDate(){
  this.placementS.fromData.pla_date_souscription=this.datepipe.transform(this.placementS.fromData.pla_date_souscription, 'yyyy-MM-dd') || '{}';

}*/
///////////////////////////////////////////////////////////////
// recupere prix du jour (web scraping)
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

detectChangeTypePlacement(){
  this.placementS.fromData.pla_organisme_societe =0;
  this.placementS.fromData.pla_interB =0;
  this.placementS.fromData.pla_societe="";
  this.placementS.fromData.pla_montant_depot=0;
  this.placementS.fromData.pla_taux_profit =0;
  this.placementS.fromData.pla_date_souscription="";
  this.placementS.fromData.pla_date_echeance ="";
  this.placementS.fromData.pla_duree =0;
  this.placementS.fromData.pla_taux_retenue =0;
  this.placementS.fromData.pla_action_cotee =0;
  this.placementS.fromData.pla_nbr_action =0;
  this.placementS.fromData.pla_Vliqui=0;
  this.placementS.fromData.pla_prix_achat =0;
  this.placementS.fromData.pla_prix_jour =0;
  this.placementS.fromData.pla_montant_actualise=0;
  this.placementS.fromData.pla_value_consome_date_jour =0;
  this.placementS.fromData.pla_value_consome_trimestre_comptable =0;
  this.placementS.fromData.pla_value_consome_annee_comptable =0;
  this.placementS.fromData.pla_produits_placement_consommes_date_jour =0;
  this.placementS.fromData.pla_produits_placement_consommes_trimestre_comptable =0;
  this.placementS.fromData.pla_produits_placement_consommes_annee_comptable =0;
  this.placementS.fromData.taux_moudharba =0;
  //pla_prix_Aqui=0;
  this.placementS.fromData.pla_mont_inve=0;
  this.placementS.fromData.pla_delegation=0;
  this.placementS.fromData.pla_mois=0;
  this.placementS.fromData.pla_produits_placement_consommes_ech_final=0;
}
/////////////////////////////////////////////////////////////////
//emprunts obligataires
calculeEmpruntObligataire(){
  let montant=this.placementS.fromData.pla_montant_depot
  let duree=this.placementS.fromData.pla_duree
  let taux=this.placementS.fromData.pla_taux_profit

  let listProduitPlacement:number[]=[]
  let myList2:number[]=[]
  let listeAnnee:number[]=[]
  let getCurrentYear=  new Date().getFullYear()


  for (let i = 0; i <duree; i++) {
    if(i==0){
      listProduitPlacement.push( (montant/duree) + (montant*(taux/100)) )
      myList2.push(montant)
    }
    if(i!=0){

      myList2.push(myList2[i-1]-(montant/duree))
      listProduitPlacement.push(myList2[i]*(taux/100)+(montant/duree))
    }
  }

  for (let i = 0; i <duree; i++) {
    listeAnnee.push(getCurrentYear)
    getCurrentYear=getCurrentYear+1
  }

  return{listProduitPlacement,listeAnnee}

}
/*
onchangePrixAchat(){


}
*/

}







