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
            var userModel = new UserModel(user, password);
            var content = CreateContent(userModel);
            var httpResponse = await httpClient.PostAsync("users/", content);

            if (!httpResponse.IsSuccessStatusCode)
            {
                throw new HttpRequestException(($"Status Code: {httpResponse.StatusCode}"));
            }
        }

        public async Task Delete(string username)
        {
            var httpResponse = await httpClient.DeleteAsync($"users/{username}");
            if (!httpResponse.IsSuccessStatusCode)
            {
                throw new HttpRequestException(($"Status Code: {httpResponse.StatusCode}"));
            }
        }

        public async Task ChangePassword(string username, string oldPassword, string newPassword)
        {
            var content = CreateContent(new { oldPassword, newPassword });

            var httpResponse = await httpClient.PutAsync($"users/{username}/changePassword", content);
            if (!httpResponse.IsSuccessStatusCode)
            {
                var body = await httpResponse.Content.ReadAsStringAsync();
                throw new HttpRequestException(($"Status Code: {httpResponse.StatusCode}\nContent: {body}"));
            }
        }

        public async Task<bool> IsAuthentic(string username, string password)
        {
            var httpResponse = await httpClient.GetAsync($"users/{username}/checkAuthenticity?password={password}");
            return httpResponse.IsSuccessStatusCode;
        }

        private StringContent CreateContent(object obj)
        {
            var json = JsonConvert.SerializeObject(obj);
            var content = new StringContent(json);
            content.Headers.ContentType.MediaType = "application/json";
            return content;
        }
    }
}
