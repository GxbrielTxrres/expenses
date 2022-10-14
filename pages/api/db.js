import clientPromise from "../../lib/mongoDB";

let totals = [];
let savingsArr = [];

export default async (req, res) => {
  const client = await clientPromise;
  const date = Date().slice(4, 16);

  const db = await client.db("expenses");

  let posts = await db.collection("deposits");

  if (req.method === "POST") {
    let data = {
      deposit: req.body.deposit,
      date: date,
      price: req.body.price,
      withdraw: req.body.withdraw,
      savings: req.body.savings,
      id: Date.now(),
      total:
        totals.length === 0
          ? Number(req.body.deposit) -
            Number(req.body.savings) -
            Number(req.body.withdraw) -
            Number(req.body.price)
          : Number(req.body.deposit) -
            Number(req.body.savings) -
            Number(req.body.withdraw) -
            Number(req.body.price) +
            totals.pop(),
      totalSavings:
        savingsArr.length === 0
          ? Number(req.body.savings)
          : Number(req.body.savings) + savingsArr.pop(),
    };
    savingsArr.push(data.totalSavings);
    totals.push(data.total);

    await posts.insertOne(data);

    posts = await db.collection("deposits").find({}).toArray();

    return res.status(200).json(posts);
  }
  posts = await db.collection("deposits").find({}).toArray();
  return res.status(200).json(posts);
};
