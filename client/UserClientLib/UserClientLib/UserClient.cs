using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using Newtonsoft.Json.Linq;

namespace UserClientLib
{
    public class UserClient
    {
        public Uri ApiUrl { get; private set; }
        private HttpClient httpClient;

        public UserClient(string apiUrl)
        {
            if (apiUrl.EndsWith("/"))
            {
                ApiUrl = new Uri(apiUrl.TrimEnd('/'));
            }
            httpClient = new HttpClient
            {
                BaseAddress = ApiUrl
            };
        }


        public async Task<UserModel> GetUser(string username)
        {
            var user = await GetUserWithPassword(username);
            return new UserModel(user.Name, user.Email, user.Username, user.Address, user.Phone);
        }


        private async Task<User> GetUserWithPassword(string username)
        {
            var getUserUrl = $"{ApiUrl}/users/{username}";
            var httpResponse = await httpClient.GetAsync(getUserUrl);
            var content = await httpResponse.Content.ReadAsStringAsync();

            if (httpResponse.IsSuccessStatusCode)
            {
                try
                {
                    var obj = JObject.Parse(content);
                    var user = new User(
                        (string)obj.SelectToken("name"),
                        (string)obj.SelectToken("email"),
                        (string)obj.SelectToken("username"),
                        (string)obj.SelectToken("password"),
                        (string)obj.SelectToken("address"),
                        (string)obj.SelectToken("phone"),
                        (string)obj.SelectToken("salt")
                    );
                    return user;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            else if(httpResponse.StatusCode == HttpStatusCode.NotFound)
            {
                throw new HttpRequestException("User not found!");
            }
            else
            {
                throw new HttpRequestException($"Status Code: {httpResponse.StatusCode}");
            }
        }

        public async Task PostUser(UserModel userModel, string password)
        {
            var postUserUrl = $"{ApiUrl}/users/";
            var user = new User(userModel, password);
            string userJson;
            
            try
            {
                userJson = JsonConvert.SerializeObject(user);
                var content = new StringContent(userJson);
                var httpResponse = await httpClient.PostAsync(postUserUrl, content);

                if (!httpResponse.IsSuccessStatusCode)
                {
                    throw new HttpRequestException(($"Status Code: {httpResponse.StatusCode}"));
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteUser(string username)
        {
            var deleteUserUrl = $"{ApiUrl}/users/{username}";
            try
            {
                var httpResponse = await httpClient.DeleteAsync(deleteUserUrl);
                if (!httpResponse.IsSuccessStatusCode)
                {
                    throw new HttpRequestException(($"Status Code: {httpResponse.StatusCode}"));
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> IsUserPasswordCorrect(string username, string password)
        {
            var user = await GetUserWithPassword(username);
            var hashedPassword = Helper.HashPassword(password, user.Salt);
            return user.Password == hashedPassword;
        }
    }
}
