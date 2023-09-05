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
        


      <div id = "homeDiv" style={{ backgroundImage: "url(" + "https://png.pngtree.com/back_origin_pic/03/89/87/ac7df65bc8adc85eaebe85c361338718.jpg" + ")",
    backgroundPosition: 'full',
    backgroundSize:"cover",
    overflow:"hidden",
    height: window.innerHeight
    }}>

        

    
        <h2 style={{textAlign:"center",color:"white",fontWeight:"bolder",position:'relative',top:80}}><img style = {{width:"60px"}}src='https://www.freeiconspng.com/uploads/hamburgers-icon-7.png'/><br/>Junk King</h2>
        
        

        <div id = "textDiv"style={{position:"relative",top:200,left:30}}>
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
