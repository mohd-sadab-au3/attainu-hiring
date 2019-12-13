const express = require('express');
const mongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://attainu:attainu123@cluster0-42ijv.mongodb.net/test?retryWrites=true&w=majority";
let db;
mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {

    if (error)
        throw new Error("database error");
    db = client.db("state");
    console.log("connected");
})

const app = express();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));


//@route get
//@description getting all the cities having starting alphabet
app.get("/showAllCities/:alpha", async (req, res) => {
    const result = await db.collection('state').find({}, { fields: { cities: 1, _id: 0 } }).toArray();

    let city = result.map(details => details.cities.filter(
        city => city[0].toLowerCase() === req.params.alpha.toLowerCase()));

    city = [].concat.apply([], city);
    city.sort();
    res.json({ ...city });


})

//@route get
//@description getting the state of the city
app.get("/state/:city", async (req, res) => {

    console.log(req.params.city)
    const result = await db.collection('state').findOne({ cities: req.params.city });

    res.json(result.state);
})

//@route put
//@description removing the city of given state
app.put("/state/:stateName/remove/:cityName", async (req, res) => {

    const result = await db.collection('state').findOneAndUpdate({ state: req.params.stateName }, { $pull: { cities: req.params.cityName } }, { returnOriginal: false });

    console.log("result", result.value);

    res.json(result.value);

})

//@route put
//@description adding the city of given state
app.put("/state/:stateName/add/:cityName", async (req, res) => {

    console.log(req.params.stateName);
    const result = await db.collection('state').findOneAndUpdate({ state: req.params.stateName }, { $push: { cities: req.params.cityName } }, { returnOriginal: false });

    console.log("result", result.value);

    res.json(result.value);

})

app.listen(8000, () => console.log("started at port 8000"));





