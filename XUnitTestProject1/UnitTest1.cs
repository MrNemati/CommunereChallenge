using BaseLocationApp.Controllers;
using BaseLocationApp.Models;
using System;
using Xunit;

namespace XUnitTestProject1
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            TestController sut = new BaseLocationApp.Controllers.TestController();
        }
    }
}
