using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;
using UserClientLib;
using UserClientLibTest.Helpers;

namespace UserClientLibTest
{
    [TestClass]
    public class UserClientTestes
    {
        UserClient client = new UserClient(Configuration.UserApiUrl);

        [TestMethod]
        public async Task Should_StoreUser_When_ValidUserIsProvided()
        {
            // Arrange
            var stream = FileHelper.GetInputFile("avatar.png");
            var base64 = FileHelper.ImageToBase64(stream);
            var password = "password";
            var user = new User("Joao Pedro", "joao@pedro.pio", "jp", "endereco", "33323", base64);

            // Act
            await client.Post(user, password);
        }

        [TestMethod]
        public async Task Should_ReturnUser_When_UserExists()
        {
            var user = await client.Get("jp");
            Assert.IsInstanceOfType(user, typeof(User));
        }

        [TestMethod]
        public async Task Should_Delete_When_UserExists()
        {
            await client.Delete("jp");
        }

        [TestMethod]
        public async Task Should_ChangePassword_When_OldPassordIsCorrect()
        {
            await client.ChangePassword("jp", "password", "senha");
        }
        [TestMethod]
        public async Task Should_BeAuthentic_When_PasswordIsCorrent()
        {
            var result = await client.IsAuthentic("jp", "senha");

            Assert.AreEqual(true, result);
        }
    }
}
