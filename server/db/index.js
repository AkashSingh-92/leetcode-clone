const mongoose = require("mongoose");


// defining schemas of the tables
const adminSchema = mongoose.Schema({
    username : String,
    password : String
  })
  
const userSchema = mongoose.Schema({
    username : String,
    password : String
  })
  
const questionSchema = mongoose.Schema({
    title : String,
    description : String,
    constraints : [ {type : String} ],
    difficulty : String,
    acceptance : String,
    examples : [{
      input : [{
        fieldname : String,
        fieldvalue : {type : mongoose.Schema.Types.Mixed}
    }],
      output : {type : mongoose.Schema.Types.Mixed}
    }],
    testcases : [{
      input : [{
        fieldname : String,
        fieldvalue : {type : mongoose.Schema.Types.Mixed}
    }],
      output : {type : mongoose.Schema.Types.Mixed}
    }]
  })
  
  
// creating table for each schema
  const Admin = mongoose.model("Admin", adminSchema)
  const User = mongoose.model("User", userSchema)
  const Questions = mongoose.model("Questions", questionSchema)


module.exports = { User, Admin, Questions }
  