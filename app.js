//requires routesController
const routesController = require("./server/controllers/routesController");

//define our express routes
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//middleware set path to public
app.use(express.static(__dirname + '/public'));

//middleware that allows for urlencoded data
app.use(express.urlencoded({
  extended: false
}));

// set view engine
app.set('view engine', 'ejs');

//post
app.post("/results", routesController.addPostToDatabase)

//get
app.get('/', routesController.getIndex)

app.get("/results", routesController.getResults);




//listen
app.listen(port, () => console.log(`I 've got ears on port: ${port}`));