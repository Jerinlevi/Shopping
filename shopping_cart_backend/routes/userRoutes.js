const usermodel=require('../models/User')
const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')


const router=express.Router();

router.post('/',async(req,res)=>{
    const {username,password}=req.body
    const hash=await bcrypt.hash(password,10)
    const setup=await usermodel.create({
        username,
        password:hash
    })
    res.json({setup})
})
router.post('/login',async(req,res)=>{
    const {username,password}=req.body
    const findUser=await usermodel.findOne({username})
    if(!findUser) return res.status(401).json("Invalid Username")
    const findPass=await bcrypt.compare(password,findUser.password)
    if(!findPass) return res.status(401).json("Invalid password")
    const token=jwt.sign({id:findUser._id},process.env.JWT_SECRET)
    findUser.token=token
    await findUser.save()
    res.json({token})

}
)
module.exports = router;