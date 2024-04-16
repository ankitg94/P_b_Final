//"dev": "concurrently \"npm run start\" \"npm run client\""{hostingpr  pr dalne k liye-paste this package.json}
//"dev": "concurrently \"npm run server\" \"npm run client\"" {localhost me chalne k liye}
//1-importing the file
import express  from "express";
import colors   from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from 'cors'
//step-1(host)
import path from 'path'
import { fileURLToPath } from "url";
//import (database)
import connectdb from "./config/db.js";
//import (Route)
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
//blog Route
import blogCatRoute from "./routes/blogCatRoute.js"
import blogRoute from "./routes/blogRoute.js" 
//config env call
dotenv.config()

//database connection
connectdb()
//02-hosting k liye(start)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
// hositng (end)



//rest objects 
const app = express();

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//03-hoisting(start)
app.use(express.static(path.join(__dirname, './client/build')))
// hositng (end)
//routes(Project)
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/category",categoryRoute)
app.use("/api/v1/product",ProductRoute)

app.use("/api/v1/blog-Category",blogCatRoute)
app.use("/api/v1/blogRoute",blogRoute)

//rest api
//04-hoisting(start)
app.use("*",function(req,res){
       res.sendFile(path.join(__dirname,"./client/build/index.html"));
});
// hositng (end)


//port 
const PORT = process.env.PORT ||8080;

//app listen 
app.listen(PORT,()=>{
   console.log(`server Running  on  ${PORT} port `.bgCyan.white)
})
