const express = require('express')
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./src/controllers/authController')(app);
require('./src/controllers/peticaoController')(app);
require('./src/controllers/healthController')(app);
app.use(function(req, res, next) {
    res.status(404);
    res.json({status:404,title:"Not Found",msg:"Route not found"});
    next();
});

console.log(`listening http://localhost:${port}`)
app.listen(port);