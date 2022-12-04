import { ObjectId } from "mongodb";
import {
  enqueteCollection,
  opcoesDeVotosCollection,
  votosCollection,
} from "../database/db.js";

export async function PoolValidation(req, res, next) {
  let { title } = req.body;

  if (!title) {
    return res.sendStatus(422);
  }
  next();
}

export async function PoolRequestOptionList(req, res) {
  const { id } = req.params;

  console.log(id);

  try {
    console.log("passei aqui");

    const idFinded = await opcoesDeVotosCollection
      .find({
        pollId: id,
      })
      .toArray();

    if (idFinded) {
      return res.send(idFinded).status(200);
    } else {
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function PoolRequest(req, res) {
  const { id } = req.params;
  let arrayDeTitles = [];
  let arrayDeVotos = [];
  let bigger = 0;
  let title = "";
  console.log("entrei na funcão");
  try {
    console.log("entrei no try");
    const findThePool = await enqueteCollection.findOne({
      _id: new ObjectId(id),
    });

    if (findThePool) {
      const allOptions = await opcoesDeVotosCollection
        .find({ pollId: id })
        .toArray();

      allOptions.map((item) => {
        if (item.pollId === id) {
          arrayDeTitles.push(item.title);
        }
      });

      const allVotes = await votosCollection.find({}).toArray();
      console.log(allVotes);

      const allVotesFiltered = allVotes.map((item) => {
        if (arrayDeTitles.includes(item.title)) {
          arrayDeVotos.push(item);
        }
      });

      arrayDeVotos.map((item) => {
        if (item.votes >= bigger) {
          bigger = item.votes;
          title = item.title;
        }
      });

      res.send({ findThePool, result: { title, votes: bigger } }).status(200);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
