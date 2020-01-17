using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using BaseLocationApp.Models;
using BaseLocationApp.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BaseLocationApp.Controllers
{
    [Route("api/[controller]")]
    public class LocationController : Controller
    {
        MyDbContext _db;
        public LocationController(MyDbContext db)
        {
            _db = db;
        }
        [HttpPost("[action]")]
        public string AddLocation(string model)
        {
            var modelClass = JsonConvert.DeserializeObject<LocationViewModel>(model);
            Locations locations = new Locations
            {
                lat = modelClass.lat,
                lng = modelClass.lng,
                Description = modelClass.Description,
                Name = "Location",
            };
            try
            {
                _db.Add(locations);
                _db.SaveChanges();
                return ("ok");
            }
            catch (Exception)
            {
                return ("no");
            }
        }
        private static readonly Expression<Func<Locations, LocationList>> Asnewtbl =
           x => new LocationList
           {
               Id=x.Id,
               lat = x.lat,
               lng = x.lng,
               Description = x.Description
           };
        [HttpGet("[action]")]
        public IActionResult LocationList()
        {

            var LocationList_tbl = _db.Locations.Select(Asnewtbl).ToList();
            return Json(LocationList_tbl);
        }
       
    }
}