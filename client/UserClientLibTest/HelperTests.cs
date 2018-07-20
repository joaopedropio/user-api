using Microsoft.VisualStudio.TestTools.UnitTesting;
using UserClientLib;
using static UserClientLib.Helper;

namespace UserClientLibTest
{
    [TestClass]
    public class HelperTests
    {
        UserClient client = new UserClient("");
        string password = "passord!@#123";
        string salt = "FhE1aQFojnm3BHPHVLlpwg==";
        string hashedPassword = "Dn4BOiKw3QiurlGc2+LqssEXg3FhWFdG0b4qucx0BHk=";

        [TestMethod]
        public void Should_BeSamePassword_When_SamePasswordProvided()
        {
            Assert.AreEqual(hashedPassword, HashPassword(password, salt));
        }
    }
}
