import {MongoClient} from 'mongodb'
import { schema } from "./schema.ts";
import { resolvers } from "./resolvers.ts";
import {ApolloServer} from '@apollo/server'
import {startStandaloneServer} from '@apollo/server/standalone'
import { testModel } from "./types.ts";

//
const MONGO_URL = Deno.env.get("MONGO_URL");

if(!MONGO_URL){
  throw new Error("No se encontro URL");
}

const client = new MongoClient(MONGO_URL);

await client.connect();


const db = client.db("ordinaria");
const miCollection = db.collection<testModel>("ordinaria");


const server = new ApolloServer({
  typeDefs:schema,
  resolvers:resolvers,
});


const { url } = await startStandaloneServer(server, {
  context: async () => (await { miCollection }),
  listen: { port: 8080 },
  
});

console.log(`🚀  Server ready at: ${url}`);