const express = require('express');
const router = express.Router();


router.get('/liveness', (_, res)=>{
    res.send({status: 'ok'});
});


module.exports = app => app.use('/health', router);
