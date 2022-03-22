using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BackendPlacement.Models
{
    public class Details_emprunt
    {
        [Key]
        public long Emp_id { get; set; }
        [ForeignKey("Placement")]
        public long pla_id { get; set; }
        public virtual Placement Placement { get; set; }

        public double? Emp_PP { get; set; }
        public int? Emp_annee { get; set; }




    }
}
