import clientPromise from "../../lib/mongoDB";

export default async (req, res) => {
  const client = await clientPromise;
  const date = Date().slice(4, 16);

  const db = await client.db("expenses");

  let posts = await db.collection("deposits");
  if (req.method === "POST") {
    let data = {
      depositOne: req.body.depositOne,
      id: Date.now(),
      date: date,
      price: req.body.price,
      withdraw: req.body.withdraw,
    };

    await posts.insertOne(data);

    posts = await db.collection("deposits").find({}).toArray();

    posts = posts.map((post) => {
      return JSON.parse(JSON.stringify(post));
    });

    console.log(posts);
    return res.status(200).json(posts);
  }
  posts = await db.collection("deposits").find({}).toArray();
  return res.status(200).json(posts);
};
