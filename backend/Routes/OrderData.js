const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')
// router.post('/orderData', async (req, res) => {
//     try {
//       const data = req.body.order_data;
//       const orderDate = req.body.order_date;
//       const email = req.body.email;
  
//       if (!email) {
//         return res.status(400).json({ error: 'Email is required.' });
//       }
  
//       // Check if the email exists in the database
//       const existingOrder = await Order.findOne({ email });
  
//       if (existingOrder === null) {
//         // If the email does not exist, create a new order
//         const newOrder = await Order.create({
//           email,
//           order_data: [{ Order_date: orderDate }, ...data], // Adding order date and other data to the order_data array
//         });
  
//         res.status(201).json({ success: true, order: newOrder });
//       } else {
//         // If the email exists, update the existing order by pushing the new data to order_data array
//         await Order.findOneAndUpdate(
//           { email },
//           { $push: { order_data: { Order_date: orderDate, ...data } } },
//           { new: true }
//         );
  
//         res.json({ success: true });
//       }
//     } catch (error) {
//         console.log("lol");
//       console.log(error.message);
//       res.status(500).send('Server Error');
//     }
//   });


router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    console.log(eId)
    if (eId===null) {
        try {
            console.log(data)
            console.log("1231242343242354",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})


router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        console.log("123456789678");
        console.log(eId);
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});






module.exports = router;
