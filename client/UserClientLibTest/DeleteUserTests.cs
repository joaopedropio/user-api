using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UserClientLib;

namespace UserClientLibTest
{
    [TestClass]
    public class DeleteUserTests
    {
        UserClient client = new UserClient(Configuration.UserApiUrl);

        [TestMethod]
        public async Task Should_Delete_When_UserExists()
        {
            try
            {
                await client.Delete(Configuration.UserExample1.Username);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
