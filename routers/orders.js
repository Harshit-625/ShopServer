const Order = require('../models/orders')
const OrderItem =require('../models/order-items') 
const product = require('../models/product')
const router = require('express').Router()




//GETTING ALL THE ORDERS
router.get('/' , async (req,res) => {
  const orderList = await Order.find().populate('user' , 'name')

  if(!orderList){
    return res.status(400).json({success : false , messaage : "No Order List found"})
  }

  res.send({success : true , orders : orderList})
})


//GETTING THE ORDER BASED ON ID
router.get('/:OrderId' , async (req,res) => {
const order = await Order.findById(req.params.OrderId)
.populate(
  {path  : 'orderItems' , 
    populate : {path : 'product' , 
      populate : {path : 'category'}}});
if (!order) {
  return res.status(400).json({ success: false, message: "No order found with this ID" });
}

res.send({ success: true, order: order });
})

// GETTING USERS ORDER
router.get('/get/userorder/:userId' , (req,res) => {
  const userOrderList = Order.find({user : req.params.userId}).populate({
    path : 'orderItems', populate : {
      path : 'product' , populate : 'category'
    }
  })
  .then(resp => {
    if(!resp){
      return res.status(400).json({success : false , message : "User not Found"})
    }

    res.send({success : true , UserOrderList : resp})
  })
  .catch(err => {
    res.status(500).json({success : false , error : err})
  }) 
})


// CREATING NEW ORDER 
router.post('/' , async (req,res) => {

  const orderPromiseItemIds = Promise.all(req.body.orderItems.map(async orderItem => {
    let newOrderItem = new OrderItem({
      quantity : orderItem.quantity,
      product : orderItem.product
    })

    newOrderItem = await newOrderItem.save()
    return newOrderItem._id
  }))

  const orderItemIds = await(orderPromiseItemIds)

  const totalPrices = await Promise.all(orderItemIds.map(async (orderItemId) => {
    const orderItem = await OrderItem.findById(orderItemId).populate('product' , 'price')
    const totalPrice = orderItem.product.price * orderItem.quantity
    return totalPrice

  }))

  const totalPrice = totalPrices.reduce((a,b) => a+b , 0)
  console.log(totalPrice)

  let order = new Order({
    orderItems :orderItemIds,
    shippingAddress1:req.body.shippingAddress1 ,
    shippingAddress2:req.body.shippingAddress2  ,
    city :req.body.city ,
    zip : req.body.zip  ,
    country :req.body.country  ,
    phone :req.body.phone  ,
    status :req.body.status  ,  
    totalPrice :totalPrice ,
    user :req.body.user 
  })

  order = await order.save()
  if(!order){
    return res.status(500).json({success : false , messaage : "Order not Created"})
  }

  res.status(201).json({success : true , messaage : "Order created succesfully"})
})



// UPDATING THE PRODUCTS 
router.put('/:orderId' , (req,res) => {

  const order = Order.findByIdAndUpdate(
    req.params.orderId,
    {
      status : req.body.status
    },
    {new : true}
  ).then(() => {
    if(!order)
    {
      return res.status(404).json({success : false , messaage : "Order not Found"})
    }

    res.send({success : true , messaage : "Order Updated Successfully"})
  }).catch(err =>{
    res.status(500).json({success : false , error : err})
  })
})

// DELETING AN ORDER
router.delete("/:orderId" , (req,res) => {
  const order = Order.findByIdAndDelete(req.params.orderId).then(async order  => {
    if(order){
      await order.orderItems.map(async orderItem => {
        await OrderItem.findByIdAndDelete(orderItem)
      })

      return res.status(200).json({success : true , messaage : "Order Deleted Successfully"})
    }
    else{
      return res.status(404).json({success : false , messaage : "Order not Found"})
    }
  }).catch(err => {
    res.status(500).json({success : false , error : err})
  })
})

// GETTING TOTAL PRICE OF ALL THE ORDERS 
router.get("/get/totalsales" ,(req,res) => {
  const totalsales =Order.aggregate([
    {$group : {_id : null , totalsales : {$sum : '$totalPrice'}}}
  ]).then(resp => {
    if(!resp){
      return res.status(400).send({success :false ,message :'The Order sales caanot be generated'})
    }

    res.send({success : true ,totalSale : resp})
  }).catch(err => {
    res.status(500).json({success : false , error : err})
  })
})

// GETTING ALL THE NUMBER OF ORDER 
router.get("/get/count" ,(req,res) => {
  const orderCount = Order.countDocuments().then((resp) => {
    if(!resp){
      return res.status(400).send({success :false ,message :'The Order count cannot be generated'})
    }

    res.send({success : true ,OrderCount : resp})
  }).catch(err => {
    res.status(500).json({success : false , error : err})
  })
})


module.exports = router