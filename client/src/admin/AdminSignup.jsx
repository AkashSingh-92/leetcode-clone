import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import leetcodeImage from '../assets/leetcode.png';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import axios from "axios"

function AdminLogin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [available, setAvailable] = useState("");
    

    return <div>
        <div style={{
            display : "flex",
            justifyContent : "center",
            alignItems : "center",
            minHeight : "100vh",
            flexDirection : "column",
            backgroundColor: "#edeef1"
        }}>
        
        <div style={{
            width : "400px",
            marginBottom : "20px"
        }}>
            { (available === "Username already exists !!!") ?
            <Alert severity="error" onClose={() => {
                setAvailable("")
            }}>Username already exists !!!</Alert> : <p></p>}
            
        </div>


        <Card variant="outlined" style={{
            width : "400px",
            borderRadius : "10px"

        }}>

        <div style={{
            display : "flex",
            justifyContent : "center",
            marginTop : "20px",
            marginBottom : "0px"}}>
            <img src={leetcodeImage} alt="leetcode_image"/>
        </div>

        <div>
            <Typography variant='h4' style={{ 
                fontFamily : "sans-serif",
                display : "flex",
                justifyContent : "center",
                marginTop : "0px"
            }}>Codeit</Typography>
        </div>

        <div style={{
            margin : "20px"
        }}>
        <TextField label="Username" variant="outlined" fullWidth required="true"
        onChange={(e)=>{
            setUsername(e.target.value)   
            // {console.log(username)}         
        }}/>
        </div>

        <div style={{
            margin : "20px"
        }}>
        <TextField  label="Password" variant="outlined" fullWidth type="password" required="true"
        onChange={(e)=>{
            setPassword(e.target.value)
            // {console.log(password)}
        }}/>
        </div>

        <div style={{
            margin : "20px",
            display : "flex",
            justifyContent : "center"
        }}> 
        <Button variant="contained" style={{ backgroundColor : "#f99f1a"}}
        onClick={async ()=>{
            // running a function when a button is clicked i.e send the username and password ot the backend in body
                
            const response = await axios.post("http://localhost:3000/admin/signup", {
                username : username,
                password : password
            });
            const message = response.data.message;
            { (message === "Username is already taken !!!")?
            setAvailable("Username already exists !!!"):
            localStorage.setItem("token", response.data.token)}
            
            // need to add the route to redirect to the landing page

        }}>Sign Up</Button>
        </div>
        
        <div>
        <div variant='h6'style={{
            display : "flex",
            justifyContent : "center",
            marginBottom : "20px"}}>Already have an account?<a href="#">Signin</a></div>
        </div>

        </Card>
        </div>

    </div>
    
}

export default AdminLogin