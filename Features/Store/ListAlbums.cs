using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MusicStore.Data;
using MusicStore.Entities;

namespace MusicStore.Features.Store
{
    public class ListAlbums
    {
        public class Query : IRequest<AlbumsEnvelope>
        {
            public Query(string genre, string artist, int? limit, int? offset)
            {
                Genre = genre;
                Artist = artist;
                Limit = limit;
                Offset = offset;
            }

            public string Genre { get; set; }
            public string Artist { get; set; }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
        }

        public class QueryHandler : IRequestHandler<Query, AlbumsEnvelope>
        {
            private readonly DataContext _context;

            public QueryHandler(DataContext context)
            {
                _context = context;
            }

            public async Task<AlbumsEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                IQueryable<Album> queryable = _context.Albums.GetAllData();

                if (request.Artist != null)
                {
                    queryable = queryable.Where(x => x.Artist.Name == request.Artist);
                }

                if (request.Genre != null)
                {
                    queryable = queryable.Where(x => x.Genre.Name == request.Genre);
                }

                var albums = await queryable
                    .OrderBy(x => x.Title)
                    .Skip(request.Offset ?? 0)
                    .Take(request.Limit ?? 20)
                    .AsNoTracking()
                    .ToListAsync(cancellationToken);
                
                return new AlbumsEnvelope()
                {
                    Albums = albums,
                    AlbumsCount = queryable.Count()
                };
            }
        }
    }
}