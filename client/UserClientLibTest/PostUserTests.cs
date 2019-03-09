using Microsoft.VisualStudio.TestTools.UnitTesting;
using UserClientLib;
using System.Net.Http;
using System.Threading.Tasks;

namespace UserClientLibTest
{
    [TestClass]
    public class PostUserTests
    {
        readonly UserClient client = new UserClient(Configuration.UserApiUrl);

        [TestMethod]
        public async Task Should_Work_When_ValidUserIsUsed()
        {
            try
            {
                await client.Post(Configuration.UserExample1, Configuration.UserExample1Password);
            }
            catch (HttpRequestException ex)
            {
                throw ex;
            }
        }
    }
}
