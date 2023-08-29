import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        // required: true,
        // unique: true,

    },
    slug: {
        type: String,
        lowercase: true
    }





}
)
export default mongoose.model("Category", categorySchema)


// slugify is a popular npm package used for creating URL-friendly slugs from strings. A slug is a URL-friendly version of a string, typically used for generating clean and readable URLs. It removes special characters, converts spaces to hyphens, and ensures that the resulting string is safe to use as a part of a URL.