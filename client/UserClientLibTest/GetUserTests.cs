using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;
using UserClientLib;

namespace UserClientLibTest
{
    [TestClass]
    public class GetUserTests
    {
        UserClient client = new UserClient("http://localhost:3000");

        [TestMethod]
        public async Task Should_ReturnAllUsers_When_GetUserIsCalled()
        {
            var user = await client.Get("joao");
            Assert.IsInstanceOfType(user, typeof(User));
        }
    }
}
