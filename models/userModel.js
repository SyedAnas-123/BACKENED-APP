import mongoose from "mongoose";

//create scheema 

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true /// remove extra whitre sapces

  },

  email: {
    type: String,
    required: true,
    unique: true


  },

  password: {
    type: String,
    required: true,

  },

  phone: {
    type: String,
    required: true,
  },

  address: {
    type: {},
    required: true,

  },
  answer:{
    type : String,
    required:true,
  },

  role: {
    type: Number,
    default: 0 // 0 is false and 1 is true 
  }


},
  { timestamps: true }     // jbh jbh new user create hoga time ajeega us waqt ka.

)

export default mongoose.model('users', userSchema)  // users hm ne mondo db meaik collection banaee hue he wahan se uska name lkhen gen jo bh bhe <b className=""></b> 