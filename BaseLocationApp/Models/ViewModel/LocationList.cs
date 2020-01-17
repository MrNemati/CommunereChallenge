using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaseLocationApp.Models.ViewModel
{
    public class LocationList
    {
        public int Id { get; set; }
        public string lat { get; set; }
        public string lng { get; set; }
        public string Description { get; set; }
    }
}
