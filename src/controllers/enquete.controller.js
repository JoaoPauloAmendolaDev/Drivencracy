import dayjs from "dayjs";
import { enqueteCollection } from "../database/db.js";

export async function PostPool(req, res) {
  let { title, expireAt } = req.body;
  let today;

  if (!expireAt) {
    today = dayjs().add(30, "day").format("YYYY-MM-DD HH:mm");
  } else {
    today = expireAt;
  }

  try {
    const finded = await enqueteCollection.findOne({ title });

    if (finded) {
      return res.sendStatus(409);
    }

    await enqueteCollection.insertOne({ title, expireAt: today });
    console.log(today);
    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function GetPool(req, res) {
  try {
    const allPools = await enqueteCollection.find().toArray();

    res.status(200).send(allPools);
  } catch (err) {}
}
