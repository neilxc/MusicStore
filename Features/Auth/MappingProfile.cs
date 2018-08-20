using AutoMapper;
using MusicStore.Entities;

namespace MusicStore.Features.Auth
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AppUser, User>();
        }   
    }
}