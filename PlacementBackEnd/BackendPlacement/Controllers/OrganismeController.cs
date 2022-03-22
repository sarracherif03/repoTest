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
    public class OrganismeController : ControllerBase
    {
        private readonly SuiviPlacementContext _context;


        public OrganismeController(SuiviPlacementContext SuiviPlacementContext)
        {
            _context = SuiviPlacementContext;

        }
        [HttpGet("GetOrganisme")]

        public IActionResult GetOrganisme()
        {
            var organismedetails = _context.Organismes;
            return Ok(organismedetails);
        }

    }
}
