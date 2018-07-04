using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace UserClientLib
{
    internal static class Helper
    {
        internal static string HashPassword(string password, string salt)
        {
            return Hash(password + salt);
        }

        internal static string GenerateSalt()
        {
            using (var keyGenerator = RandomNumberGenerator.Create())
            {
                var bytes = new byte[64];
                keyGenerator.GetBytes(bytes);
                return Encoding.ASCII.GetString(bytes);
            }
        }

        internal static string Hash(string password)
        {
            var bytes = Encoding.ASCII.GetBytes(password);
            SHA512 sha = SHA512.Create();
            var hash = sha.ComputeHash(bytes);
            return Encoding.ASCII.GetString(hash);
        }
    }
}
