using MusicStore.Entities;

namespace MusicStore.Features.Store
{
    public class AlbumEnvelope
    {
        public AlbumEnvelope(Album album)
        {
            Album = album;   
        }

        public Album Album { get; set; }
    }
}