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
    public class TicketDetailController : ControllerBase
    { 
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public TicketDetailController( 
            IUnitOfWork unitOfWork, 
            IMapper mapper
            )
        { 
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
         
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll(int eventId)
        {
            try
            {
               

                var TicketDetails = await _unitOfWork.TicketDetails.Find(x => x.EventDetailId == eventId);

                var TicketDetailsDto = _mapper.Map<IEnumerable<TicketDetailDto>>(TicketDetails);
            
                    return Ok(TicketDetailsDto);
            }
            catch (Exception ex)
            {

                throw;
            }
           
         
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllByUserId(int id)
        {

            try
            {


                var TicketDetailsDto = await _unitOfWork.TicketDetails.Find(x => x.UserId == id);
                 

                return Ok(TicketDetailsDto);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTicketsByEvent(int id)
        {
            
            try
            {


                    string _proc = "  Proc_ticketSummary  @eventId = " + id;

                    var TicketDetailsDto = await _unitOfWork.TicketDetails.TicketSummaryStoreProcedure(_proc);

                    if (TicketDetailsDto == null)
                    {
                        return NotFound();
                    }

                 //  var TicketDetailsDto = _mapper.Map<IEnumerable<TicketDetailDto>>(TicketDetails);

                    return Ok(TicketDetailsDto);
            }
            catch (Exception ex )
            {

                throw;
            }
             
        }


        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
           

            var _model = await _unitOfWork.TicketDetails.GetByIdAsync(id);

            if(_model == null)
            {
                return NotFound();
            }

            var _modelDto = _mapper.Map<TicketDetailDto>(_model);

            return Ok(_modelDto);
        }
 
        [AllowAnonymous]
        [HttpPost]   
        public async Task<IActionResult> Create(TicketDetailDto _modelCreateDto)
        {
            try
            {
               
                if (_modelCreateDto.Id > 0)
                {
                    var _model = await _unitOfWork.TicketDetails.GetByIdAsync(_modelCreateDto.Id);

                    if (_model == null)
                    {
                        return NotFound();
                    }
                    _model.CreatedAt = DateTime.Now;
                    _mapper.Map(_modelCreateDto, _model);
                    _unitOfWork.TicketDetails.Update(_model);
                  

                    await _unitOfWork.SaveAsync();

                    return NoContent();
                }

                else
                {

                    var _model = _mapper.Map<TicketDetail>(_modelCreateDto);
                    _model.CreatedAt = DateTime.Now;

                    await _unitOfWork.TicketDetails.AddAsync(_model);

                    if (await _unitOfWork.SaveAsync())
                    {
                        return StatusCode(201);
                    }
                    return StatusCode(401);



                }
            }
            
            catch (Exception ex)
            {


                throw new Exception("Creating _model failed on saver");
            }
        }
         
        [AllowAnonymous]
        [HttpPut("{id}")] 
        public async Task<IActionResult> Update(int id, TicketDetailDto _modelUpdateDto)
        {
            try
            { 
                var _model = await _unitOfWork.TicketDetails.GetByIdAsync(id);

                if (_model == null)
                {
                    return NotFound();
                }

                _mapper.Map(_modelUpdateDto, _model);
                _unitOfWork.TicketDetails.Update(_model);
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
            var _model = await _unitOfWork.TicketDetails.GetByIdAsync(id);

            _unitOfWork.TicketDetails.Remove(_model);

            if(await _unitOfWork.SaveAsync())
            {
                return NoContent();
            }

            throw new Exception("Error deleting _model");
        }
    }
}
