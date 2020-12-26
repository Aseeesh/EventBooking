using Core.Interfaces;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class EventSummaryRepository : GenericRepository<EventSummaryDto>, IEventSummaryRepository
    {
        public EventSummaryRepository(ApplicationDbContext context) : base(context) { }
    }
   
    
}
 