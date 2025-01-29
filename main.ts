import { MongoClient } from "mongodb";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "npm:@apollo/server/standalone";
import { schema } from "./schema.ts";
import { resolvers } from "./resolvers.ts";


const MONGO_URL = Deno.env.get("MONGO_URL");
if (!MONGO_URL) {throw new Error("Mongo URL not found")};

const Client = new MongoClient(MONGO_URL);
await Client.connect();
console.info("Client connected");

const db = Client.db("Ordinaria");
//const testCollection = db.collection<TestModel>("test");

//APIREST
/*
const handler = async (req: Request): Promise<Response> => {
  const method = req.method;
  const url = new URL(req.url);
  const path = url.pathname;

  if(method === "GET"){
    if(path=== "/test"){
      return new Response(JSON.stringify("Hola"),{status:200});
    }
  }else if(method === "POST"){

  }else if(method === "PUT"){

  }else if(method === "DELETE"){

  }
  return new Response("Endpoint not found", {status: 404});
}

Deno.serve({port:8080}, handler);
*/

//GRAPHQL



const server = new ApolloServer({typeDefs: schema, resolvers,});
const { url } = await startStandaloneServer(server, {
  context: async () => (await {  }),
  listen: { port: 8080 }
});
console.info(`Server ready at ${url}`);