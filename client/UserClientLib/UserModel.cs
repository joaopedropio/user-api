using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace UserClientLib
{
    public class UserModel
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

        public UserModel(string name, string email, string username, string address = "", string phone = "")
        {
            Name = name;
            Address = address;
            Phone = phone;
            Email = email;
            Username = username;
        }
    }
}
