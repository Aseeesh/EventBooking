using Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ITicketDetailRepository : IGenericRepository<TicketDetail>
    {

        Task<IEnumerable<TicketDetail>> TicketSummaryStoreProcedure(string query, params object[] parameters);
    }
}
