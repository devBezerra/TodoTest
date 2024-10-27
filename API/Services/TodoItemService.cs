using API.Models;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class TodoItemsService(AppDbContext context)
    {
        private readonly AppDbContext _context = context;

        public async Task<TodoItem> Create(string title, string description, int userId)
        {
            var todoItem = new TodoItem
            {
                Title = title,
                Description = description,
                UserId = userId
            };

            _context.TodoItems.Add(todoItem);
            _context.Entry(todoItem).State = EntityState.Added;
            await _context.SaveChangesAsync();

            return todoItem;
        }
        public async Task<List<TodoItem>> FindByUserId(int userId, int pageNumber, int pageSize)
        {
            return await _context.TodoItems
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Where(t => t.UserId == userId)
                .ToListAsync();
        }

        public async Task<TodoItem> FindById(int id, int userId)
        {
            return await _context.TodoItems
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
        }

        public async Task<TodoItem> Update(TodoItem todoItem)
        {
            _context.Entry(todoItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return todoItem;
        }

        public async Task<bool> Delete(TodoItem todoItem)
        {
            _context.Entry(todoItem).State = EntityState.Deleted;
            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
