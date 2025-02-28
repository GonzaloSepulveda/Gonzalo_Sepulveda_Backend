import { MongoClient } from "mongodb";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "npm:@apollo/server/standalone";
import { schema } from "./schema.ts";
import { resolvers } from "./resolvers.ts";
import { restaurantModel } from "./types.ts";
//327993

const MONGO_URL = Deno.env.get("MONGO_URL");
if (!MONGO_URL) {throw new Error("Mongo URL not found")};

const Client = new MongoClient(MONGO_URL);
await Client.connect();
console.info("Client connected");

const db = Client.db("restaurant");
const restaurantCollection = db.collection<restaurantModel>("restaurants");


const server = new ApolloServer({typeDefs: schema, resolvers,});
const { url } = await startStandaloneServer(server, {
  context: async () => (await {restaurantCollection}),
  listen: { port: 8080 }
});
console.info(`Server ready at ${url}`);