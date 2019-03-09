﻿namespace UserClientLib
{
    public class User
    {
        public string Name { get; set; }

        public string Address { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Username { get; set; }

        public User(string name, string email, string username, string address, string phone)
        {
            Name = name;
            Address = address;
            Phone = phone;
            Email = email;
            Username = username;
        }
    }
}
