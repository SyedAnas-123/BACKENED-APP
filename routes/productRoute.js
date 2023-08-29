import express from "express";
import { isAdmins, requireSignIn } from './../middlewares/authMiddleware.js';
import { createProductController,getProductController,getSingleProductController ,getproductPhotoController,deleteproductController,UpdateproductController,productFiltersControllers,productCountController,prodctListController,productcategoryController} from "../controllers/productController.js";
import formidable from 'express-formidable'

const router= express.Router()


//routes
//CREATE PRODUCTE ROUITRE
router.post('/create-product',requireSignIn,isAdmins,formidable(),createProductController)


//GETTING ALL PRODUCTS  , creating photo and different fields endpoints differently to get them
router.get('/get-product',getProductController)


//SINGLE PRODUCTS
router.get('/singleproduct/:slug' , getSingleProductController)

//FOR GETTING PHOTOS
router.get('/get-photo/:pid', getproductPhotoController)


//DELETING PRODUCT
router.delete('/delete-product/:pid', deleteproductController)

//UPDATING PRODUCT 
router.put('/update-product/:pid' ,requireSignIn ,isAdmins, formidable(),UpdateproductController)

//FITERING OF PRODUCTS
router.post('/product-filter',productFiltersControllers)



//SERVER SIDE PAGINATION 
//product count
router.get('/product-count',productCountController)

//APGE KI HISAB SE PRODUCT KO GET KRENEGN

router.get('/product-list/:page',prodctListController)



//CATEGORY WISE PRODUCT
router.get('/product-category/:slug', productcategoryController)




export default router