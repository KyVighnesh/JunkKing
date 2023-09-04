import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import {useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './cart.css'


const Cart = () => {

    const[data,getData] = useState(true)
    const[totalAmount,setTotalAmount] = useState(true)

    const[increment,setIncrement] = useState(true)

    const[cart,setCart] = useState([])

    const[product,setProduct] = useState()

    const[total,setTotal] = useState(0)

    const[decrement,setDecrement] = useState(true)

    const navigate = useNavigate()



    const fetchCart = () =>{
        axios.post("https://junk-king.onrender.com/user",{email:localStorage.getItem("email")}).then(data => {
            console.log(data.data.currentUser.cart)
            setCart(data.data.currentUser.cart)
            setProduct(data.data.currentUser.products)
            getData(!data)

            console.log(product)
            
        })
    }

    const sentTotal = () => {


      axios.put(`https://junk-king.onrender.com/${localStorage.getItem("email")}`,{total:total,cart:cart}).then(data=> {
        axios.post("https://junk-king.onrender.com/user",{email:localStorage.getItem("email")}).then(res=> {
          console.log(res)
          window.location = "https://junk-king.onrender.com/buy"
        })
      })
    }

    let sum = 0;

    const findSum =() => {

      for(let i = 0; i<cart.length; i++) {

        sum = sum + cart[i].price * cart[i].quantity
      }
      
      console.log(sum)
      setTotal(sum)
    }

    useEffect(()=> {
        fetchCart()
        findSum()
    },[data])


    

    useEffect(()=> {
      findSum()
  },[increment])

  useEffect(()=> {
    findSum()
},[decrement])


    const onClickAdd =(clicked)=> {

      let find = cart.find((ele)=> {

        return ele.id == clicked.id

      })

      if(find) {

        clicked.quantity = clicked.quantity + 1;

        setIncrement(!increment)

        console.log(cart) 

      }


      product.find((ele)=> {
        if(ele.id == clicked.id) {
          ele.quantity = ele.quantity + 1

          console.log(product)
        }
      })

      axios.put(`https://junk-king.onrender.com/${localStorage.getItem("email")}`,{products:product}).then(data=> {
        console.log(data)
        
      })

      setTotalAmount(!totalAmount)

    }


    const onClickDecrease = (clicked) => {
      let find = cart.find((ele)=> {

        return ele.id == clicked.id

      })

      if(find) {

        clicked.quantity = clicked.quantity - 1;

        let filter = cart.filter((ele)=> {
          return ele.id != clicked.id
        })

        if(clicked.quantity == 0) {
          setCart(filter)
        }

        else {
          setCart([...filter,clicked])

        }  
        
        
        product.find((ele)=> {
          if(ele.id == clicked.id) {
            ele.quantity = ele.quantity - 1
  
            console.log(product)
          }
        })


        axios.put(`https://junk-king.onrender.com/${localStorage.getItem("email")}`,{products:product}).then(data=> {
        console.log(data)
        
      })

      setDecrement(!decrement)
  

        console.log(cart)

      }

    }


   

    



    
   
  return (
    <div className='table'>
      <TableContainer id = "tableContainer"component={Paper}>
      <Table sx={{ Width: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell><h5 className='cell'>Orders</h5></TableCell>
            <TableCell id = "quantityColumn"align="right">
            <h5 className='cell'>Quantity</h5></TableCell>
            <TableCell align="right"><h5 className='cell'>Price</h5></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell id = "buttonCell" align="right"><Button variant="dark" id = "buttons" onClick={()=> {onClickAdd(row)}} style={{width:"30px",position:"relative",top:4,right:"15px"}}>+</Button>{row.quantity}<Button onClick = {()=> {onClickDecrease(row)}}variant="dark"style={{width:"30px",position:"relative",top:4,left:"15px"}}>-</Button> </TableCell>
              <TableCell align="right">$ {row.price * row.quantity} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br/>
      <br/>
      <br/>

      <div style={{display:"flex",width:"90%",justifyContent:"space-between",height:"40px"}}>

        <a onClick={sentTotal}> <Button id = "paymentButton" style = {{width:"200px",height:"50px",position:"relative",top:"-15px"}}variant="success">Proceed to Payment</Button>{' '}</a>


      <h3 className='total'>Your Total - {` is $  ${total}`} </h3>
      </div>
      

    </TableContainer>
 

    </div>
  )
}

export default Cart
