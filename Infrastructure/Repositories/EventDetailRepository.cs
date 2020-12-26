using Core.Interfaces;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Repositories
{
    public class EventDetailRepository:GenericRepository<EventDetail>, IEventDetailRepository
    {
        public EventDetailRepository(ApplicationDbContext context):base(context) { }
    }
}
