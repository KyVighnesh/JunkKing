import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import { useState,useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './products.css'
import { useNavigate } from 'react-router-dom';


const Products = () => {


    const[currentUser,getCurrentUser] = useState()

    const[products,setProducts] = useState([])

    const[cart,setCart] = useState([])

    const[test,setTest] = useState(true)


    const navigate = useNavigate()



    // const navigate = useNavigate()


    const checkOut = () => {
      axios.put(`http://localhost:8090/${localStorage.getItem("email")}`,{cart:cart}).then(data=> {
        navigate('/cart')
      })

      axios.put(`http://localhost:8090/${localStorage.getItem("email")}`,{products:products}).then(data=> {
        console.log(data)
        
      })
    }


    const fetchUser = () => {
        axios.post("http://localhost:8090/user",{email:localStorage.getItem("email")}).then(data=> {

       

        console.log(data.data.currentUser.name)

        getCurrentUser(data.data.currentUser.name)

        setProducts(data.data.currentUser.products)

        console.log(data.data.currentUser.products)
        

        setCart(data.data.currentUser.cart)




        }).catch(err=> {
            console.log(err)
        })
    }

    useEffect(()=> {
        fetchUser()
    },[])


    const onClickMinus = (clicked) => {


        // clicked.quantity = clicked.quantity - 1

        // setTest(!test)

        // if(clicked.quantity == 0) {
        //     let filter = cart.filter((element)=>{

        //         return element.id != clicked.id

        //     })

        //     setCart(filter)
            
        // }

        let find = cart.find((ele)=> {
          return ele.id == clicked.id
        })


        if (find) {
          clicked.quantity = clicked.quantity - 1

          let filter = cart.filter((ele)=> {
            return ele.id != clicked.id
          })


          if(clicked.quantity == 0 ) {
            setCart(filter)
          }else {
            setCart([...filter,clicked])

          }

        }

            



        


        

    }


    const onClickAdd = (clicked) => {

        clicked.quantity = clicked.quantity + 1

        console.log(products)

        let find = cart.find((ele)=> {
            return ele.id == clicked.id
        })

        if(find) {

            console.log("found ")


            let filter = cart.filter((element)=>{

                return element.id != find.id

            })

            setCart([...filter,clicked])
            
        }

        else {

            setCart([...cart,clicked])

            console.log(clicked)
            console.log(cart)
        }

        

        

    }

    

  return (
    <div id='bodyDiv'>
        <Navbar className="bg-body-tertiary">
      <Container>
      <div style={{display:'flex',width:"200px",justifyContent:"space-between",float:"left"}}>
        <Navbar.Brand className='headerText' href="#home">Your Orders</Navbar.Brand>
        <Navbar.Brand className='headerText' href="#home" onClick = {checkOut}>View Cart</Navbar.Brand>
        </div>  
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text id='user'>
            Signed in as: <span style={{color:"black"}}>{currentUser}</span>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <br />

    <br />

    <div id='burgers'>
    <h2>
        Burgers <Badge bg="secondary">New</Badge>
      </h2>
      <div className= 'categories'>
      {products.slice(0,5).map((ele)=> {
        return (
            <Card className = "menuCard"style={{ width: '250px', height:"90%" }}>
      <Card.Img variant="top" src={ele.img} />
      <Card.Body>
        <Card.Title>{ele.dsc}</Card.Title>
        <Card.Text>
          {`${ele.price} $`}
        </Card.Text>
        <div style={{display:'flex',justifyContent:"space-around",alignItems:"center"}}>
        <Button variant="dark" style={{width:"60px"}} onClick = {()=> {
            onClickAdd(ele)
        }}>+</Button>
        <span style={{position:'relative',top:20}}>{ele.quantity}</span>
        <Button variant="dark" style={{width:"60px"}} onClick = {()=> {
            onClickMinus(ele)
        }}> - </Button>

        </div>

      </Card.Body>
    </Card>
        )
      })}
      </div>
    </div>

    

    <div className='leftover'>
        <h2 id='pizza'>
        Pizza <Badge bg="secondary"></Badge>
        </h2>
        <div className= 'categories'>
        {products.slice(5,10).map((ele)=> {
        return (
            <Card className = "menuCard" style={{ width: '250px', height:"90%" }}>
      <Card.Img variant="top" src={ele.img} />
      <Card.Body>
        <Card.Title>{ele.dsc}</Card.Title>
        <Card.Text>
          {`${ele.price} $`}
        </Card.Text>
        <div style={{display:'flex',justifyContent:"space-around",alignItems:"center"}}>
        <Button variant="dark" style={{width:"60px"}} onClick = {()=> {
            onClickAdd(ele)
        }}>+</Button>
        <span style={{position:'relative',top:20}}>{ele.quantity}</span>
        <Button variant="dark" style={{width:"60px"}} onClick = {()=> {
            onClickMinus(ele)
        }}> - </Button>


        </div>

      </Card.Body>
    </Card>
        )
      })}

        </div>
    </div>

    <div className='leftover'>
        <h2>
        Beverages <Badge bg="secondary"></Badge>
        </h2>
        <div className= 'categories'>
        {products.slice(20,25).map((ele)=> {
        return (
            <Card className = "menuCard" style={{ width: '250px', height:"90%" }}>
      <Card.Img variant="top" src={ele.img} />
      <Card.Body>
        <Card.Title>{ele.dsc}</Card.Title>
        <Card.Text>
          {`${ele.price} $`}
        </Card.Text>
        <div style={{display:'flex',justifyContent:"space-around",alignItems:"center"}}>
        <Button variant="dark" style={{width:"60px"}} onClick = {()=> {
            onClickAdd(ele)
        }}>+</Button>
        <span style={{position:'relative',top:20}}>{ele.quantity}</span>
        <Button variant="dark" style={{width:"60px"}} onClick = {()=> {
            onClickMinus(ele)
        }}> - </Button>


        </div>

      </Card.Body>
    </Card>
        )
      })}

        </div>

    </div>
    </div>
  )
}

export default Products