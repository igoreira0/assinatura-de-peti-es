const express = require('express');
const router = express.Router();


router.get('/liveness', async(_, res)=>{
    res.send({status: 'ok'});
});


module.exports = app => app.use('/health', router);
