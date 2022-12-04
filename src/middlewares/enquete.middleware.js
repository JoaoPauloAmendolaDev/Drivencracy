export async function PoolValidation(req, res, next) {
  let { title } = req.body;
  console.log("entrei");

  if (!title) {
    return res.sendStatus(422);
  }
  next();
}
