using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net;

namespace UserClientLib
{
    public class UserClient : IUserClient
    {
        public Uri ApiUri { get; private set; }
        private HttpClient httpClient;

        public UserClient(string apiUri)
            : this(new Uri(apiUri))
        {
        }

        public UserClient(Uri apiUri)
            : this(apiUri, new HttpClient { BaseAddress = apiUri })
        {
        }

        public UserClient(Uri apiUri, HttpClient httpClient)
        {
            this.ApiUri = apiUri;
            this.httpClient = httpClient;
        }

        public async Task<User> Get(string username)
        {
            var httpResponse = await httpClient.GetAsync($"users/{username}");
            var content = await httpResponse.Content.ReadAsStringAsync();

            User user;
            if (httpResponse.IsSuccessStatusCode)
            {
                try
                {
                    user = JsonConvert.DeserializeObject<User>(content);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            else if (httpResponse.StatusCode == HttpStatusCode.NotFound)
            {
                return null;
            }
            else
            {
                throw new HttpRequestException($"Status Code: {httpResponse.StatusCode}");
            }

            return user;
        }

        public async Task Post(User user, string password)
        {
            string userJson;
            
            try
            {
                userJson = JsonConvert.SerializeObject(user);
                var content = new StringContent(userJson);
                var httpResponse = await httpClient.PostAsync("users/", content);

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

        public async Task Delete(string username)
        {
            try
            {
                var httpResponse = await httpClient.DeleteAsync("users/{username}");
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

        public Task ChangePassword(string oldPassword, string newPassword)
        {
            throw new NotImplementedException();
        }
    }
}
