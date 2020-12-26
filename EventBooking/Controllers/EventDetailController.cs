using AutoMapper; 
using Core.DTOs;
using Core.Interfaces;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [AllowAnonymous]
    public class EventDetailController:ControllerBase
    { 
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IEventSummaryRepository _IEventSummaryRepository;


        public EventDetailController( 
            IUnitOfWork unitOfWork, 
            IMapper mapper 
            )
        { 
            _unitOfWork = unitOfWork;
            _mapper = mapper; 
    }
         
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
              
                var eventDetails = await _unitOfWork.EventDetails.GetAllAsync();

            var eventDetailsDto = _mapper.Map<IEnumerable<EventDetailDto>>(eventDetails);
            
            return Ok(eventDetailsDto);
            }
            catch (Exception ex)
            {

                throw;
            }
          
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllById(int id)
        {
           

            var eventDetails = await   _unitOfWork.EventDetails.Find(x=>x.CreatedBy == id);

            var eventDetailsDto = _mapper.Map<IEnumerable<EventDetailDto>>(eventDetails);

            return Ok(eventDetailsDto);
        }
  
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
           

            var eventBooking = await _unitOfWork.EventDetails.GetByIdAsync(id);

            if(eventBooking == null)
            {
                return NotFound();
            }

            var eventBookingDto = _mapper.Map<EventDetailDto>(eventBooking);

            return Ok(eventBookingDto);
        }
 
        [AllowAnonymous]
        [HttpPost]   
        public async Task<IActionResult> Create(EventDetailCreateDto eventBookingCreateDto)
        {
            try
            {
               
                if (eventBookingCreateDto.Id > 0)
                {
                    var eventBooking = await _unitOfWork.EventDetails.GetByIdAsync(eventBookingCreateDto.Id);

                    if (eventBooking == null)
                    {
                        return NotFound();
                    }

                    _mapper.Map(eventBookingCreateDto, eventBooking);
                    _unitOfWork.EventDetails.Update(eventBooking);
                  

                    await _unitOfWork.SaveAsync();

                    return NoContent();
                }

                else
                {

                    var eventBooking = _mapper.Map<Core.Models.EventDetail>(eventBookingCreateDto);

                    await _unitOfWork.EventDetails.AddAsync(eventBooking);

                    if (await _unitOfWork.SaveAsync())
                    {
                        return StatusCode(201);
                    }
                    return StatusCode(401);



                }
            }
            
            catch (Exception ex)
            {


                throw new Exception("Creating eventBooking failed on saver");
            }
        }
         
        [AllowAnonymous]
        [HttpPut("{id}")] 
        public async Task<IActionResult> Update(int id, EventDetailDto eventBookingUpdateDto)
        {
            try
            { 
                var eventBooking = await _unitOfWork.EventDetails.GetByIdAsync(id);

                if (eventBooking == null)
                {
                    return NotFound();
                }

                _mapper.Map(eventBookingUpdateDto, eventBooking);
                _unitOfWork.EventDetails.Update(eventBooking);
              await _unitOfWork.SaveAsync();
                
                    return NoContent();
                 
            }
            catch (Exception ex)
            {

                throw new Exception($"Updating user {id} failed on save");
            }
     
        }
         
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var eventBooking = await _unitOfWork.EventDetails.GetByIdAsync(id);

            _unitOfWork.EventDetails.Remove(eventBooking);

            if(await _unitOfWork.SaveAsync())
            {
                return NoContent();
            }

            throw new Exception("Error deleting eventBooking");
        }
    }
}
