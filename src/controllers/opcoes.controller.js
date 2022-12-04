import dayjs from "dayjs";
import { opcoesDeVotosCollection } from "../database/db.js";

export default async function opcoesController(req, res) {
  const { title, pollId } = req.body;
  let momentum = dayjs();

  momentum = momentum.format("YYYY-MM-DD HH:mm");

  try {
    const postOptions = await opcoesDeVotosCollection.insertOne({
      title,
      pollId,
      createdAt: momentum,
    });
    console.log(postOptions);
    if (postOptions) {
      res.sendStatus(201);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
