import { EventModel } from "./event";
import { User } from "./user";

export class TicketModel {
    id: number;
    name: string;
   // eventDetail:EventModel;
    eventDetailId: number;
    seatId: number; 
    userId: number; 
    description:string;  
    eventDate:string;
}