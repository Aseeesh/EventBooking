using Core.Interfaces;
using Core.Models;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class UnitOfWork : IUnitOfWork 
    {
        private readonly ApplicationDbContext _context;
        private IEventDetailRepository _eventBooking;
        private IEventCategoryRepository _eventCategory;
        private ITicketDetailRepository _ticketDetail; 
        private IUserRepository _users;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }
     
        public IEventDetailRepository EventDetails
            => _eventBooking = _eventBooking ?? new EventDetailRepository(_context);

        public IEventCategoryRepository EventCategories
        => _eventCategory = _eventCategory ?? new EventCategoryRepository(_context);

        public ITicketDetailRepository TicketDetails
        => _ticketDetail = _ticketDetail ?? new TicketDetailRepository(_context);

        public IUserRepository Users
            => _users = _users ?? new UserRepository(_context);
      
        public async Task<bool> SaveAsync()
            => await _context.SaveChangesAsync() > 0;

        public void Dispose()
            => _context.Dispose();

        
    }
}
