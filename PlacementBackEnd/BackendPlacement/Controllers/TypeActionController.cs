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
    public class TypeActionController : ControllerBase
    {
        private readonly SuiviPlacementContext _context;


        public TypeActionController(SuiviPlacementContext SuiviPlacementContext)
        {
            _context = SuiviPlacementContext;

        }
        [HttpGet("GetTypeAction")]

        public IActionResult GetTypeAction()
        {
            var typesactionsdetails = _context.Typeactions;
            return Ok(typesactionsdetails);
        }
       
    }
}
