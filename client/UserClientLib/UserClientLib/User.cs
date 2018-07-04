using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace UserClientLib
{
    internal class User
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("address")]
        public string Address { get; set; }
        [JsonProperty("phone")]
        public string Phone { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("username")]
        public string Username { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }
        [JsonProperty("salt")]
        public string Salt { get; set; }

        internal User(string name, string email, string username, string password, string address = "", string phone = "")
        {
            Name = name;
            Address = address;
            Phone = phone;
            Email = email;
            Username = username;
            Salt = Helper.GenerateSalt();
            Password = Helper.HashPassword(password, Salt);
        }

        internal User(string name, string email, string username, string password, string address, string phone, string salt)
        {
            Name = name;
            Address = address;
            Phone = phone;
            Email = email;
            Username = username;
            Salt = salt;
            Password = password;
        }

        internal User(UserModel userModel, string password)
            : this(userModel.Name,
                   userModel.Email,
                   userModel.Username,
                   password,
                   userModel.Address,
                   userModel.Phone)
        {

        }
    }
}
 