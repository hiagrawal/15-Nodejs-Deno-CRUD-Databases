
import {MongoClient, Database} from "https://deno.land/x/mongo@v0.28.0/mod.ts";

let db: Database;

export function connect(){
    const client = new MongoClient();
    client.connect("mongodb+srv://MongoDbUser:MongoDbUser@cluster0.kij6e.mongodb.net/?retryWrites=true&w=majority");
    db = client.database('Deno');
}

export function getDB(){
    return db;
}


