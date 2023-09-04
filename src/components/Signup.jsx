import React from 'react'
import './signup.css'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {useState,useEffect} from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

  const[menu,setMenu] = useState([])
  

  const [user,setUser] = useState({name:"",email:"",password:"",contact:0,address:"",total:0})

  const [nameError,setNameError] = useState("")
  const [emailError,setEmailError] = useState("")
  const [passwordError,setPasswordError] = useState("")

  const navigate = useNavigate()




  const[quantity,setQuantity] = useState(true)

  const getMenu = () => {
    axios.get("https://junk-king.onrender.com/getMenu").then(data => {
      console.log(data.data.menu)
      

      let addedQuantity = data.data.menu.map((ele)=> {
        return (
          {...ele,quantity:0}
        )
      })

      setMenu(addedQuantity)
      setQuantity(false)


    

    })

    console.log(menu)
  }


  useEffect(()=> {
    getMenu()
  },[quantity])




  const handleChange = (event) => {
        
    setUser({...user,[event.target.name]:event.target.value})
}

const onHandleClick = () => {
        
  let regexEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

  let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/)

  if(user.name.length>=4 && regexEmail.test(user.email) && regexPassword.test(user.password)) {

    setNameError("")
    setEmailError("")
    setPasswordError("")

    console.log(menu)

    setUser(user.products = menu)

    console.log(user)

    axios.post("https://junk-king.onrender.com/signup",user).then(data=> {
        console.log(data)

        if(data) {

            alert("Sign up Successful")

            if(data.data.status == "success") {

              setTimeout(()=> {

                navigate('/signin')
            },1000)

            }
            
        }
    }).catch(err=> {
        console.log(err)
    })



    
}

else if(user.name.length<4 || regexEmail.test(user.email) == false || regexPassword.test(user.password) == false) {
    console.log("error updated")

    if(user.name.length<4) {
        setNameError("Name Should Atleast Contain 4 Characters")
        console.log(nameError)

    }

    else {
        setNameError("")

    }

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
    <div id='main'>

    <div id='inputData'>
    <img style = {{width:"30px"}}src='https://th.bing.com/th/id/OIP.yMd72XNbemK_40Mhwz-lfAHaHa?pid=ImgDet&rs=1'/><br/>

        <h4>Junk King</h4>

        <InputGroup className="mb-3">
    <Form.Control
      placeholder="Name"
      aria-label="Name"
      aria-describedby="basic-addon1"
      onChange={handleChange}
      name = "name"
    />
    {nameError}
  </InputGroup>
    <InputGroup className="mb-3">
    <Form.Control
      placeholder="Email"
      aria-label="Email"
      aria-describedby="basic-addon1"
      onChange={handleChange}
      name = "email"
    />
    
  </InputGroup>
  {emailError}

  <InputGroup className="mb-3">
    <Form.Control
      placeholder="Password"
      aria-label="Password"
      aria-describedby="basic-addon1"
      onChange={handleChange}
      name = "password"
    />
  </InputGroup>
<h6 style={{textAlign:"center"}}>{passwordError}</h6>
  <InputGroup className="mb-3">
    <Form.Control
      placeholder="Contact"
      aria-label="Contact"
      aria-describedby="basic-addon1"
      onChange={handleChange}
      name = "contact"
    />
  </InputGroup>

  <InputGroup className="mb-3">
    <Form.Control
      placeholder="Address"
      aria-label="Address"
      aria-describedby="basic-addon1"
      onChange={handleChange}
      name = "address"
    />
  </InputGroup>

  <Button variant="dark" onClick={onHandleClick}>Sign up</Button>{' '}

  <br/>





    </div>

</div>
  )

}

export default Signup
