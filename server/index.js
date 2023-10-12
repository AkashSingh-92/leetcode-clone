const express = require("express");
const app = express();
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin/adminroutes.js")
const userRouter = require("./routes/user/userroutes.js")
const bodyparser = require("body-parser")
const cors = require("cors")
const port = 3000;
app.use(bodyparser.json())
app.use(cors());


// Connectting the database
mongoose.connect(
  "mongodb+srv://92skysingh:Sirakash%4092@cluster0.hcdz0d4.mongodb.net/Codeit", { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use("/admin", adminRouter)
app.use("/user", userRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
