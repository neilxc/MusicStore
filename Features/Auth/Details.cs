using System.Net;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using MusicStore.Entities;
using MusicStore.Infrastructure.Errors;
using MusicStore.Services.Interfaces;

namespace MusicStore.Features.Auth
{
    public class Details
    {
        public class Query : IRequest<UserEnvelope>
        {
            public string UserName { get; set; }
        }

        // public class QueryValidator : AbstractValidator<Query>
        // {
        //     public QueryValidator()
        //     {
        //         RuleFor(x => x.UserName).NotNull().NotEmpty();
        //     }
        // }

        public class QueryHandler : IRequestHandler<Query, UserEnvelope>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IMapper _mapper;
            private readonly IJwtTokenGenerator _jwtTokenGenerator;

            public QueryHandler(UserManager<AppUser> userManager, IMapper mapper, IJwtTokenGenerator jwtTokenGenerator)
            {
                _userManager = userManager;
                _mapper = mapper;
                _jwtTokenGenerator = jwtTokenGenerator;
            }
            public async Task<UserEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var appUser = await _userManager.FindByNameAsync(request.UserName);
                if (appUser == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {User = Constants.NOT_FOUND});
                }
                var user = _mapper.Map<AppUser, User>(appUser);
                user.Token = await _jwtTokenGenerator.CreateToken(appUser);
                return new UserEnvelope(user);
            }
        }
    }
}