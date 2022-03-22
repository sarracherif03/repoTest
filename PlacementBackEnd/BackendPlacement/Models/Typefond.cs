using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackendPlacement.Models
{
    public class Typefond
    {
        [Key]
        public long typ_fon_id { get; set; }
        public string type_fon_libelle { get; set; }
        //public virtual ICollection<Placement> Placements { get; set; }



    }
}
