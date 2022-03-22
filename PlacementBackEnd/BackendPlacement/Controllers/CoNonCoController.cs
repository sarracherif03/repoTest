using BackendPlacement.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendPlacement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoNonCoController : ControllerBase
    {
        private readonly SuiviPlacementContext _context;


        public CoNonCoController(SuiviPlacementContext SuiviPlacementContext)
        {
            _context = SuiviPlacementContext;

        }
        [HttpGet("GetCoteeNonCotee")]

        public IActionResult GetCoNoCo()
        {
            var typeCoteedetails = _context.CoteeNonCotees;
            return Ok(typeCoteedetails);
        }

    }
}
