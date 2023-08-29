import cartegoryModel from "../models/cartegoryModel.js"
import slugify from "slugify"
export const createCategoryController = async (req, res) => {
    try {
        //in success case ,we get category from user so destructure  name fromcategory model
        const {name} = req.body
        if (!name) {
            return res.status(401).send({ message: "Name is requires" })
        }
        //checking eexisting categorylike  1 name se 2 category na ho 
        const existingCategory = await cartegoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message:"Category Already Exists"
            })
        }
        //if category ni milti to save it 
        const category = await new cartegoryModel({name,slug: slugify(name)}).save()
        res.status(201).send({
            success: true,
            message : "New Category Created",
            category
            
        })

    }

    catch (error) {

        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category Controller"
        })
    }

}




//UPDATE or CHANGE CATEGORY  
//destructiong id and name and update them 
export const updateCategoryController = async (req,res)=>{

    try {
        // we are destructuring name and id and id params means url me s miegii hmko to route me id add kr dengen 

        const {name}=req.body
        const {id} = req.params
        //3 parameter is liye lya ku ke agr new true ni krengen to update nh hoga category
        const category = await  cartegoryModel.findByIdAndUpdate(id ,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message :"Category Updated Successfully",
            category,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while Updating Category"
        })

        
    }

}



//ALL CATEGORY COONTRIOLLLER  ,,in this just bgetting all the categopries added and updated .
export const allCategoryController = async(req,res)=>{
    try {
        const category=await cartegoryModel.find({})
        res.status(200).send({
            success:true,
            message:'All Categories List',
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while Getting ALL Category"
        })
        
    }


}

//SINGLR CEACTEGORY CONTROLLER an dgettignit thorugh slugbcz we have onlyslug and nameinmodel of category


export const singleCategoryController = async(req,res)=>{
    try {
        const {slug}= req.params
        console.log("Requested Slug:", slug);
        const category =await cartegoryModel.findOne({slug})//find it through slug
        
        res.status(200).send({
            success :true ,
            message:"Get Single Category Successfully",
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while Getting Single Category"
        })
        
    }


}


//DELETE CATEGFORY 

export const deleteCategoryController = async(req,res)=>{
    try {
        const {id} =req.params
        await cartegoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success :true,
            message: "Category Deleted Successfully"
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while Deleting  Category",
            error,
        })
        
    }
}