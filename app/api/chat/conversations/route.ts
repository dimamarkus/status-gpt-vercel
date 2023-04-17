import mongoClientPromise from "#/lib/databases/mongodb";

export async function GET() {
  const client = await mongoClientPromise;
  //   // console.log("client", client);
  //   const db = client.db("chat_data");
  //   const conversations = await db
  //     .collection("conversations")
  //     .find({})
  //     //   .sort({ metacritic: -1 })
  //     .limit(20)
  //     .toArray();
  //   console.log("conversations", conversations);
  //   // const res = await fetch('https://data.mongodb-api.com/...', {
  //   //   headers: {
  //   //     'Content-Type': 'application/json',
  //   //     'API-Key': process.env.DATA_API_KEY,
  //   //   },
  //   // });
  //   // const data = await res.json();
  //   return NextResponse.json({ conversations });
}

// export async function POST(req: Request) {
//   const requestBody = (await req.json()) as { botConversations: BotConversations };
//   console.log("requestBody", requestBody);

//   const client = await mongoClientPromise;
//   // console.log("client", client);
//   const db = client.db("chat_data");

//   const conversations = await db.collection("conversations").insertOne(requestBody);

//   return NextResponse.json({ conversations });
// }
