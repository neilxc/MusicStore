using System.Linq;
using Microsoft.EntityFrameworkCore;
using MusicStore.Entities;

namespace MusicStore.Features.Store
{
    public static class AlbumsExtension
    {
        public static IQueryable<Album> GetAllData(this DbSet<Album> albums)
        {
            return albums
                .Include(x => x.Artist)
                .Include(x => x.Genre)
                .AsNoTracking();
        }
    }
}