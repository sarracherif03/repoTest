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
    public class TypefondController: ControllerBase
    {
        private readonly SuiviPlacementContext _context;


        public TypefondController(SuiviPlacementContext SuiviPlacementContext)
        {
            _context = SuiviPlacementContext;

        }
        [HttpGet("GetTypefond")]

        public IActionResult GetTypefond()
        {
            var Typefonddetails = _context.Typefonds;
            return Ok(Typefonddetails);
        }
    }
}
