const express = require('express')
const bodyParser = require('body-parser')

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./src/controllers/authController')(app);
require('./src/controllers/peticaoController')(app);
require('./src/controllers/healthController')(app);


console.log(`listening http://localhost:${port}`)
app.listen(port);