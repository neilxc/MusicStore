using Microsoft.AspNetCore.Mvc;

namespace MusicStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        [HttpGet]
        public IActionResult Hello()
        {
            return Ok("Hello from store!");
        }

        [HttpGet("details")]
        public IActionResult Details()
        {
            return Ok("some details");
        }
    }
}