using System.Threading.Tasks;

namespace UserClientLib
{
    public interface IUserClient
    {
        Task<User> Get(string username);
        Task Post(User user, string password);
        Task Delete(string username);
        Task ChangePassword(string username, string oldPassword, string newPassword);
        Task<bool> IsAuthentic(string username, string password);
    }
}
