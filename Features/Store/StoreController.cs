using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace MusicStore.Features.Store
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IMediator _mediator;

        public StoreController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("genres")]
        public async Task<GenreEnvelope> Get()
        {
            return await _mediator.Send(new ListGenres.Query());
        }

        [HttpGet("albums")]
        public async Task<AlbumsEnvelope> Get(string genre, string artist, int? limit, int? offset)
        {
            return await _mediator.Send(new ListAlbums.Query(genre, artist, limit, offset));
        }

        [HttpGet("albums/details/{id}")]
        public async Task<AlbumEnvelope> Details(int id)
        {
            return await _mediator.Send(new Details.Query(id));
        }

        // [HttpGet("popular")]
        // public async Task<List<AlbumEnvelope>> Popular()
        // {
        //     // not implemented
        //     // get top selling albums
        // }
    }
}