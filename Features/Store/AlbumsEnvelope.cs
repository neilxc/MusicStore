using System.Collections.Generic;
using MusicStore.Entities;

namespace MusicStore.Features.Store
{
    public class AlbumsEnvelope
    {
        public List<Album> Albums { get; set; }
        public int AlbumsCount { get; set; }
    }
}