using System;
using System.Collections.Generic;
using System.Text;

namespace UserClientLib
{
    public class User
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }

        public User(string name, string address, string phone, string email, string username, string password, string salt)
        {
            Name = name;
            Address = address;
            Phone = phone;
            Email = email;
            Username = username;
            Password = password;
            Salt = salt;

        }
    }
}