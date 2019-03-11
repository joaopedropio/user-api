using Newtonsoft.Json;

namespace UserClientLib
{
    internal class UserModel
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

        [JsonProperty("avatar")]
        public string Avatar { get; set; }

        [JsonConstructor]
        internal UserModel(string name, string email, string username, string password, string address, string phone, string avatar)
        {
            Name = name;
            Address = address;
            Phone = phone;
            Email = email;
            Username = username;
            Password = password;
            Avatar = avatar;
        }

        internal UserModel(User user, string password)
        {
            Name = user.Name;
            Address = user.Address;
            Phone = user.Phone;
            Email = user.Email;
            Username = user.Username;
            Password = password;
            Avatar = user.Avatar;
        }
    }
}
 