using Core.Interfaces;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class TicketDetailRepository : GenericRepository<TicketDetail>, ITicketDetailRepository
    {
        public TicketDetailRepository(ApplicationDbContext context):base(context) { }

        public async Task<IEnumerable<TicketDetail>> TicketSummaryStoreProcedure(string query, params object[] parameters)
        {
            return await _context.TicketDetails.FromSqlRaw("EXECUTE " + query).ToListAsync();// _context.Database.ExecuteSqlRawAsync("EXEC  Proc_eventSummary @eventId {0},@createdBy {1}" ,   0,1);
        }
        
    }


}
