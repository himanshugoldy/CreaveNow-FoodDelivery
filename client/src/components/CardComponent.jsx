import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardComponent(props) {


  let option = props.options[0];
  let data = useCart();
  const priceOptions = Object.keys(option);
  const priceRef = useRef();
  const dispatch = useDispatchCart();
  const [qty,setQty] = useState(1);
  const [size,setSize] = useState("");
  let foodItem = props.foodItem;
  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


    // setBtnEnable(true)

  }


  let finalPrice = qty * parseInt(option[size]);
  useEffect(()=>{
    setSize(priceRef.current.value);
  },[])


  



  return (
    <Card className="m-2" style={{ width: '18rem'}}> 
      <Card.Img variant="top" src={props.foodItem.img} style={{height:'200px', objectFit:"fill"}} />
      <Card.Body>
        <Card.Title>{props.foodItem.name}</Card.Title>
        <Card.Text>
          {props.foodItem.description}
        </Card.Text>
            <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
                {
                Array.from(Array(6), (e,i)=>{
                    return(
                        <option key = {i+1} value={i+1}>{i+1}</option>
                    )
                })
                }
            </select>
            <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
          {priceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className='d-inline h-100 fs-5'>
          ₹{finalPrice}/-
        </div>
        <hr />
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;