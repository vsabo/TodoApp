using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using ToDo.API.Data;

namespace ToDo.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly TodoDatabaseContext _context;

        public TodoController(TodoDatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> Get()
        {
            var result = await _context.TodoItems.ToListAsync().ConfigureAwait(false);
            return Ok(result);
        }


        [HttpPost]
        [Route("")]
        public async Task<IActionResult> Create([FromBody] TodoItem model)
        {
            if (string.IsNullOrEmpty(model.Description))
            {
                return BadRequest();
            }
            model.DateTimeCreated = DateTime.Now;
            var result = await _context.TodoItems.AddAsync(model).ConfigureAwait(false);
            await _context.SaveChangesAsync().ConfigureAwait(false);
            return Ok(result);
        }

        [HttpDelete]
        [Route("")]
        public async Task<IActionResult> Delete(int id)
        {
            var model = await _context.TodoItems.FindAsync(id).ConfigureAwait(false);
            _context.TodoItems.Remove(model);
            await _context.SaveChangesAsync().ConfigureAwait(false);
            return Ok();
        }

    }
}
