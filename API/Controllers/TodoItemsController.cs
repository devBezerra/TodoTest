using Microsoft.AspNetCore.Mvc;
using API.Services;
using API.Models;
using API.Utils;
using API.Filters;

namespace API.Controllers
{
    [AuthGuard]
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController(TodoItemsService todoService) : ControllerBase
    {
        private readonly TodoItemsService _todoService = todoService;

        [HttpPost]
        public async Task<IActionResult> PostTodoItem([FromBody] TodoItem request)
        {
            int userId = UserHelper.GetCurrentUserId(User);
            TodoItem todoCreated = await _todoService.Create(
                request.Title,
                request.Description,
                userId
            );

            if (todoCreated.Id != 0)
            {
                return Ok(new { Message = "Tarefa cadastrada com sucesso!", todoCreated });
            }
            return BadRequest(new { Message = "Não foi possível criar a tarefa." });
        }

        [HttpGet]
        public async Task<IActionResult> FindByUserId([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            int userId = UserHelper.GetCurrentUserId(User);
            List<TodoItem> todoItems = await _todoService.FindByUserId(userId, pageNumber, pageSize);
            return Ok(todoItems);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> FindById(int id)
        {
            int userId = UserHelper.GetCurrentUserId(User);
            TodoItem todoItem = await _todoService.FindById(id, userId);
            if (todoItem == null)
            {
                return NotFound(new { Message = $"Tarefa com {id} não encontrado." });
            }
            return Ok(todoItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem([FromBody] TodoItem todoItem, int id)
        {
            int userId = UserHelper.GetCurrentUserId(User);
            if (id != todoItem.Id)
            {
                return BadRequest(new { Message = "Ids não coincidem." });
            }

            if (todoItem.UserId != userId)
            {
                return BadRequest(new { Message = "VOcê não possue autorização para alterar uma tarefa de outro usuário." });
            }

            TodoItem todoUpdated = await _todoService.Update(todoItem);
            if (todoUpdated.Id != 0)
            {
                return Ok(new { Message = "Tarefa atualizada com sucesso!", todoUpdated });
            }
            return BadRequest(new { Message = "Não foi possível atualizar a tarefa." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            int userId = UserHelper.GetCurrentUserId(User);
            TodoItem todoItem = await _todoService.FindById(id, userId);
            if (todoItem == null)
            {
                return NotFound(new { Message = "Tarefa não encontrada." });
            }
            await _todoService.Delete(todoItem);
            return Ok(new { Message = "Tarefa excluída com sucesso!" });
        }
    }
}
