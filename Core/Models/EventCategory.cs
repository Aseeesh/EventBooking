using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Models
{
    public class EventCategory
    {
        public int Id { get; set; } 
        public string Name { get; set; } 
        public int NoOfSeats { get; set; } 
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } 
    }
}
