using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace BaseLocationApp.Controllers
{
    public class TestController : Controller
    {
       
        public IActionResult TestSum(int a, int b)
        {
            int sum = a + b;
            return Json(sum);
        }
    }
}