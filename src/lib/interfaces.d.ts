import { ObjectId } from "mongoose";

export interface Event {
    id: ObjectId;
    name: string;
    dateTime: Date;
    memberCount: number;
    status: "UPCOMING" | "ONGOING" | "CLOSED";
    fee: number;
    rules: string[];
    category: "TECH" | "NONTECH" | "CULTURAL" | "SPORTS";
    gender: "BOTH" | "BOYS" | "GIRLS";
    imageURL: string;
}


export interface Registration {
    id: ObjectId;
    phoneNo: number;
    mails: string[];
    eventID: string;
    name: string;
    dateTime: Date;
}


