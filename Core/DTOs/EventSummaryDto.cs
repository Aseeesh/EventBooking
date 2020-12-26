using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Models
{
    public class EventSummaryDto
    {
        public int Id { get; set; } 
        public string Category { get; set; } 
        public int NoOfSeats { get; set; }
        public string EventTitle { get; set; }
        public string EventName { get; set; }
        public string EventDescription { get; set; }
        public DateTime EventDate { get; set; } 
    }
}
