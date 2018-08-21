using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MusicStore.Data;

namespace MusicStore.Features.Store
{
    public class ListGenres
    {
        public class Query : IRequest<GenreEnvelope>{}

        public class QueryHandler : IRequestHandler<Query, GenreEnvelope>
        {
            private readonly DataContext _context;

            public QueryHandler(DataContext context)
            {
                _context = context;
            }

            public async Task<GenreEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var genres = await _context.Genres.OrderBy(x => x.Name).AsNoTracking().ToListAsync(cancellationToken);

                return new GenreEnvelope()
                {
                    Genres = genres
                };
            }
        }
    }
}