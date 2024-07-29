const  Category = require('../models/category')
const router = require('express').Router()




// GETTING ALL CATEGORIES 
router.get('/' , (req,res) => {
  const categoryList = Category.find()
  .then((resp) => {
    if(categoryList){
      return  res.send({success : true , data : resp})
    } 

    res.status(500).json({success : false})
  })
  .catch(err => {
    res.status(500).json({success:false , error : err})
  })
})

// GETTING A PARTICULAR CATEGORY 
router.get('/:categoryId' , (req,res) => {
  const category  = Category.findById(req.params.categoryId).then((resp) => {
    if(!category){
      return res.status(400).json({success : false , message : " The category was not found"})
    }

    res.send({success : true , data : resp})
  })
  .catch(err => {
    return res.status(400).json({success : false , error : err})
  })
})

// ADDING A NEW CATEGORY 
router.post('/', (req,res) => {
  const category = new Category ({
    name : req.body.name,
    icon : req.body.icon,
    color : req.body.color,
  })

  category.save().then((createdCategory) => {
    res.status(201).json({success : true ,  message : `The ${category.name} category is created`})
  })
  .catch((err) => {
    res.send({success : false ,  error : err})
  })
})

//UPDATING THE CATEGORY
router.put('/:categoryId' , (req,res) => {
  const category = Category.findByIdAndUpdate(
    req.params.categoryId,{
      name : req.body.name,
      color : req.body.color,
      icon : req.body.icon,
    }).then(() => {
      if(!category){
        res.status(500).json({success:false ,  message:"Category not Found"})
      }
      else{
      res.status(201).json({success : true , message : "Updated Succesfully"})
      }
    }).catch(err =>{
      res.send({success : false , error : err})
    })
}) 

// DELETING A CATEGORY 
router.delete('/:categoryId' , (req,res) => {
  Category.findByIdAndDelete(req.params.categoryId).then((category) => {
    if(category){
      return res.status(200).json({success : true , message : " The category is deleted"})
    }
    else{
      return res.status(404).json({success : false , message : "Category not Found"})
    }
  })
  .catch(err => {
    return res.status(400).json({success : false , error : err})
  })
})
module.exports = router