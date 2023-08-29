import express from "express";
import { isAdmins, requireSignIn } from './../middlewares/authMiddleware.js';
import { createCategoryController,updateCategoryController,allCategoryController,singleCategoryController,deleteCategoryController} from "../controllers/categoryController.js";



const router =express.Router()

//routes
//CREATE CATEGFORY
router.post('/create-category',requireSignIn,isAdmins,createCategoryController)

//CARETORY UPDATE CATEGORY
router.put('/update-category/:id' ,requireSignIn,isAdmins,updateCategoryController)


//GET ALL CARETORY
router.get('/getAll-category' , allCategoryController)


//GET SINGLR CATEGORY 
router.get('/single-category/:slug',singleCategoryController)

//DELETE CATEGORY 
router.delete('/delete-category/:id',requireSignIn,isAdmins,deleteCategoryController)
export default router