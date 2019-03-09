using System;
using System.Collections.Generic;
using System.Text;
using UserClientLib;

namespace UserClientLibTest
{
    public static class Configuration
    {
        public static string UserApiUrl => "http://neuromancer.minivps.info:3000/userapi/";
        public static User UserExample1 => new User("Joao Pedro", "@@@@", "jp", "endereco", "33323");
        public static string UserExample1Password => "password";
    }
}
