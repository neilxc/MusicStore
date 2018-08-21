using System.Collections.Generic;
using MusicStore.Entities;

namespace MusicStore.Features.Store
{
    public class GenreEnvelope
    {
        public List<Genre> Genres { get; set; }
    }
}