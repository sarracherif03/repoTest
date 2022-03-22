using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackendPlacement.Models
{
    public class IntermediaireBourse
    {
        [Key]
        public long inB_id { get; set; }
        public string inB_libelle { get; set; }
    }
}
