import React from 'react'
import './login.css'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {useState} from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Signup from './Signup';






const Login = () => {

  const [user,setUser] = useState({email:"",password:""})

  const [emailError,setEmailError] = useState("")
  const [passwordError,setPasswordError] = useState("")

  const navigate = useNavigate()




  const handleChange = (event) => {
        
    setUser({...user,[event.target.name]:event.target.value})
}

const onHandleClick = () => {
        
  let regexEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

  let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/)

  if(regexEmail.test(user.email) && regexPassword.test(user.password)) {

    setEmailError("")
    setPasswordError("")

    console.log(user)


    axios.post("https://junk-king.onrender.com/logIn",user).then(data=> {
        console.log(data)

        if(data) {

          localStorage.setItem("email",user.email)
          
          if(data.data.token) {

            setTimeout(()=> {

              navigate('/products')
          },1000)

          }
        }
    }).catch(err=> {
        alert("Please Enter Correct Username or Password")
        setUser({email:"",password:""})
    })



    
}

else if(regexEmail.test(user.email) == false || regexPassword.test(user.password) == false) {
    console.log("error updated")

    if(regexEmail.test(user.email) == false) {
        setEmailError("Invalid Email")
        console.log(emailError)
    }

    else {
        setEmailError("")
    }
    

    if(regexPassword.test(user.password) == false) {
        setPasswordError("Password Should Contain minimum 8 characters , 1 uppercase , 1 lowercase , 1 special character ")

    }
    else {
        setPasswordError("")

    }
}
}
  return (
    <div id='main' style={{height:window.innerHeight}}>

      

        <div id='inputData'>

         
            
          <img style = {{width:"30px"}}src='https://www.freeiconspng.com/uploads/hamburgers-icon-7.png'/><br/>
          

            <h4> Junk King</h4>
        <InputGroup className="mb-3">

        <Form.Control
          placeholder="Email"
          aria-label="Email"
          aria-describedby="basic-addon1"
          onChange={handleChange}
          name = "email"
          value = {user.email}
        
        />
        
       
                

      </InputGroup>
      <h5  style={{color:"black"}}>{emailError}</h5>

      <InputGroup className="mb-3">
        <Form.Control
        type='password'
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
          onChange={handleChange}
          name = "password"
          value = {user.password}
        />

        <h5 style={{color:"black",marginTop:"20px"}}>{passwordError}</h5>
      </InputGroup>



      <Button variant="dark" onClick={onHandleClick}>Log in</Button>{' '}

      <br/>

      <Button onClick = {()=> {
        navigate('/createUser')
      }}variant="dark">Register </Button>{' '}




        </div>

    </div>
  )
}

export default Login
