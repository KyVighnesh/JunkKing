import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';






const Home = () => {

  const navigate = useNavigate()

  const onHandleClick = () => {
    navigate('/signin')
  }


  return (
   
    <div>
        


      <div id = "homeDiv"style={{ backgroundImage: "url(" + "https://images.pexels.com/photos/5490999/pexels-photo-5490999.jpeg?auto=compress&cs=tinysrgb&w=600" + ")",
    backgroundPosition: 'full',
    backgroundSize: 'cover',
    overflow:"hidden",
    height: "705px"}}>

        

    
        <h2 style={{textAlign:"center",color:"white",fontWeight:"bolder",position:'relative',top:10}}>Junk King</h2>
        
        

        <div style={{position:"relative",top:200,left:50}}>
        <h3 style={{color:"white",fontWeight:'bolder'}}>
        LIP-SMACKING BURGERS

        </h3>

        <h3 style={{color:"white",fontWeight:'bolder'}}>
        READY FOR YOU
        </h3>

        <Button onClick={onHandleClick} style= {{height:"50px",width:"210px",borderRadius:"20px",backgroundColor:"orange",color:"black"}}>Get Started</Button>{' '}

        </div>


      </div>
    </div>
  )
}

export default Home