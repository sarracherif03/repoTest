using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackendPlacement.Models
{
    public class TypeSousplacement
    {
        [Key]
        public long typ_sous_pla_id { get; set; }
        public string typ_sous_pla_libelle { get; set; }
        //public virtual ICollection<Placement> Placements { get; set; }


    }
}
