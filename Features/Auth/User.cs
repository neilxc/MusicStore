namespace MusicStore.Features.Auth
{
    public class User
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }

    public class UserEnvelope
    {
        public UserEnvelope(User user)
        {
            User = user;   
        }

        public User User { get; set; }
    }
}