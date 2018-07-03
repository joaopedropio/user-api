using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Threading.Tasks;
using UserClientLib;

namespace UserClientLibTest.Client
{
    [TestClass]
    public class GetUserTests
    {
        string userApiUrl = "http://neuromancer.minivps.info:3000/userapi/";

        [TestMethod]
        public async Task Should_ReturnAllUsers_When_GetUserIsCalled()
        {
            var client = new UserClient(userApiUrl);
            var user = await client.GetUser("joao");
            Assert.IsInstanceOfType(user, typeof(User));
        }
    }
}
