const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
app.use(bodyparser.json())
const {User, Admin, Questions} = require("../../db/index.js")
const {userjwt, userAuth} = require("../../middlewares/user/user.js")
const router = express.Router()



router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
  
    const userExists = await User.findOne({ username: username });
  
    if (userExists) {
      res.send({ message: "Username is already taken !!!" });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const userToken = userjwt(username);
      res.status(201).send({ message: "User created Successfully!!!", token: userToken });
    }
  });
  
router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
  
    const userExists = await User.findOne({ username, password });
    if (userExists) {
      const userToken = userjwt(username);
      res.status(201).send({ message: "User loggedin Successfully!!!", token: userToken });
    } else {
      res.status(403).send({ message: "Incorrect Username or Password!!!" });
    }
  });

  router.get("/me", userAuth, (req, res) =>{
    res.send({"username" : req.user.username})
  })

router.get("/questions", userAuth, async (req, res) =>{
  let data = await Questions.find()
  let sendToUser = data.map( (item) => ({
    title : item.title,
    difficulty : item.difficulty,
    acceptance : item.acceptance,
    _id : item._id,
}))

  res.status(200).send({"questions" : sendToUser})

});

router.get("/questions/:questionid", userAuth, async (req, res) =>{
  const questionId = req.params.questionid;

  try {
    const data = await Questions.findOne({_id : questionId})
    return res.status(200).send({"question" : data})

  } catch(error){
    return res.status(404).send({"message" : "Sorry we cann't find the page you loking for."})

  }
});

router.post("/run", userAuth, async (req, res) => {
  res.status(200).send({"message" : "Running the code"})
});


router.post("/submit", userAuth, async (req, res) => { 
  res.status(200).send({"message" : "Submitting the code"})
});

module.exports = router;