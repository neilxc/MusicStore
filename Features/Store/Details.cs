using System.Net;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MusicStore.Data;
using MusicStore.Infrastructure.Errors;

namespace MusicStore.Features.Store
{
    public class Details
    {
        public class Query : IRequest<AlbumEnvelope>
        {
            public Query(int id)
            {
                Id = id;
            }
            public int Id { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Id).NotNull().NotEmpty();   
            }
        }

        public class QueryHandler : IRequestHandler<Query, AlbumEnvelope>
        {
            private readonly DataContext _context;

            public QueryHandler(DataContext context)
            {
                _context = context;
            }

            public async Task<AlbumEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var album = await _context.Albums.GetAllData()
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
                
                if (album == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Album = Constants.NOT_FOUND});
                
                return new AlbumEnvelope(album);
            }
        }
    }
}