using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Security.Cryptography;

namespace UserClientLib
{
    public static class Helper
    {
        public static string HashPassword(string password, string salt)
        {
            var hash = KeyDerivation.Pbkdf2(
                password: password,
                salt: Convert.FromBase64String(salt),
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8
            );

            return Convert.ToBase64String(hash);
        }

        public static string GenerateSalt()
        {
            using (var keyGenerator = RandomNumberGenerator.Create())
            {
                var bytes = new byte[128 / 8];
                keyGenerator.GetBytes(bytes);
                return Convert.ToBase64String(bytes);
            }
        }
    }
}