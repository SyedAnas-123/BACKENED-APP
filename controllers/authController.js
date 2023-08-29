import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js"; //iski help se hmm user ko register krengen.
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    //now first destructuring like harry for getting the data from the body means jo bh data arha he usko get krna he meanske modelsseget kr rhen hen jbhii usko import kra he .
    const { name, email, password, phone, address, answer } = req.body;

    //PERFORMING VALIDATION

    if (!name) {
      return res.send({ message: "Name is required" });
    }

    if (!email) {
      return res.send({ message: "email is required" });
    }

    if (!password) {
      return res.send({ message: "password is required" });
    }

    if (!phone) {
      return res.send({ message: "Phone no  is required" });
    }
    if (!address) {
      return res.send({ message: "address  is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer  is required" });
    }

    //Checking for existing user if he already exists or not .
    //1 : first checkuser
    const existinguser = await userModel.findOne({ email });
    // 2: existing user

    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: " User was Already Register Please Login ",
      });
    }

    // NOW registering the user

    //first we get the hash password then savethat hash pasword.
    const hashedPassword = await hashPassword(password);

    //save
    //before we just call that model and datain that modelbut here we save that new model
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user, // user ko as it is pass krwa dengen jese catch meerror kokrwaya he .
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " Error in Registration ",
      error,
    });
  }
};

//ye jbh use hoga jbh koi bh uyser login  krega hamari app me

export const LoginController = async (req, res) => {
  try {
    //first we check register hone ke bad hmko kiya kya mil rha he to wo destructring ke zarye hasilkr len gen
    const { email, password } = req.body;

    //validation

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or  Password ", // security reasons ki wajh se ye use kiyabhe hmne .
      });
    }

    //agr successfullyhmko emailmiljata he to hm password ko bh compare kr ke dikhengen ke sahi he ya nh ku ke hamare pass plainpassword he or data abse mejo passwortd he wo hash me he encryptes he tousko decrypted bh krna hoga

    // checking user exists or regitered previously or not  then agr user he to hmko user mil rha he to uskapassword compare krengen  means nke user.password neeche is kliyebkiya u ke user aya usne reghistered kr dioya to uska password hash hogaya abh hm check krengen ke wo jo hash passwordhaamre databse me he to user jbh bh login to wo password hm yahn pr get krwa rhenm hen ke bhae comapre krop password sahio he ya nh b

    const user = await userModel.findOne({ email });
    //thenif user is notregistered
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not resgistered ",
      });
    }

    //TOKEN CREATING

    //then if user registered so matching the password fromour database that if the password enters  b y the user is correct wehn he registered or not if password is not match then invalid password ifpassword match then we create token

    const matchPassword = await comparePassword(password, user.password); // yahn user ka password get krwa lengen means user me jo hash password he usko comapre apss word ke fucntion me ja kr dukho to isn keliye hmhge user bh get krna hoga ke wo usere registered heya nh bhaamre data base me

    if (!matchPassword) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // if password match then we create Token and do  on the base of  id and then pass the secret key feomenv file then provide expiry date
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",

      //alsosending user details and also print the token
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " Error in Login ",
      error,
    });
  }
};

// FORGOT PASSWORD
// FORGOT PASSWORD CONTROLLER  user se get krni he kch value j0 forgot ke bad hogi mtlb resret password like

// ALL EXPLANATION IN DOWNPAGE

export const ForgotPasswordController = async (req, res) => {
  try {
    // getting or destructuring fromreq.body email,question etc
    const { email, answer, newPassword } = req.body;

    if (!email) {
      res.status(400).send({
        message: "Email is required ",
      });
    }
    if (!answer) {
      res.status(400).send({
        message: "Answer is required ",
      });
    }
    if (!newPassword) {
      res.status(400).send({
        message: "newPassword is required ",
      });
    }

    //checking email or question formodel  if it is true then reset password
    const user = await userModel.findOne({ email, answer });

    //valiodation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or Answer",
      });
    }

    // if it true we havepassword which was hash lets check is that was the same password as we have in our database so check it fromgetting hashed password a middleware which we created
    // HERE WE ARE JUST DOING THAT WE GET OUR MIDDLLE WREHAH PASWORD WHIHC IS A HASGH NOW WE WANNA DO POUR NEW PASSWORD TO HASH SO we pass new password and then after it hash weprovide  anew req ,
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed }); //in pour usermodel  we fing the id and update it and want to change password and hahsed it  i got it we find our old password by id and update it called our password and use hashed so that our new password commes
    res.status(200).send({
      success: true,
      message: "Password reset Succesfully ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//test controller

export const testController = (req, res) => {
  try {
    res.send("PROTECTED ROUTE");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};


//UPDATE PROFILE OF USER

export const updatprofileController = async (req, res) => {
  try {
    //dertsucturing data
    const { name, email, password, address, phone } = req.body;
    //find user on the basis of id
    const user = await userModel.findById(req.user._id);
    //password cjecking
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and 6 character long" });
    }
    //FIRST HASHING PASSWORD
    const hashedPassword = password ? await hashPassword(password) : undefined
    console.log(hashedPassword)

    //AGR Y HOJATA OK TO UPFATE USER
    const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
      name: name || user.name,
      password: hashedPassword || user.password,
      phone: phone || user.phone,
      address: address || user.address,
    },{
        new:true
    });

    res.status(200).send({
        success:true,
        message:"Profile Updated Successfully",
        updatedUser
    })


  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Updating User Profile",
      error,
    });
  }
};
