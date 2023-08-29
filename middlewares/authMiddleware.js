// this filoe is for creating middleware means we are using next withg re, res arguments and middlw ware fuinctions are  not async 

import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';



//PROtected route and itis token based  menas verufy the user using token

//middlewaremeasn ke req hm jbh bh get bkrengen to uske bad next validate hoga uske bad res or is nect ke zaryee hm validate krengen auth user ko .
export const requireSignIn = async (req, res, next) => {
    // verfify ka funCtion compare krne ke liye isme hm token get krengenb token kaha hota he req me nh headers ke authorization part me AUR jwt token get kr liya env file mejon savethe wo 

    try {
        //const token = req.headers.authorization; // Get the token from the Authorization header

        // Verify the token using the JWT_SECRET from your environment variables
        const decode =  JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        console.log(process.env.JWT_SECRET)
        console.log(req.headers.authorization)
        req.user = decode;
        next();
        //avh y middleware check krega ke hamara token sahi he to aghe brho phr hm isko call krwa dengen is fucntion ko takee is admin  ka jo middlew3are he usme msla ni ho hmko wrna wo id ka error dega to yahn hmne decrypt kr diya .
     


    } catch (error) {
        console.log(error)
        res.status(404).send({
            success: false,
            message : "Error in token getting"
        })
    }



};


//admin Access

export const isAdmins  = async (req,res,next)=>{

    try {
        //first check user is admin or not 
        const user = await userModel.findById(req.user._id)
        if(user.role !== 1){
            return res.status(404).send({
                success : false,
                message : "Unauthorized Access u are not Admin"
            })
        }else{
            next()
        }
           
        
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            error,
            message: "Error in Admin middleware",

        })
        
    }
}