import { Data } from './data';
import { User } from './user';
export interface Ticket {
    bookid: number;
    seatnum: string;
    movieId: number;
    userid: number;
    ticketQuantity:number;
    date: Date;
    slot :string;
    data?:Data;
    movieDetails?: any;
    user?: User;
}
