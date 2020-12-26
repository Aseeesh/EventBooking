using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Models
{
    public class TicketDetail
    {
        public int Id { get; set; } 
        public string Name { get; set; } 
        public int EventDetailId { get; set; }
        public int SeatId { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }

        public virtual EventDetail EventDetail { get; set; }
        public virtual User User { get; set; }
    }
}
