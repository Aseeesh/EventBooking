using System;
using System.Collections.Generic;
using System.Text;

namespace Core.DTOs
{
    public class TicketDetailDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int EventDetailId { get; set; }
        public int SeatId { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }
    }
}
