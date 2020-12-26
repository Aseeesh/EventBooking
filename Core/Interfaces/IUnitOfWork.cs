using Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IUnitOfWork  : IDisposable
    {
        IEventDetailRepository EventDetails { get; }
        IEventCategoryRepository EventCategories { get; }
        ITicketDetailRepository TicketDetails { get; }
        //  Task<IEnumerable<EventSummary>> ExecWithStoreProcedure(string query, params object[] parameters);
       // Task<List<EventSummaryDto>> EventSummaryStoreProcedure(string query);
        //Task<List<EventSummaryDto>> EventSummaryStoreProcedure(string query);
        //Task<List<TicketSummaryDto>> TicketSummaryStoreProcedure(string query);
        IUserRepository Users { get; }
        Task<bool> SaveAsync();
    }
}
