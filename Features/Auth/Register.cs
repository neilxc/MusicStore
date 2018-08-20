using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MusicStore.Entities;
using MusicStore.Infrastructure.Errors;
using MusicStore.Services.Interfaces;

namespace MusicStore.Features.Auth
{
    public class Register
    {
        public class UserData
        {
            public string UserName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class Command : IRequest<UserEnvelope>
        {
            public UserData User { get; set; }
        }

        public class Handler : IRequestHandler<Command, UserEnvelope>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            private readonly IJwtTokenGenerator _jwtTokenGenerator;
            private readonly IMapper _mapper;

            public Handler(
                UserManager<AppUser> userManager, 
                SignInManager<AppUser> signInManager, 
                IJwtTokenGenerator jwtTokenGenerator,
                IMapper mapper)
            {
                _signInManager = signInManager;
                _jwtTokenGenerator = jwtTokenGenerator;
                _mapper = mapper;
                _userManager = userManager;
            }

            public async Task<UserEnvelope> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _userManager.Users.Where(x => x.UserName == request.User.UserName).AnyAsync(cancellationToken))
                    throw new RestException(HttpStatusCode.BadRequest, new { UserName = Constants.IN_USER});
                
                if (await _userManager.Users.Where(x => x.Email == request.User.Email).AnyAsync(cancellationToken))
                    throw new RestException(HttpStatusCode.BadRequest, new { Email = Constants.IN_USER});
            
                var appUser = new AppUser
                {
                    UserName = request.User.UserName,
                    Email = request.User.Email
                };

                var result = await _userManager.CreateAsync(appUser, request.User.Password);

                if (result.Succeeded)
                {
                    var user = await _userManager.FindByNameAsync(request.User.UserName);
                    await _userManager.AddToRoleAsync(user, "Member");
                    var userToReturn = _mapper.Map<AppUser, User>(user);
                    userToReturn.Token = await _jwtTokenGenerator.CreateToken(user);
                    return new UserEnvelope(userToReturn);
                }

                throw new Exception("Oops - something went wrong");
            }
        }

    }
}