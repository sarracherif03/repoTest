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
    public class DelegationController : ControllerBase
    {
        private readonly SuiviPlacementContext _context;


        public DelegationController(SuiviPlacementContext SuiviPlacementContext)
        {
            _context = SuiviPlacementContext;

        }
        [HttpGet("GetDelegation")]

        public IActionResult GetDelegation()
        {
            var Delegationdetails = _context.Delegations;
            return Ok(Delegationdetails);
        }

    }
}
