const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser") 
const morgan = require("morgan")
const mongoose = require("mongoose")
const authJwt = require("./helpers/jwt")
const errorHandler = require("./helpers/error-handler")



require('dotenv/config')
const api = process.env.API_URL
const port = process.env.PORT
const productRouter = require("./routers/products")
const categoryRouter = require("./routers/category")
const userRouter = require("./routers/user")
const orderRouter = require("./routers/orders")


//middleware
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/public/uploads', express.static(__dirname + '/public/uploads'))
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(errorHandler)
app.use(authJwt())




//Routes
app.use(`${api}/products` , productRouter)
app.use(`${api}/categories` , categoryRouter)
app.use(`${api}/users` , userRouter)
app.use(`${api}/orders` , orderRouter)

//Database Connection
mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
  console.log("MongoDB Atlas connected")
})
.catch((err) => {console.log(err)})


//Server Setup
app.listen(port,()=>{
  console.log(`Server running at  http://localhost:${port}`)
})