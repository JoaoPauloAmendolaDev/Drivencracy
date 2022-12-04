import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { enqueteCollection } from "../database/db.js";

export default async function opcoesController(req, res, next) {
  const { title, pollId } = req.body;
  console.log(pollId);

  try {
    const findThePool = await enqueteCollection.findOne({
      _id: new ObjectId(pollId),
    });

    const isRepeated = await enqueteCollection.findOne({ title });

    if (!findThePool || !title) {
      return res.sendStatus(422);
    }

    if (isRepeated) {
      return res.sendStatus(409);
    }

    const thisMoment = dayjs();
    if (thisMoment.isAfter(findThePool.expireAt)) {
      return res.sendStatus(403);
    }

    next();
  } catch (err) {
    return res.sendStatus(500);
  }
}
