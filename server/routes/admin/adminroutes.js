const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
app.use(bodyparser.json())
const {User, Admin, Questions} = require("../../db/index.js")
const {adminjwt, adminAuth} = require("../../middlewares/admin/admin")
const router = express.Router()


router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
  
    const adminExists = await Admin.findOne({ username: username });
  
    if (adminExists) {
      res.send({ message: "Username is already taken !!!" });
    } else {
      const newAdmin = new Admin({ username, password });
      await newAdmin.save();
      const adminToken = adminjwt(username);
      res
        .status(201)
        .send({ message: "Admin created Successfully!!!", token: adminToken });
    }
  });
  
router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
  
    const adminExists = await Admin.findOne({ username, password });
    if (adminExists) {
      const adminToken = adminjwt(username);
      res
        .status(201)
        .send({ message: "Admin loggedin Successfully!!!", token: adminToken });
    } else {
      res.status(403).send({ message: "Incorrect Username or Password!!!" });
    }
  });

router.get("/me", adminAuth, (req, res) =>{
  res.send({"username" : req.user.username})
})
  
router.post("/addquestion", adminAuth, async (req, res) => {
    const { title, description, constraints,difficulty, acceptance, examples, testcases } = req.body;
  
    if (!title || !description || !constraints || !difficulty || !acceptance || !examples || !testcases) {
      return res.status(401).send({ message: "Please enter valid Inputs !!!" });
    }
  
    const newQuestion = new Questions({title, description, constraints, difficulty, acceptance, examples, testcases});
    await newQuestion.save();
    res.send({
      id: "Question added successfully !!!",
      questionId: newQuestion._id,
    });
  });
  
router.get("/allquestion", adminAuth, async (req, res) => {
    const data = await Questions.find();
    let dataToAdmin = data.map( (item) => (
      {
        title : item.title,
        difficulty : item.difficulty,
        acceptance : item.acceptance,
        _id : item._id
      }
    ))
    res.status(201).send(dataToAdmin);
  });
  
router.get("/allquestion/:questionid", adminAuth, async (req, res)=>{
    const questionId = req.params.questionid
  
    try{
      const data = await Questions.find({_id : questionId});
      res.status(200).send({"data" : data})
    } catch(error){
      res.status(404).send({"message" : "Sorry we cann't find the page you loking for."})
    }
  })
  
router.put("/allquestion/:questionid", adminAuth, async (req, res) =>{
    const questionId = req.params.questionid;
    const { title, description, constraints,difficulty, acceptance, examples, testcases } = req.body;
  
    if (!title || !description || !constraints || !difficulty || !acceptance || !examples || !testcases) {
      return res.status(401).send({ message: "Please enter valid Inputs !!!" }); 
    }else{
      try{
        const data = await Questions.findByIdAndUpdate(questionId, {title, description, constraints, difficulty, acceptance, examples, testcases}, { new: true })
        res.status(200).send({"message" : "Question updated successfully", "updateddata" : data})
      }catch(error){
        res.status(404).send({"message" : "Sorry we cann't find the page you loking for."})
      }
      
    }  
})

module.exports = router;