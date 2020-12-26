using AutoMapper;
using AutoMapper.Configuration;
using Core.DTOs;
using Core.Interfaces;
using Core.Models;
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
    public class EventCategoryController : ControllerBase
    { 
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public EventCategoryController( 
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
              
           
            var eventCategories = await _unitOfWork.EventCategories.GetAllAsync();

            var eventCategoriesDto = _mapper.Map<IEnumerable<EventCategoryDto>>(eventCategories);
            
            return Ok(eventCategoriesDto);
        }
 
  
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
           

            var eventCategory = await _unitOfWork.EventCategories.GetByIdAsync(id);

            if(eventCategory == null)
            {
                return NotFound();
            }

            var eventBookingDto = _mapper.Map<EventCategoryDto>(eventCategory);

            return Ok(eventBookingDto);
        }
 
        [AllowAnonymous]
        [HttpPost]   
        public async Task<IActionResult> Create(EventCategoryDto eventCategoryDto)
        {
            try
            {
               
                if (eventCategoryDto.Id > 0)
                {
                    var eventCategory = await _unitOfWork.EventCategories.GetByIdAsync(eventCategoryDto.Id);

                    if (eventCategory == null)
                    {
                        return NotFound();
                    }

                    _mapper.Map(eventCategoryDto, eventCategory);
                    _unitOfWork.EventCategories.Update(eventCategory);
                  

                    await _unitOfWork.SaveAsync();

                    return NoContent();
                }

                else
                {

                    var eventCategory = _mapper.Map<EventCategory>(eventCategoryDto);
                    eventCategory.CreatedAt = DateTime.Now;
                    await _unitOfWork.EventCategories.AddAsync(eventCategory);

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
        public async Task<IActionResult> Update(int id, EventDetailDto eventCategoryDto)
        {
            try
            { 
                var eventCategory = await _unitOfWork.EventCategories.GetByIdAsync(id);

                if (eventCategory == null)
                {
                    return NotFound();
                }

                _mapper.Map(eventCategoryDto, eventCategory);
                _unitOfWork.EventCategories.Update(eventCategory);
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
            var eventCategory = await _unitOfWork.EventCategories.GetByIdAsync(id);

            _unitOfWork.EventCategories.Remove(eventCategory);

            if(await _unitOfWork.SaveAsync())
            {
                return NoContent();
            }

            throw new Exception("Error deleting eventCategory");
        }
    }
}
