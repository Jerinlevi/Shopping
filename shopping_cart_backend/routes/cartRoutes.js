const Cart=require('../models/Cart')
const auth=require('../middleware/auth')
const express=require('express')
const router=express.Router()

router.post('/',auth,async(req,res)=>{
    const {itemId}=req.body
    let cart=await Cart.findOne({user:req.user._id})
    
    if (!cart) {
         cart = await Cart.create({
            user: req.user._id,
            items: [itemId]
        });
        } else {
        cart.items.push(itemId);
        await cart.save();
        }
    
        res.json(cart);
    });
    

router.get("/", auth, async (req, res) => {

        const cart = await Cart.findOne({ user: req.user._id }).populate("items");
      
        res.json(cart);
      });
      
  
    module.exports = router;