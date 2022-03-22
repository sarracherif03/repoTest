using BackendPlacement.Data;
using BackendPlacement.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendPlacement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Details_EmpController : ControllerBase
    {
        private readonly SuiviPlacementContext _context;


        public Details_EmpController(SuiviPlacementContext SuiviPlacementContext)
        {
            _context = SuiviPlacementContext;

        }
        [HttpPost("AjouterDetailsEmprunts")]
        public async Task<IActionResult> AjouterPlacement(Details_emprunt value)
        {
            _context.Details_Emprunts.Add(value);
            _context.SaveChanges();
            return Ok(new
            {
                StatusCode = 200,
                Message = "Details Emprunts obligataires  ajouté avec succès"
            });
        }
    }
}
