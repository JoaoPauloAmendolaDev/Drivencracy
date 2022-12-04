import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
  console.log("MongoDB Connected!");
} catch {
  console.log("erro ao conectar ao MongoDB");
}

const db = mongoClient.db("Drivencracy");
export const enqueteCollection = db.collection("enquete");
export const opcoesDeVotosCollection = db.collection("opcoesDeVotos");
export const votosCollection = db.collection("votos");
