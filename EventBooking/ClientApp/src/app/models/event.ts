import { CategoryModel } from "./category";
import { User } from "./user";

export class EventModel {
    id: number;
    name: string;
    title: string;
    description: string; 
    eventCategory:CategoryModel;
    eventCategoryId:number;
    createdBy:string;
    eventDate:string;
    createdAt:string;
}