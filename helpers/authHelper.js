// crrete 2 fucntions ` is for hashing 2 is for decrypt krne k liye 

import bcrypt from 'bcrypt'

// 1: THISALL WORK IS FOR HASHING 
export const hashPassword = async(password)=>{   //passing normalpassword as ana argument 

    try {
        //in try we wait for passwordhashinf means that we use await .

        //generating salt 
        const saltRounds = 10 ;

        const hashedPassword  = await bcrypt.hash(password ,saltRounds)    // in argument we pass normal password and our salt this is a method for hashing
        return hashedPassword;

        
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success : false,
            message: "Error in password hashing"

        })
        
    }
}




//2: THIS ALLWORKIS FOR COMPARING 

export const comparePassword = async(password , hashedPassword)=>{ // we adddeed 2 arguments 1 is plain p[assword and 2 is hash password]

    return bcrypt.compare(password,hashedPassword);
   };