using System.Collections.Generic;
using Newtonsoft.Json;

namespace MusicStore.Entities
{
    public class Genre
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        [JsonIgnore]
        public ICollection<Album> Albums { get; set; }
    }
}