import slugify from "slugify";
import ProductModel from "../models/ProductModel.js";
import fs from "fs";
import cartegoryModel from "../models/cartegoryModel.js";
import orderModel from "../models/orderModel.js";
import braintree from "braintree";






//PAYMENT GATEWAY
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: 'm4vfr69sg8vvn75b',
  publicKey: '6y7gvshz5pf5442j',
  privateKey: '252932714b48aa84815d6bee40b839a2',
});


//agr hm photo ko aese hi lete to wo string me le leta to formidable use kiya js se ksii bh file ko easily use kr skte hen or is ke liye fs module bh lgta he jo npm me already install hota he , to abh ohele hm req.body me se dtaa ko getbkrte but abhb hm fileds me s e sara data get krengen. eg:
// req.fields; // contains non-file fields
//   req.files; // contains files
export const createProductController = async (req, res) => {
  try {
    //getting  from  models and photo get krne me aik phjoto ka pavchakge download krengen which is express-formidable  and using fs modulelike thta
    const { name, description, slug, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //VALIDATION USING SWITCH STAMENTS.

    switch (true) {
      case !name:
        return res.status(505).send({ error: "Name is Required" });
      case !name:
        return res.status(505).send({ error: "Description is Required" });
      case !name:
        return res.status(505).send({ error: "Price is Required" });
      case !name:
        return res.status(505).send({ error: "Quantity is Required" });
      case !name:
        return res.status(505).send({ error: "Category is Required" });
      case photo && photo.size > 2000000:
        return res
          .status(505)
          .send({ error: "Photo is Required and should be less than 1 MB" });
    }
    //NOW WANt TO SAVE THEM BUT WE FIRST MAKE THEIR COPY likke we did in frontend inn auth MEANS JO BH DATA HE USKA AIK COPY CREATE KRENGEN AND THIS IS NEW OBJect    OR JTNA BH FIELDS HEN USKO SPREAD KR DENGEN
    const products = new ProductModel({ ...req.fields, slug: slugify(name) });
    // here copy of product was making now photo ko bh validate kr dengenn
    //VALIDATE PHOTO
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Creating Product ",
    });
  }
};

//GETTING ALL PRODUCTS CONTROLLER
export const getProductController = async (req, res) => {
  try {
    //GETTTING ALL PRODUCTS AND ADDING FILTERS
    //.select("-photo"): This part of the query specifies that you want to exclude the photo field from the retrieved documents.The - photo argument is used to exclude that field from the results.This can be useful when you initially retrieve products without loading their images.
    // .limit(12): This part of the query limits the number of retrieved products to 12. It means you're only fetching 12 products from the database.
    // .sort({ createdAt: -1 }): This part of the query sorts the retrieved products based on their createdAt field in descending order(-1).This likely means that the most recently created products will appear first in the result.
    const products = await ProductModel.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 }); //we did this bcz we dont want photo in our initial time
    res.status(200).send({
      success: true,
      totalcount: products.length, // how many products?
      message: "All Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Getting Product ",
    });
  }
};

//SINGLR PRODUCTS CONTROLLER
//ABH HMM GET TO KR RHEN HEN PRODUCTS BUT CATEGORY ME IDA ARHI THI TP TOTALLY ADD KR DEN GEN CATEGORY KO

export const getSingleProductController = async (req, res) => {
  try {
    //getting slug bcz we made a router for it to get one product
    const { slug } = req.params;
    const products = await ProductModel.findOne({ slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "single Product Fetched ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Getting Single Product ",
    });
  }
};

//GETTING PHOTOS CONTROLLOERS

export const getproductPhotoController = async (req, res) => {
  try {
    //getting photo from pid  p meand product id
    const { pid } = req.params;
    const products = await ProductModel.findById(pid).select("photo");
    if (products.photo.data) {
      res.set("Content-type", products.photo.contentType);
      res.status(200).send(products.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Getting Photo ",
    });
  }
};

//DELETING PRODUCT .
export const deleteproductController = async (req, res) => {
  try {
    const { pid } = req.params;
    await ProductModel.findByIdAndDelete(pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while Deleting Product",
    });
  }
};

//UPDATING PRODUCT

export const UpdateproductController = async (req, res) => {
  try {
    //getting  from  models and photo get krne me aik phjoto ka pavchakge download krengen which is express-formidable  and using fs modulelike thta
    const { name, description, slug, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //VALIDATION USING SWITCH STAMENTS.

    switch (true) {
      case !name:
        return res.status(505).send({ error: "Name is Required" });
      case !name:
        return res.status(505).send({ error: "Description is Required" });
      case !name:
        return res.status(505).send({ error: "Price is Required" });
      case !name:
        return res.status(505).send({ error: "Quantity is Required" });
      case !name:
        return res.status(505).send({ error: "Category is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(505)
          .send({ error: "Photo is Required and should be less than 1 MB" });
    }

    //getting id here for updating the product or photo
    const { pid } = req.params;
    const products = await ProductModel.findByIdAndUpdate(
      pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    ); //jo fields hn wo copy kr lengen or jo new namw arha he usko slugify me wrap kr dengen.

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Creating Product ",
    });
  }
};

//FILTERING OF PRODUCTS

export const productFiltersControllers = async (req, res) => {
  try {
    //first getting 2 value wicch is chereckbox or radion button so destruvcture them
    const { checked, radio } = req.body;
    //Filters operation first make querry them call infuvntion
    // The issue here is that you're trying to use an array args as an object to store filters, which is not the correct way to do it. In JavaScript, arrays are typically used to store ordered collections of elements, while objects are used to store key-value pairs.
    let args = {};
    //user categories me se bhfilter kr skta he or rpice se bh to check krengen ke phele konsa filter hua he  category ke absed prho to uske abse pr dono ki base prya sirf price ki base pr
    if (checked.length > 0) args.category = checked; //0 bczuser mltiple categhories bh use kr ksta he
    //getting index of filters of price flike if we have 1to 19 $ and we want the categories beytweenthe price of 1 to 19

    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await ProductModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while Filtering Product ",
    });
  }
};

//PAGINATION
export const productCountController = async (req, res) => {
  try {
    const total = await ProductModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in Product Count",
    });
  }
};
//PRODUCT LIST ON BASE OF PAGE

export const prodctListController = async (req, res) => {
  try {
    const perPage = 1;
    //getting page fromparamsin route.js
    const page = req.params.page ? req.params.page : 1;
    const products = await ProductModel.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in per page ctrl ",
    });
  }
};

//GET PRODUCT BY CATEGORY

export const productcategoryController = async (req, res) => {
  try {
    //get slug fromparamas  dynamically
    // const {slug}=req.params
    const category = await cartegoryModel.findOne({ slug: req.params.slug });
    //WE ALSO NEED PRODUCT WITH CATEGORY  and find wiht the help of category
    const products = await ProductModel.find({ category }).populate("category");

    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting product from category ",
    });
  }
};
