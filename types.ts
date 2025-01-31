import { OptionalId } from "mongodb";

export type restaurantModel = OptionalId<{
    name:string,
    address:string,
    country:string,
    city:string,
    telephone:string,
    timezone:string
}>