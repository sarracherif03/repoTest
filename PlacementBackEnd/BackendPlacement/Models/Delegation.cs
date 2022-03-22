using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackendPlacement.Models
{
    public class Delegation
    {
        [Key]
        public long del_id { get; set; }
        public string del_libelle { get; set; }
        //public virtual ICollection<Placement> Placements { get; set; }
    }
}