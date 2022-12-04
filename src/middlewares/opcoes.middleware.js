import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { enqueteCollection, opcoesDeVotosCollection } from "../database/db.js";

export async function opcoesMiddleware(req, res, next) {
  const { title, pollId } = req.body;
  const thisMoment = dayjs();
  console.log(pollId);

  try {
    const findThePool = await enqueteCollection.findOne({
      _id: new ObjectId(pollId),
    });

    const isRepeated = await opcoesDeVotosCollection.findOne({ title });

    if (title === "") {
      return res.sendStatus(422);
    }

    if (isRepeated) {
      return res.sendStatus(409);
    }

    if (thisMoment.isAfter(findThePool.expireAt)) {
      return res.sendStatus(403);
    }

    next();
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function PoolVote(req, res, next) {
  const { id } = req.params;
  const thisMoment = dayjs();

  const idFinded = await opcoesDeVotosCollection
    .find({
      _id: new ObjectId(id),
    })
    .toArray();

  const pollNumber = idFinded[0].pollId;

  const findThePool = await enqueteCollection.findOne({
    _id: new ObjectId(pollNumber),
  });

  if (!findThePool) {
    return res.sendStatus(404);
  }

  if (thisMoment.isAfter(findThePool.expireAt)) {
    return res.sendStatus(403);
  }

  res.locals.isFinded = idFinded[0];

  next();
}
