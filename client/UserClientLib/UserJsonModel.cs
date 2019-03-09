using Newtonsoft.Json;

namespace UserClientLib
{
    public class UserJsonModel
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

        [JsonConstructor]
        public UserJsonModel(string name, string email, string username, string password, string address, string phone)
        {
            Name = name;
            Address = address;
            Phone = phone;
            Email = email;
            Username = username;
            Password = password;
        }
    }
}
 