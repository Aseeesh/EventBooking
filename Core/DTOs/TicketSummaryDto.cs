using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Models
{
    public class TicketSummaryDto
    {
        public int Id { get; set; } 
        public int EventId { get; set; } 
        public int SeatId { get; set; }
        public string SeatStatus { get; set; } 
    }
}
