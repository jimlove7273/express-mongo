const express = require("express")
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const app = express()


// -- New Body Parser since Express 4.16+
app.use(express.json()); //Used to parse JSON bodies


// --------------------------------
// Connect to MongoDB
// --------------------------------
const connectionString = "mongodb+srv://yoda:babyyoda1@cluster0.teg1d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


// -- -------------------------------------------- Routes
// -- Root Route
app.get("/", (req, res) => {
	res.json({"node":"root"})
})

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
		const db = client.db('star-wars-quotes')
		const quotesCollection = db.collection('quotes')

		// --------------------------------
		// -- Get All Quotes
		// --------------------------------
		app.get("/quotes", (req, res) => {
			db.collection('quotes').find().toArray()
			.then(results => {
				res.json({"quotes": results})
			})
			.catch(error => console.error(error))
		})

		// --------------------------------
		// -- Get One Quotes
		// --------------------------------
		app.get("/quote/", (req, res) => {
			//res.json({"body":req.body})
			db.collection('quotes').find(req.body).toArray()
			.then(results => {
				res.json({"quotes": results})
			})
			.catch(error => console.error(error))
		})

		// --------------------------------
		// -- Insert a Quote
		// --------------------------------
		app.post("/quotes", (req, res) => {
			db.collection('quotes').insertOne(req.body)
			.then(result => {
				res.json({"message": "Record Added"})
			})
			.catch(error => console.error(error))
		})

		// --------------------------------
		// -- Delete a Quote
		// --------------------------------
		app.delete("/quotes/:id", (req, res) => {
			db.collection('quotes').deleteOne({ _id: new ObjectID(req.params.id) })
			.then(result => {
				res.json({"message": result.result.n + " record(s) deleted.", "result": result})
			})
			.catch(error => console.error(error))
		})

		// --------------------------------
		// -- Update a Quote
		// --------------------------------
		app.put("/quotes/:id", (req, res) => {
			db.collection('quotes').findOneAndUpdate(
				{ _id: new ObjectID(req.params.id) },
				{
					$set: {
						name: req.body.name,
						quote: req.body.quote
					}
				},
				{
					upsert: true
				}
			)
			.then(result => {
				res.json({"message": "Record " + req.params.id + " Updated", "result": result})
			})
			.catch(error => console.error(error))
		})

	})
.catch(error => console.error(error))



// -- Running the Server
const PORT = process.env.PORT || PORT
app.listen(PORT, () => {
	console.log(`Listing on Port ${PORT}`)
})