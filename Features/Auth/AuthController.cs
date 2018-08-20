using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace MusicStore.Features.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;
        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
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