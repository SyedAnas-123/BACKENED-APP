import express from "express";
import { registerController,LoginController,testController,ForgotPasswordController,updatprofileController } from "../controllers/authController.js";
import { requireSignIn ,isAdmins} from './../middlewares/authMiddleware.js';


//making router object , separate file me routing krengen to router ka object lgta he .

// Using routes in Express is a recommended practice because it brings several benefits to your web application's organization, maintainability, and scalability. 
const router = express.Router()
//routing 

//1 Routeis for registeration  / method: Post 
router.post('/register', registerController) // iske bad hm call back funtion likhte hen but mvc pattern use kr rhen henn to controllers me kam   krengen  



// 2 ROUTE FORLOGIN /METHOD : POST 
router.post('/login', LoginController)



//3: TEST ROUTE for testign token mil rha he headers me se ya nh ?
router.get("/test",requireSignIn, isAdmins ,testController) // requiresign aik middleware he jski wajh se hm token ki based pr access kr pa rhen hn
// abh hm ne jo is admin ka middleware banaya thya jo wahan wapis call krwan lengen 



//FORGET PASSWORD API || POST

router.post('/forgot-password', ForgotPasswordController)






//PROTECTED ROTER FOR AUTHENTICATION OR USER DASHBOARD .
// isko hm private route me acccess krengen user-auth ke help se hm dashboard pageb ko private banan dengen yahn se jo req jaeegi agr wo ok is true hue to tbhii dashboard page show hoga wrna ni 
router.get('/user',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})






//Admin route  DASHBOARD
router.get('/admin', requireSignIn,isAdmins,(req ,res ) => {
    res.status(200).send({ ok : true });
})



//CREATIG THIS FOR THE BUTTON IN USER DASH BOARD  bcz want to update , update krne ke liye user login hona chaheye

router.put('/profile',requireSignIn,updatprofileController)


export default router;









































// The Model-View-Controller (MVC) is a software architectural pattern used for designing and organizing applications, particularly web applications. It separates an application into three main components: Model, View, and Controller. Each component has a distinct role and responsibility in managing and presenting the application's data and logic