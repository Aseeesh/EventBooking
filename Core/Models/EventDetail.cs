using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Models
{
    public class EventDetail
    {
        public int Id { get; set; } 
        public string Name { get; set; } 
        public int CreatedBy { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int EventCategoryId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime EventDate { get; set; }

        public virtual EventCategory EventCategory { get; set; }
    }
}
