export const schema =`#graphql   
    type restaurant {
        id:ID!
        name:String!
        address:String!
        telephone:String!
        temperature:Int!
        time:String!
    }
     
    type Query{
        getRestaurant(id:ID!):restaurant
        getRestaurants(city:String!):[restaurant!]!
    }

    type Mutation{
        addRestaurant(name:String!,address:String!,city:String!,telephone:String!):restaurant
        deleteRestaurant(id:ID!):Boolean!
    }




`