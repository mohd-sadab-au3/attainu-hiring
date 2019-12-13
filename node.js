const data = require('./data/cities.json');
const mongoClient = require('mongodb').MongoClient;
//const obj = {};
let details = [];
//console.log(data);

for (let i = 0; i < data.length; i++) {

   const index = details.findIndex(x => x.state === data[i].state);
   if (index === -1) {
      details.push({
         state: data[i].state,
         cities: data[i].name ? [data[i].name] : []
      })
   }
   else {

      if (data[i].name)
         details[index].cities.push(data[i].name);
   }

}

const url = "mongodb+srv://attainu:attainu123@cluster0-42ijv.mongodb.net/test?retryWrites=true&w=majority";
let db;
mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async (error, client) => {

   if (error)
      throw new Error("database error");
   db = client.db("state");
   console.log("connected");

   const val = await db.collection('state').find({}).toArray();
   // console.log("val ", val);
   if (!val.length) {
      db.collection('state').insertMany(details);
      console.log("done");
   }
   else {
      console.log("data is already inserted in the database I can perform delete also but i think this is better approach not to delete ");
   }
})


//console.log(details);