import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,


    },

    slug: {
        type: String,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        //getting fromc category model and give its referencetype ,,product ko category se linkkrna he is liyecategory pass krwa rhen hn  
        type: mongoose.ObjectId,
        ref: 'Category',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    photo: {
        data : Buffer,  //aik typehebjs se phtoos mongodb me save hongen 
        contentType: String,
    },
    shipping: {
        type: Boolean,


    }




}, { timestamps: true }
)
export default mongoose.model("Products", productSchema)
