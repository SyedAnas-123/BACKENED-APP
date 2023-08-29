import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,

        ref: "Products",
      },
    ],

    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not process",
      enum: ["Not Process", "Processing", "Shipped", "delivered", "cancel"],
    },
  },
  { timestamps: true }
);
export default mongoose.model("Order", orderSchema);

// slugify is a popular npm package used for creating URL-friendly slugs from strings. A slug is a URL-friendly version of a string, typically used for generating clean and readable URLs. It removes special characters, converts spaces to hyphens, and ensures that the resulting string is safe to use as a part of a URL.
