import clientPromise from "../../lib/mongoDB";

const date = Date().slice(4, 16);
let totals = [];
let savingsArr = [];

export default async (req, res) => {
  //connect to db
  const client = await clientPromise;
  const db = await client.db("expenses");
  let deposits = await db.collection("deposits");

  //get totals then push it to totals
  const expenses = await db.collection("deposits").find({}).toArray();

  const allTotals = expenses.map((last) => last.total);
  const lastTotal = allTotals[allTotals.length - 1];
  totals.push(lastTotal);

  const allSavings = expenses.map((last) => last.totalSavings);
  const lastSaving = allSavings[allSavings.length - 1];
  console.log(lastTotal, lastSaving, totals[0]);
  savingsArr.push(lastSaving);

  if (req.method === "POST") {
    let data = {
      deposit: req.body.deposit,
      date: date,
      price: req.body.price,
      withdraw: req.body.withdraw,
      savings: req.body.savings,
      id: Date.now(),
      total:
        totals.length === 1 && totals[0] === undefined
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
        savingsArr.length === 1 && savingsArr[0] === undefined
          ? Number(req.body.savings)
          : Number(req.body.savings) + savingsArr.pop(),
    };
    savingsArr.push(data.totalSavings);
    totals.push(data.total);

    await deposits.insertOne(data);

    deposits = await db.collection("deposits").find({}).toArray();

    return res.status(200).json(deposits);
  }
};
