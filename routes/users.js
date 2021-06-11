const express = require("express");
const bcrypt = require("bcrypt");
const {
  authToken
} = require("../middlewares/auth");
 require("lodash")

const {
  DogModel
} = require("../models/dogsModel");
const {
  validUser,
  UserModel,
  validLogin,
  getToken,
} = require("../models/userModel");



const router = express.Router();

router.get("/", async (req, res) => {
  res.json({
    msg: "users work"
  })
})

router.get("/userInfo", authToken, async (req, res) => {
  try {
    // query for taking out data of the user using the id that recived from token
    //{password:0} supposed to show all props exccept password
    // req.decodeToken - coming from the middleware in line 13
    let data = await UserModel.findOne({
      _id: req.tokenData._id
    }, {
      password: 0
    });
    res.json(data);
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})

// reciving all the card that the user made favorite
// router.get("/userCards", authToken, async (req, res) => {
  // try {
    // First pull out the array of card numbers
    // let user = await UserModel.findOne({
    //   _id: req.tokenData._id
    // });
    // cards_ar -> ["0000","11111","22222"]
//     let cards_ar = user.cards;
//     let userCards = await CardModel.find({
//       bizNumber: {
//         $in: cards_ar
//       }
//     })
//     res.json(userCards);
//   } catch (err) {
//     console.log(err)
//     res.status(400).json(err)
//   }
// })


// updating that card that the user put in favorite
// router.patch("/cards", authToken, async (req, res) => {
//   let validBody = validCardsArray(req.body);
//   if (validBody.error) {
//     return res.status(400).json(validBody.error.details);
//   }
//   try {
//     let data = await UserModel.updateOne({
//       _id: req.tokenData._id
//     }, req.body);
//     res.json(data);
//   } catch (err) {
//     console.log(err)
//     res.status(400).json(err)
//   }
// })

// adding a new user
router.post("/", async (req, res) => {
  let validBody = validUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = new UserModel(req.body);

    // encrypting the password using bycrypt (10) power 
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    // make pass ***
    user.password = "****"
    res.status(201).json(user);
  } catch (err) {
    if (err.code == 11000) {
      return res.status(400).json({
        err: "User/Email already in system! try to log in"
      })
    }
    console.log(err)
    res.status(400).json(err)
  }
})

router.post("/login", async (req, res) => {
  let validBody = validLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    // checking if there is even a username
    let user = await UserModel.findOne({
      email: req.body.email
    });
    if (!user) {
      // returining error for the user
      return res.status(401).json("User or password not found 1");
    }
    // console.log(user)
    // checking pass validation
    let validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(401).json("User or password not found 2");
    }
    // mkaing token
    let newToken = getToken(user._id)
    res.json({
      token: newToken
    });

  } catch (err) {

    console.log(err)
    res.status(400).json(err)
  }
})

module.exports = router;