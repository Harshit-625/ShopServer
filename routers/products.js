const router = require('express').Router()
const multer = require('multer')

const Product = require("../models/product")
const Category = require("../models/category")
const category = require('../models/category')
const { default: mongoose } = require('mongoose')



// MULTER PREREQUISITES 

const FILE_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpeg',
  'image/jpg' : 'jpg'
}

const storage = multer.diskStorage({
  destination : function(req,file,cb){

    const isValid = FILE_TYPE_MAP[file.mimetype]
    var uploadError = new Error('Inavlid file Type')

    if(isValid) //function to check whether the file type is accepted
    {
      uploadError = null //return null which means accepted and returns to the callback
    }

    cb(uploadError , 'public/uploads')
  },
  filename : function (req,file,cb){
    const filename = file.originalname.replace(" " , "-")

    //extension is assigned based upon the mimetype('image/png') of the uploaded file
    const extension = FILE_TYPE_MAP[file.mimetype] 


    cb(null, `${filename}-${Date.now()}.${extension}`)
    }
})


const uploadOptions = multer({storage : storage})

// GETTING ALL PRODUCTS 
router.get(`/`, async (req,res) => {
  
  const category = {category : req.query.categories ? req.query.categories : 0}
  const productList = Product.find().populate('category')
  .then((resp) => {
    if(productList){
      return res.send({success : true , data : resp})

    }  
    res.status(500).json({success : false})

  })
  .catch(err => {
    res.status(500).json({success:false , error : err})
  })
})

// GETTING PRODUCTS BASED ON THE ID
router.get(`/:productId`, (req,res) => {
  const product = Product.findById(req.params.productId).populate('category')
  .then((resp) => {
    if(!resp){
      return res.status(400).json({success : false , message : "Product doesn't exist"})
    }

    res.send({success : true , data : resp})
  })
  .catch((err) => {
    res.status(500).json({success : false , error : err})
  })
})

// GETTING THE COUNT OF THE PRODUCTS
router.get('/get/count' , (req , res) => {
  const productCount = Product.countDocuments()
  .then((count) => {
    if(!count){
      res.status(500).json({success : false})
    }

    res.send({success : true , productCount : count})
  })
  .catch(err => {
    res.send({success:false , error : err})
  })
})

// GETTING THE FEATURED PRODUCTS OF THE PRODUCTS
router.get('/get/featured' , (req , res) => {

  const productFeature = Product.find({isFeatured : true})
  .then((featured) => {
    if(!featured){
      res.status(500).json({success : false})
    }


    res.send({success : true , data : featured})
  })
  .catch(err => {
    res.send({success:false , error : err})
  })
})

// ADDING A NEW PRODUCT 
router.post(`/`,uploadOptions.single('image'), (req,res) => {

  //checks if the category exist in the category collection
  const category = Category.findById(req.body.category).then(() =>{
    if(!category){
      res.status(400).json({success : false , message: "The category doesn't exist"})
    }

    //checks whether there is an image in the post request
    const file = req.file
    if(!file){
      return res.status(400).json({success : false , message: "No images in the Request"})
    }

    // IMAGE DESTINATION USING MULTER 
    const fileName = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/upload/` //Destination for the file



    const product = new Product ({
      name :  req.body.name,
      description : req.body.description,
      richDescription :req.body.richDescription,

      image :`${basePath}${fileName}`,   
      images :req.body.images,
      
      brand : req.body.brand,
      price : req.body.price,
      category :req.body.category,
      countInStock :req.body.countInStock,
      rating :req.body.rating,
      numReviews :req.body.numReviews,
      isFeatured :req.body.isFeatured,
      dateCreated :req.body.dateCreated
    })
    product.save().then((resp) => {
      res.status(201).json({success : true ,  message : `The product is created`})
    })
    .catch((err) => {
      res.send({success : false ,  error : err})
    })
  }).catch(err => {
    res.send({success : false ,  error : err})
  })
})



// UPLOADING ARRAY OF IMAGES FOR THE PRODUCTS 
router.put('/gallery-image/:productId' , uploadOptions.array('images',10) , (req,res) => {

  if(!mongoose.isValidObjectId(req.params.productId)){
    return res.status(400).json({success :false , message : "Inavlid Product ID"})
  }


  const files = req.files
  const imagePaths = []
  const basePath = `${req.protocol}://${req.get('host')}/public/upload/` //Destination for the file

  if(files){
    files.map(file => {
      imagePaths.push(`${basePath}${file.filename}`)
    })
  }

  const product = Product.findByIdAndUpdate(req.params.productId , {
    images : imagePaths
  },{new : true})
  .then(resp => {
    if(!resp){
      res.status(400).json({success : false , message : "The Product does not Exist" ,})
    }

    res.status(200).json({success : true , message : "the Product was updated succesfully" , product : resp})
  })
  .catch(err =>{
    res.status(500).json({success: false , error: err})
  })
})


// UPDATING THE PRODUCTS 
router.put('/:productId' , (req,res) => {

  const category = Category.findById(req.body.category).then(() =>{
    if(!category){
      res.status(400).json({success : false , message: "The category doesn't exist"})
    }
    const product = Product.findByIdAndUpdate(
    req.params.productId,{
      name :  req.body.name,
      description : req.body.description,
      richDescription :req.body.richDescription,
      image :req.body.image,   
      images :req.body.images,
      brand : req.body.brand,
      price : req.body.price,
      category :req.body.category,
      countInStock :req.body.countInStock,
      rating :req.body.rating,
      numReviews :req.body.numReviews,
      isFeatured :req.body.isFeatured,
      dateCreated :req.body.dateCreated

    }).then(() => {
      if(!product){
        res.status(500).json({success:false ,  message:"Category not Found"})
      }
      else{
      res.status(201).json({success : true , message : "Updated Succesfully"})
      res.send(product)
      }
    }).catch(err =>{
      res.send({success : false , error : err})
    })
  })
}) 



// DELETING THE PRODUCT 
router.delete('/:productId' , (req,res) => {
  Product.findByIdAndDelete(req.params.productId).then((product) => {
    if(product){
      return res.status(200).json({success : true , message : " The Product is deleted"})
    }
    else{
      return res.status(404).json({success : false , message : "Product not Found"})
    }
  })
  .catch(err => {
    return res.status(400).json({success : false , error : err})
  })
})
module.exports = router