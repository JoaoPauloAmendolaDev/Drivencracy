import dayjs from "dayjs";
import { votosCollection } from "../database/db.js";

export default async function confirmVote(req, res) {
  const { id } = req.params;
  const thisMoment = dayjs().format("YYYY-MM-DD HH:mm");
  const { isFinded } = res.locals;
  const { title } = isFinded;

  try {
    let isVoted = await votosCollection.findOne({ title });

    if (!isVoted) {
      const vote = await votosCollection.insertOne({
        title,
        votes: 1,
        createdAt: thisMoment,
      });
      return res.send(201);
    } else {
      let newVotes = isVoted.votes + 1;
      await votosCollection.updateOne(isVoted, { $set: { votes: newVotes } });
      return res.send(201);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
