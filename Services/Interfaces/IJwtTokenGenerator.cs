using System.Threading.Tasks;
using MusicStore.Entities;

namespace MusicStore.Services.Interfaces
{
    public interface IJwtTokenGenerator
    {
         Task<string> CreateToken(AppUser user);
    }
}