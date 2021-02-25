# Express Mongo

This repository creates a REST API using Express that connects to a MongoDB (Atlas).  The REST API uses a collection that I created called "quotes" that has the following endpoints:

```sh
- /quotes - GET - this shows a list of quotes
- /quote/:id - GET - this shows a single quote
- /quotes - POST - this adds a new quote
- /quotes - PUT - this updates an existing quote
- /quotes - DELETE - this deletes a quote
```

## Connecting to MongoDB
You need a line similar to this for line #14 of server.js which contains the username and password for your database.  Without this line it's not going to work.  
```sh
const connectionString = "mongodb+srv://<db_username>:<db_password>@cluster0....&w=majority"
```

## Express

I have set the default port of the server to *3030*, of course you can set it to any port you wish in **server.js**.


If you were to clone this project, whether to get an idea or just to see how it works, just clone this project, and

```sh
$ npm install
```
to run the application:
```sh
$ npm start - without nodemon
$ npm dev - with nodemon
```

Thanks!


