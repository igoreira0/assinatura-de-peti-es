const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Peticao = require('../models/peticao');


const router = express.Router();

router.use(authMiddleware);

router.post('/newpeticao', async (req, res)=>{
  const { title, description } = req.body;
  try{
    await Peticao.create({
      title: title,
      description: description,
      owner: req.userId
    });
    return res.send({status: `Petiçao ${title} has been created`});
  }catch(e){
    return res.send({error: `Error creating petiçao ${title}`});
  }
});

router.put('/updatpeticao', async(req, res)=>{
  const id = req.body._id;
  try{
    const peticao = await Peticao.findById(id);
    if(peticao.owner !== req.userId)
      return res.status(403).send({error: `Unauthorized`});
    const obj = {};
    if(req.body.title)
      obj['title'] = req.body.title;
    if(req.body.description)
      obj['description'] = req.body.description;
  
    if(!Object.keys(obj).length)
      res.send({status: 'Invalid payload'});
  
    await Peticao.updateOne({_id: id}, obj);
  
    return res.send({status: `Petiçao ${id} has been updated`});
  } catch(e){
    res.send({error: `Error updating peticao ${id}`});
  }
});

router.post('/sign/:peticaoId', async(req, res)=>{
  const peticaoId = req.params.peticaoId;
  try{
    const peticao = await Peticao.findById(peticaoId);
    if(!peticao)
      return res.status(400).send({error: `${peticaoId} was not found`});
    if(!peticao.signed.includes(String(req.userId)))
      peticao.signed.push(String(req.userId));
    else
     return res.status(302).send({error: `your vote for ${peticaoId} already exists`});
    await Peticao.updateOne(peticao);
    return res.send({status: `${peticaoId} has been signed`});
  }catch(e){
    return res.send({status: `Error trying update ${peticaoId}`});
  }
});

router.post('/:peticaoId', async(req, res)=>{
  const peticaoId = req.params.peticaoId;
  try{
    const peticao = await Peticao.findById(peticaoId);
    return res.send(peticao);
  }catch(e){
    return res.send({status: `Error trying update ${peticaoId}`});
  }
});

router.delete('/delete/:peticaoId', async (req,res)=>{
  const peticaoId = req.params.peticaoId;
  try{
    const peticao = await Peticao.findById(peticaoId);
    if(!peticao)
      return res.status(400).send({error: `${peticaoId} was not found`});
    if(peticao.owner !== req.userId)
      return res.status(403).send({error: `Insuficient permission`});
    await Peticao.deleteOne({_id: peticaoId});
    return res.status(204);
  }catch(e){
    return res.send({status: `Error deleting ${peticaoId}`});
  }
});

module.exports = app => app.use('/peticao', router);