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
    public class IntermediaireBourseController : ControllerBase
    {
        private readonly SuiviPlacementContext _context;


        public IntermediaireBourseController(SuiviPlacementContext SuiviPlacementContext)
        {
            _context = SuiviPlacementContext;

        }
        [HttpGet("GetIntermediareBourse")]

        public IActionResult GetIntermediareBourse()
        {
            var IntermediareBoursedetails = _context.IntermediaireBourses;
            return Ok(IntermediareBoursedetails);
        }

    }
}
