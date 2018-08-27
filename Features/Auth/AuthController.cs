using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicStore.Services.Interfaces;

namespace MusicStore.Features.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICurrentUserAccessor _currentUserAccessor;

        public AuthController(IMediator mediator, ICurrentUserAccessor currentUserAccessor)
        {
            _mediator = mediator;
            _currentUserAccessor = currentUserAccessor;
        }

        [Authorize]
        [HttpGet("user")]
        public async Task<UserEnvelope> GetCurrent()
        {
            return await _mediator.Send(new Details.Query()
            {
                UserName = _currentUserAccessor.GetCurrentUsername()
            });
        }

        [HttpPost("register")]
        public async Task<UserEnvelope> Register(Register.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPost("login")]
        public async Task<UserEnvelope> Login(Login.Command command)
        {
            return await _mediator.Send(command);
        }
    }
}