import { Collection } from "mongodb";
import { restaurantModel } from "./types.ts";
import { ObjectId } from "mongodb";
import { GraphQLError } from "graphql";

import { getCoordinates, getTime, getWeather, validatePhone } from "./api.ts";




export type Context = {
    restaurantCollection:Collection<restaurantModel>
}



export const resolvers = {
    Query: {
        getRestaurant:async(_:unknown,args:{id:string},ctx:Context):Promise<restaurantModel> => {
            const myRestaurant = await ctx.restaurantCollection.findOne({_id:new ObjectId(args.id)})
            if(!myRestaurant){throw new GraphQLError("Restaurante no encontrado")}
            return myRestaurant
        },
        getRestaurants:async(_:unknown,args:{city:string},ctx:Context):Promise<restaurantModel[]> =>{
            const myRestaurants = await ctx.restaurantCollection.find({city:args.city}).toArray();  
            if(myRestaurants.length===0){throw new GraphQLError("No existe ningun restaurante en esa ciudad")}
            return myRestaurants;
        }
    },



    Mutation : {
        addRestaurant:async(_:unknown,args:{name:string,address:string,city:string,telephone:string},ctx:Context):Promise<restaurantModel> => {
            const miVal = await validatePhone(args.telephone);
            if(!miVal.is_valid){
                throw new GraphQLError("Telefono no vaido")
            }
            const myRestaurants = await ctx.restaurantCollection.find().toArray()
            const myTelephones = myRestaurants.map((e)=> e.telephone)
            
            for(let i=0;i<myTelephones.length;i++){
                if(args.telephone===myTelephones[i]){
                    throw new GraphQLError("Telefono repetido")
                }
            }
            

            const {insertedId} = await ctx.restaurantCollection.insertOne({
                name:args.name,
                address:args.address,
                city:args.city,
                country:miVal.country,
                telephone:args.telephone,
                timezone:miVal.timezones[0]
            })


            if(!insertedId){
                throw new Error("Restaurante no añadido correctamente")
            }

            return {
                _id:insertedId,
                name:args.name,
                address:args.address,
                city:args.city,
                telephone:args.telephone,
                timezone:miVal.timezones[0],
                country:miVal.country,
            }
        },

        deleteRestaurant:async(_:unknown,args:{id:string},ctx:Context):Promise<boolean> => {
            const {deletedCount} =await ctx.restaurantCollection.deleteOne({_id:new ObjectId(args.id)});
            if(deletedCount!==0){
                return true
            }else {
                return false 
            }
        }
    },


    restaurant:{
        id:(parent:restaurantModel):string=> {
            return parent._id!.toString()
        },
        temperature:async(parent:restaurantModel):Promise<number> =>{
            const miGeo = await getCoordinates(parent.country);
            const miTemp = await getWeather(miGeo[0].latitude,miGeo[0].longitude)
            return miTemp
        },
        time:async(parent:restaurantModel):Promise<string> => {
            const miTime = await getTime(parent.timezone)
            return miTime.hour + ":" + miTime.minute
        },
        address:(parent:restaurantModel):string =>{
            const miAddress =  parent.address + " " + parent.city + " " + parent.country;
            return miAddress

        }
    }


}