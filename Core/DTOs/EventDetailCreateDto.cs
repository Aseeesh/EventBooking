using System;
using System.Collections.Generic;
using System.Text;

namespace Core.DTOs
{
    public class EventDetailCreateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int EventCategoryId { get; set; }
        public int CreatedBy { get; set; }
        public string EventDate { get; set; }
        public string CreatedAt { get; set; }
    }
}
