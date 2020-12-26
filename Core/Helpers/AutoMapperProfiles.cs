using AutoMapper;
using Core.DTOs;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Helpers
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<EventDetailCreateDto, EventDetail>();
            CreateMap<EventCategoryDto, EventCategory>();
            CreateMap<EventCategory, EventCategoryDto>();
            CreateMap<TicketDetailDto, TicketDetail>();
         //   CreateMap<TicketDetail, TicketDetailDto>();
            CreateMap<EventDetailDto, EventDetail>();
            CreateMap<EventDetail, EventDetailDto>();
            CreateMap<UserRegisterDto, User>();
            CreateMap<UserLoginDto, User>();
            CreateMap<User, UserDetailDto>();
        }
    }
}
