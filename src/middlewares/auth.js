const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) =>{
  const authHeader = req.headers.authorization;

  if(!authHeader)
    res.status(401).send({error: 'No token provided'});

  const splitedToken = authHeader.split(' ');

  if(splitedToken.lenght === 2)
    res.status(401).send({error: 'Invalid Token'});

  const [ scheme, token ] = splitedToken;

  if(!(/^Bearer$/i.test(scheme)))
    res.status(401).send({error: 'Token malformatted'});

  jwt.verify(token, authConfig.secret, (err, decoded)=>{
    if(err)
      res.status(401).send({error: 'Invalid Token'});
    
    req.userId = decoded.id;
    return next();
  });
};