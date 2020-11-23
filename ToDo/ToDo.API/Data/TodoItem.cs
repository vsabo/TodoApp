using System;
#nullable disable

namespace ToDo.API.Data
{
    public partial class TodoItem
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime DateTimeCreated { get; set; }
    }
}
