using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;
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
                await client.PostUser(Configuration.UserExample1, Configuration.UserExample1Password);
            }
            catch (HttpRequestException ex)
            {
                throw ex;
            }
        }
    }
}
