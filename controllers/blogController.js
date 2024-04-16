import slugify from "slugify"
import blogModel from "../models/blogModel.js"
import fs from "fs"


//1-create a blog 
export const CreateBlogsController = async(req,res) => {
    try{
        const {name,description,category} = req.fields;
       const  {photo} = req.files ;
      //validation
      switch(true){
          case !name:
                return res.status(500).send({error: "Name is required"});
          case !description:
                return res.status(500).send({error: "description is required"});
          case !category:
                return res.status(500).send({error: "Category is required"}); 
          case !photo && photo.size < 10000000:
                return res.status(500).send({error: "Photo is required" });   
     }
      const blogs = new blogModel({...req.fields,slug:slugify(name)})
      //photo-check 
      if(photo){
            blogs.photo.data = fs.readFileSync(photo.path)
            blogs.photo.contentType = photo.type
        } 
    //save()
    await blogs.save();
    //send
    res.status(201).send({
    success:true,
    message:"your blog will be created succesfully",
    blogs
})
}catch(error){
           console.log(error)
           res.status(500).send({
           success:false,
           message:"Error in creating blogs", 
           error
        });
    }
}
//2-(a)get All-the blogs----------------------------------------------------

export const getAllBlogController=async(req,res)=>{
try{
      const getAllblog = await blogModel.find({}).populate("category").select("-photo").limit(12).sort({createdAt:-1})
      res.status(200).send({
      total:getAllblog.length,
      success:true,
      message:"Your allblog is here",
      getAllblog
  })
}
catch(error){
  console.log(error)
  res.status(500).send({
      success:true,
      message:"Error in getting the product"
  })
}
}
//-2(b)geting the single Product----------------------------------------

export const getSingleBlogController = async(req,res)=>{
      try{ 
      const getingSingleBlog =await blogModel.findOne({slug:req.params.slug}).select("-photo").populate("category")
            res.status(200).send({
            success:true,
            message:"Getting  the single Product",
            getingSingleBlog
})
      }catch(error){
                   console.log(error)
                   res.status(500).send({
                   success:false,
                   message:"Error in getting the single Product"
            })
      }
}

//2-(c) --blog --photo-------------------------------- 
export const blogphotoController = async(req,res)=>{
    try{
    const blogPhoto = await blogModel.findById(req.params.pid).select("photo")
          if(blogPhoto.photo.data){
           res.set("Content-Type",blogPhoto.photo.contentType)
           return res.status(200).send(blogPhoto.photo.data)
          }
         }catch(error){
            console.log(error)   
            res.status(500).send({
            success:false,
            message:"Error in getting the photo",
       })           
    }
  }

//(3)----update 
export const updateBlogController = async(req,res)=>{
try{
 const {name,category,description} = req.fields
 const {photo} = req.files
switch (true){
      case !name:
               return res.status(500).send({error:"Name is required"})
      case !category:
               return res.status(500).send({error:"Category is required"})     
      case !description:
               return res.status(500).send({error:"Description is required"})
      case !photo  && photo.size<1000000:
               return res.status(500).send({error:"Photo is is required"})        
      }
      const updateBlog = await blogModel.findByIdAndUpdate
      (req.params.pid,{...req.fields,slug:slugify(name)},{new:true})
      if(photo){
      updateBlog.photo.data = fs.readFileSync(photo.path)
      updateBlog.photo.contentType = photo.type 
      } await updateBlog.save()
             res.status(200).send({
             success:true,
             message:"Product updated Succesfully",
             updateBlog,
     })

}catch(error){
         console.log(error)
         res.status(500).send({
         success:false,
         message:"Error in updating the product",  
         error 
      })
}
}
//(4)-delete
export const DeleteBlogController = async(req,res)=>{
   try{

      await blogModel.findByIdAndDelete(req.params.pid)
            res.status(200).send({
            success:true,
            message:"blog deleted succesfully"
      })

   }
   catch(error){
   console.log(error)
   req.status(500).send({
      success:false,
      message:"Error in Deleting the product"
   })
   }

}

//----------------------------------seacrch the --blog-----------
export const SearchBlogController=async(req,res)=>{
      try{ 
       const {keyword} =req.params     
       const results = await  blogModel.find({
            $or:[
                  {name:{$regex:keyword,$options:"i"}},
                  {description:{$regex:keyword,$options:"i"}}
                    ]
                  }).select("-photo")
                   res.json(results)

}catch(error){
            console.log(error)
            res.status(500).send({
                  success:true,
                  message:"Error in search the blog",
                  error
            })
      
      }
}