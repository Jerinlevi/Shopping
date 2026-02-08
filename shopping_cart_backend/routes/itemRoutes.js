const express = require("express");
const Item = require("../models/Item");
const auth=require('../middleware/auth')

const router = express.Router();

router.post('/',auth,async(req,res)=>{
 
    const posting=await Item.create(req.body)
    res.json(posting);
})
router.get('/',async(req,res)=>{
    const getting=await Item.find()
    res.json(getting)
})
module.exports=router