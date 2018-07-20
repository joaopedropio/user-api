using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Threading.Tasks;
using UserClientLib;

namespace UserClientLibTest
{
    [TestClass]
    public class GetUserTests
    {
        UserClient client = new UserClient(Configuration.UserApiUrl);

        [TestMethod]
        public async Task Should_ReturnAllUsers_When_GetUserIsCalled()
        {
            var user = await client.GetUser("joao");
            Assert.IsInstanceOfType(user, typeof(UserModel));
        }

        [TestMethod]
        public async Task Should_ConfirmPassword_When_PasswordIsValid()
        {
            Assert.IsTrue(await client.IsUserPasswordCorrect(Configuration.UserExample1.Username, Configuration.UserExample1Password));
        }
    }
}
