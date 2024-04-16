import express from "express"
import { CreateBlogsController, DeleteBlogController, SearchBlogController, blogphotoController, getAllBlogController, getSingleBlogController, updateBlogController } from "../controllers/blogController.js";
import { isAdmin, requiresSignIn } from "../middleware/authMiddleware.js";
import formidable from "express-formidable";


const router = express.Router()

//create blog
router.post("/create-blog",requiresSignIn,isAdmin,formidable(),CreateBlogsController)

//get  all the blog 
router.get("/get-all-blog",getAllBlogController)

//get in the single blog
router.get("/get-single-blog/:slug",getSingleBlogController)

//get the photo of blog
router.get("/blog-photo/:pid",blogphotoController)


//update the blog 
router.put("/update-blog/:pid",requiresSignIn,isAdmin,formidable(),updateBlogController)
//delete the blog
router.delete("/delete-blog/:pid",requiresSignIn,isAdmin,DeleteBlogController)

//search the blog
router.get('/search/:keyword',SearchBlogController)
export default router;
