using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackendPlacement.Models
{
    public class  Organisme
    {
        [Key]
        public long org_id { get; set; }
        public string org_libelle { get; set; }
        //public virtual ICollection<Placement> Placements { get; set; }



    }
}
