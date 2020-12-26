using System;
using System.Collections.Generic;
using System.Text;

namespace Core.DTOs
{
    public class EventDetailDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int EventCategoryId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime EventDate { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
