const User = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

//GETTIGN LIST OF USER
router.get("/", (req, res) => {
  const userList = User.find()
    .select("-passwordHash")
    .then((resp) => {
      if (userList) {
        return res.send({ success: true, data: resp });
      }

      res.status(500).json({ success: false });
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ success: false, error: err });
    });
});

// GETTING A PARTICULAR USER
router.get("/:UserId", (req, res) => {
  const user = User.findById(req.params.UserId)
    .select("-passwordHash")
    .then((resp) => {
      if (!user) {
        return res
          .status(500)
          .json({ success: false, message: " The user was not found" });
      }

      res.send({ success: true, data: resp });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

//ADDING NEW USER
router.post("/", (req, res) => {
  const passHash = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: passHash,
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
  });

  user
    .save()
    .then((resp) => {
      res.status(201).json({ success: true, message: "New User created" });
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: err });
    });
});





// REGISTERING THE NEW USER

router.post("/register", (req, res) => {
  const passHash = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: passHash,
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
  });

  user
    .save()
    .then((resp) => {
      res.status(201).json({ success: true, message: "New User created" });
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: err });
    });
});



// LOGGING THR USER
router.post("/login", async (req, res) => {
  const user = await User.findOne({email : req.body.email})
  const secret = process.env.SECRET

  if(!user){
    return res.status(500).send('User not Found')
  }

  if(user && bcrypt.compareSync(req.body.password , user.passwordHash)){

    const payload = {
      userId : user._id,
      userEmail : user.email,
      isAdmin : user.isAdmin
    }

    const token = jwt.sign(payload , secret , {expiresIn : '1d'})
    res.status(200).send({email : user.email , token : token})
  }
  else{
    res.status(400).send('password is wrong!')
  }
})


// GETTING THE COUNT OF THE USERS
router.get('/get/count' , (req , res) => {
  const userCount = User.countDocuments()
  .then((count) => {
    if(!count){
      res.status(500).json({success : false})
    }

    res.send({success : true , userCount : count})
  })
  .catch(err => {
    res.send({success:false , error : err})
  })
})


// DELETING THE PRODUCT 
router.delete('/:userId' , (req,res) => {
  User.findByIdAndDelete(req.params.userId).then((user) => {
    if(user){
      return res.status(200).json({success : true , message : " The User is deleted"})
    }
    else{
      return res.status(404).json({success : false , message : "Product not Found"})
    }
  })
  .catch(err => {
    return res.status(400).json({success : false , error : err})
  })
})



module.exports = router;
