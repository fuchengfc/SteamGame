const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

/*  */
app.get('/gameTop10', routes.gameTop10); 

app.get('/gameDetail/:appid', routes.gameDetail); 

app.get('/search',routes.search);

app.get('/requirements',routes.requirements);

app.get('/tagSearch',routes.tagSearch);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});