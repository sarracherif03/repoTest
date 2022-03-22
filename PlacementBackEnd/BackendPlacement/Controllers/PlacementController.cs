using BackendPlacement.Data;
using BackendPlacement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

using System.Threading; 

namespace BackendPlacement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacementController : ControllerBase
    {
        private readonly SuiviPlacementContext _context;

        public PlacementController(SuiviPlacementContext SuiviPlacementContext)
        {
            _context = SuiviPlacementContext;
        }
        
        [HttpGet("GetNameEntrepriseBourse")]
        public IActionResult GetNameEntrepriseBourse()
        {
            List<string> tableNameEntreprise = new List<string>();
            try
            {
                string prixAction;
                HtmlAgilityPack.HtmlWeb web = new HtmlAgilityPack.HtmlWeb();
                HtmlAgilityPack.HtmlDocument doc = web.Load("https://www.ilboursa.com/marches/aaz.aspx");

                var NameEntreprisesValues = doc.DocumentNode.SelectNodes(".//td[1]").TakeWhile(tdTag => tdTag.Name == "td");
                foreach (var tdText in NameEntreprisesValues)
                {
                    tableNameEntreprise.Add(tdText.InnerText);
                }
                return Ok(tableNameEntreprise);
            }
            catch(Exception ex)
            {
                return Ok(tableNameEntreprise);
            }
        }

        [HttpGet("GetScrapPrix/{NomEntreprise}")]
        public IActionResult GetScrapPrix(string NomEntreprise)
        {
            string prixAction;
            HtmlAgilityPack.HtmlWeb web = new HtmlAgilityPack.HtmlWeb();
            HtmlAgilityPack.HtmlDocument doc = web.Load("https://www.ilboursa.com/marches/aaz.aspx");

            var NameEntreprisesValues = doc.DocumentNode.SelectNodes(".//td[1]").TakeWhile(tdTag => tdTag.Name == "td");
            List<string> tableNameEntreprise = new List<string>();
            foreach (var tdText in NameEntreprisesValues)
            {
                tableNameEntreprise.Add(tdText.InnerText);
            }

            var PrixActionValues = doc.DocumentNode.SelectNodes(".//td[7]").TakeWhile(tdTag => tdTag.Name == "td");
            List<string> tablePrixAction = new List<string>();
            foreach (var tdText in PrixActionValues)
            {
                tablePrixAction.Add(tdText.InnerText);
            }

            for(var i = 0; i< tableNameEntreprise.Count; i++)
            {
                if(NomEntreprise == tableNameEntreprise[i])
                {
                    prixAction = tablePrixAction[i];
                    return Ok(prixAction);
                }
            }
            return BadRequest();
        }

        private string VerifPrixEntrepriseCote(string NomEntreprise)
        {
            string prixAction;
            HtmlAgilityPack.HtmlWeb web = new HtmlAgilityPack.HtmlWeb();
            HtmlAgilityPack.HtmlDocument doc = web.Load("https://www.ilboursa.com/marches/aaz.aspx");

            var NameEntreprisesValues = doc.DocumentNode.SelectNodes(".//td[1]").TakeWhile(tdTag => tdTag.Name == "td");
            List<string> tableNameEntreprise = new List<string>();
            foreach (var tdText in NameEntreprisesValues)
            {
                tableNameEntreprise.Add(tdText.InnerText);
            }
            var PrixActionValues = doc.DocumentNode.SelectNodes(".//td[7]").TakeWhile(tdTag => tdTag.Name == "td");
            List<string> tablePrixAction = new List<string>();
            foreach (var tdText in PrixActionValues)
            {
                tablePrixAction.Add(tdText.InnerText);
            }
            for (var i = 0; i < tableNameEntreprise.Count; i++)
            {
                if (NomEntreprise == tableNameEntreprise[i])
                {
                    prixAction = tablePrixAction[i];
                    return prixAction;
                }
            }
            return null;
        }

        [HttpPost("AjouterPlacementCapital")]
        public async Task<IActionResult> AjouterPlacement(Placement value)
        {
            _context.Placements.Add(value);
            _context.SaveChanges();
            return Ok(new
            {
                StatusCode = 200,
                Message = "Placement ajouté avec succès"
            });
        }

        [HttpGet("ActionCotee")]
        public async Task<ActionResult<IEnumerable<Placement>>> GetPlacementActionCotee()
        {
            DateTime start = DateTime.Now;
            /* Mettre à jour le prix d'une action cotée dans la base de données avant l'affichage des placements*/
            try
            {
                    List<string> ListNameEntreprise = new List<string>();
                    string prixActionJour;
                    var placementCote = _context.Placements.Where(p => p.pla_societe != null);

                    foreach (var item in placementCote.ToList())
                    {
                        ListNameEntreprise.Add(item.pla_societe);
                    }
                    foreach (var item in ListNameEntreprise)
                    {
                        prixActionJour = VerifPrixEntrepriseCote(item);
                        var placement = _context.Placements.Where(p => p.pla_societe == item).FirstOrDefault();
                        if (placement != null)
                        {
                       // return Ok(prixActionJour);
                           if(prixActionJour!=null) {
                                placement.pla_prix_jour = double.Parse(prixActionJour, CultureInfo.InvariantCulture);

                                _context.Entry(placement).State = EntityState.Modified;
                                await _context.SaveChangesAsync();
                           }
     
                        }                
                    }
                /* Affichage palcement */
                return await _context.Placements.ToListAsync();
            }
           catch(Exception ex)
            {
                /*Dans le cas d'une errure dans la mise ajour afficher directement les placements*/
                return await _context.Placements.ToListAsync();
             
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Placement>>> GetPlacement()
        {
            // procedure stockés
            _context.Placements.FromSqlRaw("Execute [dbo].[CalculateCompensation2]");
            return await _context.Placements.ToListAsync();
        }

      

    }
}
