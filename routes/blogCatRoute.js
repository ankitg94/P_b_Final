import express from "express"
import { CreateBlogCatController, GetblogController, deleteBlogCategory, getSingleCategory, updateBlogControlller } from "../controllers/blogCategoryController.js"
import { isAdmin, requiresSignIn } from "../middleware/authMiddleware.js"
const router = express.Router()

//blog category(created)
router.post("/create-blog-cat",requiresSignIn,isAdmin,CreateBlogCatController)
//get all the category
router.get("/get-blog-cat",GetblogController)

//get category
router.get("/get-single-category/:slug",getSingleCategory)

//update ctaegory
router.put("/update-blog-category/:id",requiresSignIn,isAdmin,updateBlogControlller)


//delete the Product
router.delete("/delete-blog-Category/:id",requiresSignIn,isAdmin,deleteBlogCategory)

export default router;