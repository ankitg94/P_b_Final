import blogCatModel from "../models/blogCatModel.js"
import slugify from "slugify"

//-------------------------------------create blog category----------------------

export const  CreateBlogCatController = async(req,res)=>{
try{
    const {name}  = req.body 
    if(!name){
        return  req.status(400).send({
                success:true,
                message:"name is required"
        })
      
    }
    const ExistBlogCat = await blogCatModel.findOne({name})
    
    if(ExistBlogCat){
        return  res.status(400).send({
            success:true,
            message:"name is already available"
        })
    } 
    const blogCat = await blogCatModel({name,slug:slugify(name)}).save()
        res.status(200).send({
        success:true,
        message:"blog Category created successfully",
        blogCat
    })
}
catch(error){
  console.log(error)
  res.status(500).send({
    success:true,
    message:"Error in cerating the product"
  })
}
}

//-------------------------------get all the blog category--------------------------
export const GetblogController = async(req,res)=>{
try{
    const getblogCategory = await  blogCatModel.find({})
    res.status(200).send({
    success:"true",
    message:"Your all  blog category is here",
    getblogCategory
  })

}catch(error){
    console.log(error)
    res.status(500).send({
    success:"false",
    message:"Error in getting the category",
    error
   })
  }
} 


//----------------------------get the single category------------------
export const  getSingleCategory = async(req,res)=>{
try{
    const  singleBlogCategory = await blogCatModel.findOne({slug:req.params.slug})
    res.status(200).send({
    success:"true",
    message:"here is your single Category",
    singleBlogCategory
   })
}catch(error){
        console.log(error)
        res.status(500).send({
        success:"false",
        message:"Erorr in getting the single product",
        error
    })
}
}

//---------update the blog category---------------------------

export const  updateBlogControlller = async(req,res)=>{
try{
       const {name} = req.body
       const {id} =  req.params
       const UpdateBlogCategory = await blogCatModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
       res.status(200).send({
       success:true,
       message:"success in Updating Product",
       UpdateBlogCategory       
    })
}catch(error){
        console.log(error)
        res.status(500).send({
        success:false,
        message:"Error in updating The Product",
        error
    })
}
}


//---------Delete the Product-----------------------------------------
export const deleteBlogCategory = async(req,res)=>{
 try{
    const {id} = req.params; 
    await blogCatModel.findByIdAndDelete(id);

    res.status(200).send({
    success:true,
    message:"Delete blog category",
    })

 }catch(error){
        console.log(error)
        res.status(500).send({
        success:false,
        success:"Error in Deleting  the Product",
        error
    })
 }
}
