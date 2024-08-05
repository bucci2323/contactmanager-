const asyncHandler = require("express-async-handler");

const User = require("../src/models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ValidationErrorItemOrigin } = require("sequelize");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("all fields are mandatoryyyy");
  }

//   const userAvailable = await User.findOne({ email });
//   if (userAvailable) {
//     res.status(400);
//     throw new Error("user already registered");
//   }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed password: " + hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("user is not valid");
  }
});








const loginUser = asyncHandler(async (req, res) => {
const {email, password} = req.body;
if (!email|| !password){
    res.status(400);
    throw new Error("All fields are mandatory!!")
}
const user = await User.findOne({email})

if(user && (bcrypt.compare(password, user.password))){
    const accessToken = jwt.sign({
        user:{
            username: user.username,
            email:user.email,
            id:user.id
        }
    }, 
    process.env.ACCESSTOKEN, 
        {expiresIn:"1m"})
     res.status(200).json({accessToken})
}else{
    res.status(401)
    throw new Error("Email or pasword is not valid")
}

 
});


const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});
module.exports = { registerUser, loginUser, currentUser };

