using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Net;

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

        public async Task<User> GetUser(string username)
        {
            var getUserUrl = $"{ApiUrl}/users/{username}";
            var httpResponse = await httpClient.GetAsync(getUserUrl);
            var content = await httpResponse.Content.ReadAsStringAsync();

            if (httpResponse.IsSuccessStatusCode)
            {
                try
                {
                    return JsonConvert.DeserializeObject<User>(content);
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
    }
}
