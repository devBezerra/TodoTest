using System.Text.Json.Serialization;

namespace API.Models
{
    public class User : BaseEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        [JsonIgnore]
        public List<TodoItem> TodoItems { get; set; } = [];
    }

}
