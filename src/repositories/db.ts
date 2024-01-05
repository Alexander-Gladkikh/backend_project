import {MongoClient} from "mongodb";
import {CoursesType} from "./courses-db-repository";

const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017";

export const client = new MongoClient(mongoUri);
const db = client.db("learningTutorial")
export const coursesCollection = db.collection<CoursesType>("courses");
export async function runDb() {
  try{
    await client.connect();
    await client.db('learningTutorial').command({ping: 1});
    console.log('Connected successfully to mongo sever')
  }
  catch {
    console.log("Can't connect to db");
    await client.close();
  }
}
