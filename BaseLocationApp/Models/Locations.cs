using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaseLocationApp.Models
{
    public class Locations
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string lat { get; set; }
        public string lng { get; set; }
    }
}
