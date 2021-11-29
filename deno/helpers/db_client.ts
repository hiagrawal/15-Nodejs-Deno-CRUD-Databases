
import {MongoClient, Database} from "https://deno.land/x/mongo@0.28.0/mod.ts";

let db: Database;

export function connect(){
    const client = new MongoClient();
    client.connectWithUri("mongodb+srv://MongoDbUser:MongoDbUser@cluster0.kij6e.mongodb.net?retryWrites=true&w=majority");
    db = client.database('Deno');
}

export function getDB(){
    return db;
}


