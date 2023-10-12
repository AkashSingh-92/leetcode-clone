import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { processedData } from "./functions/processeddata";
import Alert from '@mui/material/Alert';

function AddQuestion() {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [acceptance, setAcceptance] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState("");
  const [hidden, setHidden] = useState("");
  const [constraints, setConstraints] = useState("");
  const [valid, setValid] = useState("correct")

  const currencies = [
    {
      value: "Easy",
      label: "Easy",
    },
    {
      value: "Medium",
      label: "Medium",
    },
    {
      value: "Hard",
      label: "Hard",
    },
  ];
  return (
    <div
      style={{
        backgroundColor: "#edeef1",
        borderRadius: "40px",
      }}
    >
      <div>
        {/* add a question div */}
        <div>
          <Typography
            variant="h4"
            style={{
              fontFamily: "initial",
              marginTop: "10px",
              marginLeft: "15px",
              marginBottom: "25px",
            }}
          >
            Add a Question.
          </Typography>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <div>
            {/* title container */}
            <div>
              {/* add a title div */}
              <div>
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "initial",
                    marginTop: "10px",
                    marginLeft: "15px",
                    marginRight: "15px",
                  }}
                >
                  Title *
                </Typography>
              </div>

              {/* get the title */}
              <div>
                <TextField
                  multiline
                  minRows={1}
                  variant="outlined"
                  required="true"
                  placeholder="Choose a title"
                  style={{
                    marginTop: "3px",
                    marginLeft: "15px",
                    backgroundColor: "#F9F9F9",
                    width: "100%",
                  }}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginLeft: "55px",
            }}
          >
            {/* diifculty container */}
            <div>
              {/* add a difficulty div */}
              <div>
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "initial",
                    marginTop: "10px",
                    marginLeft: "15px",
                    marginRight: "15px",
                  }}
                >
                  Difficulty level *
                </Typography>
              </div>

              {/* get the difficulty */}
              <div>
                <TextField
                  select
                  style={{
                    marginTop: "3px",
                    marginLeft: "15px",
                    backgroundColor: "#F9F9F9",
                    width: "100%",
                  }}
                  onChange={(e) => {
                    setDifficulty(e.target.value); 
                  }}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>

            <div
              style={{
                marginLeft: "55px",
              }}
            >
              {/* add a acct div */}
              <div>
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "initial",
                    marginTop: "10px",
                    marginLeft: "15px",
                    marginRight: "15px",
                  }}
                >
                  Acceptance rate *
                </Typography>
              </div>

              {/* get the acceptance */}
              <div>
                <TextField
                  multiline
                  minRows={1}
                  variant="outlined"
                  required="true"
                  placeholder="Acceptance rate"
                  style={{
                    marginTop: "3px",
                    marginLeft: "15px",
                    backgroundColor: "#F9F9F9",
                    width: "100%",
                  }}
                  onChange={(e) => {
                    setAcceptance(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* desc container */}
        <div>
          {/* add a desc div */}
          <div>
            <Typography
              variant="h5"
              style={{
                fontFamily: "initial",
                marginTop: "10px",
                marginLeft: "15px",
              }}
            >
              Description *
            </Typography>
          </div>

          {/* get the desc div */}
          <div>
            <TextField
              multiline
              minRows={7}
              variant="outlined"
              required="true"
              placeholder="Enter the complete explanation of your question."
              style={{
                marginTop: "3px",
                marginLeft: "15px",
                backgroundColor: "#F9F9F9",
                width: "96%",
              }}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>

        {/* visible tc container */}
        <div>
          {/* add a visible testcases div */}
          <div>
            <Typography
              variant="h5"
              style={{
                fontFamily: "initial",
                marginTop: "10px",
                marginLeft: "15px",
              }}
            >
              Enter the Testcases <b>visible</b> to user *
            </Typography>
          </div>

          {/* get the visible testcases div */}
          <div>
            <TextField
              multiline
              minRows={5}
              variant="outlined"
              required="true"
              placeholder="Enter the test cases that will be visible to user while solving the problem."
              style={{
                marginTop: "3px",
                marginLeft: "15px",
                backgroundColor: "#F9F9F9",
                width: "96%",
              }}
              onChange={(e) => {
                setVisible(e.target.value);
              }}
            />
          </div>
        </div>

        {/* hidden tc container */}
        <div>
          {/* add a hidden testcases div */}
          <div>
            <Typography
              variant="h5"
              style={{
                fontFamily: "initial",
                marginTop: "10px",
                marginLeft: "15px",
              }}
            >
              Enter the Testcases <b>hidden</b> from user *
            </Typography>
          </div>

          {/* get the hidden testcases div */}
          <div>
            <TextField
              multiline
              minRows={5}
              variant="outlined"
              required="true"
              placeholder="Enter the test cases that will be hidden from user while solving the problem."
              style={{
                marginTop: "3px",
                marginLeft: "15px",
                backgroundColor: "#F9F9F9",
                width: "96%",
              }}
              onChange={(e) => {
                setHidden(e.target.value);
              }}
            />
          </div>
        </div>

        {/* constraint div */}
        <div>
          {/* add the const  div */}
          <div>
            <Typography
              variant="h5"
              style={{
                fontFamily: "initial",
                marginTop: "10px",
                marginLeft: "15px",
                marginRight: "15px",
              }}
            >
              Constraints *
            </Typography>
          </div>

          {/* get the constraint div */}
          <div>
            <TextField
              multiline
              minRows={3}
              variant="outlined"
              required="true"
              placeholder="Enter the constraints of the question."
              style={{
                marginTop: "3px",
                marginLeft: "15px",
                marginBottom: "25px",
                backgroundColor: "#F9F9F9",
                width: "96%",
              }}
              onChange={(e) => {
                setConstraints(e.target.value);
              }}
            />
          </div>
        </div>

        <div style={{
            width : "100%",
            marginBottom : "20px"
        }}>
            { (valid == "Fill all the details correctly!!!") ?
            <Alert severity="error" onClose={() => {
                setValid("")
            }}>Fill all the details correctly.</Alert> : <p></p>}
        </div>

        <div
          style={{
            fontFamily: "initial",
            marginTop: "10px",
            marginLeft: "15px",
            marginRight: "15px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          
          <Button
            variant="contained"
            style={{
              backgroundColor: "orange",
            }}
            onClick={() => {
              if (
                !title ||
                !difficulty ||
                !acceptance ||
                !description ||
                !visible ||
                !hidden ||
                !constraints
              ) {
                setValid("Fill all the details correctly!!!"); 
                
              } else {
                processedData(title, difficulty, acceptance, description, visible, hidden, constraints);
              }
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddQuestion;
