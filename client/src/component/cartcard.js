import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { RxCross2 } from "react-icons/rx";
import { NavLink, useNavigate } from 'react-router-dom';
import { GiReturnArrow } from "react-icons/gi"
import { TbTruckDelivery } from "react-icons/tb"
import moment from 'moment';
import { useAccountContext } from '../context/accountcontext';


const CartCard = (item) => {



  const { delcartitem, upquant, setlogin,cartwish } = useAccountContext();
  const [quantity, setquantity] = useState(0);
  

  let deliverydate = (moment().add(5, 'days')).format("Do MMM YY");

  const navigate = useNavigate();

  let quant1 = "";
  let quant2, quant3, quant4, quant5;


  switch (item.quantity) {
    case 1:
      quant1 = "selected";
      break;

    case 2:
      quant2 = "selected";
      break;

    case 3:
      quant3 = "selected";
      break;

    case 4:
      quant4 = "selected";
      break;

    case 5:
      quant5 = "selected";
      break;
  }

  const carttowish = async () => {

    item.setloading(true);


    let carttowish;

    if(item.category === "saree")
    {
      carttowish = {

        id: item.id,
        color: item.colors,
        size: 'none',
        index: item.index,
        category: item.category

      };

    }

    else{


      carttowish = {

        id: item.id,
        color: item.colors,
        index: item.index,
        size: item.size,
        category: item.category

      };
    }

    const res = await fetch("http://localhost:5000/carttowish", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include",
          withCredentials: true,
          body: JSON.stringify(carttowish)
        })

        
    
        const data = await res.json();

    
        if (res.status == 401 || !data) {
          item.setloading(false);
          setlogin(true);
        }
    
        else if (res.status == 200) {
          item.setloading(false);
           cartwish(data);
        }
    
        else {
          item.setloading(false);
          alert("Something Went Wrong")
        }

  }


  


  const delitem = async () => {
    item.setloading(true);


    const res = await fetch("http://localhost:5000/delcart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      withCredentials: true,
      body: JSON.stringify({
        "id": item.id,
        "color": item.colors,
        "size": item.size
      })
    });
    

    const data = await res.json();

    if (res.status == 401) {
      item.setloading(false);
      navigate("/login");
    }

    else if (res.status == 200) {
      item.setloading(false);
      delcartitem(data);

    }

    else {
      item.setloading(false);
      alert("something went wrong")
    }

  }


  const setquant = (e) => {
    let q = Number(e.target.value);
    item.setloading(true);
    setquantity(q);
  }



  const updatequant = async () => {
    item.setloading(true);

    const res = await fetch("http://localhost:5000/updatequant", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      withCredentials: true,
      body: JSON.stringify({
        "id": item.id,
        "colors": item.colors,
        "size": item.size,
        "quantity": quantity
      })
    });
    

    const data = await res.json();

    if (res.status == 401) {
      item.setloading(false);
      navigate("/login");
    }

    else if (res.status == 200) {
      item.setloading(false);

      upquant(data);

    }

    else {
      item.setloading(false);
      alert("something went wrong")
    }

  }

  useEffect(() => {
    // updatequant(item.id,item.colors,quantity);
    if (quantity != 0) {
      updatequant();

    }
  }, [quantity])

  let discount = Math.ceil(((item.mrp - item.price) / item.mrp) * 100);

  let link;

  switch (item.category) {
    case "saree":
      {
        link = `/saree/${item.id}/${item.index}`;
        break;
      }

    case "blouse":
      {
        link = `/blouse/${item.id}/${item.index}`;
        break;
      }

    case "lehanga":
      {
        link = `/lehanga/${item.id}/${item.index}`;
        break;
      }
  }

  

  return (
    <Wrapper>
      <div className='cartcard'>
        <p className='crossdel' onClick={delitem} ><RxCross2 /></p>
        <div className='image'>
          <NavLink to={`${link}`}><img src={item.image} alt="Product Image" ></img></NavLink></div>
        <div className='prodetails' >

          <p>{item.name}</p>
          <p>{item.description}</p>
          <p>Sold by:Omnitech Retail</p>

          <div className='colorsize' >

            <div className='color' style={{ backgroundColor: `${item.colors}` }} ></div>

            <div className='qty'>Qty:
              <select name='quant' onChange={setquant} >
                <option value="1" selected={quant1}  >1</option>
                <option value="2" selected={quant2} >2</option>
                <option value="3" selected={quant3} >3</option>
                <option value="4" selected={quant4} >4</option>
                <option value="5" selected={quant5} >5</option>
              </select></div>

            {item.category === "blouse" || item.category === "lehanga" ? <div className='size'>Size: <span>{item.size}</span></div> : ""}


          </div>



          <p className='price'><span>&#8377;{item.price}</span> {discount===0?"":<><span>&#8377;{item.mrp}</span> <span>{discount}%</span></>}</p>
          <p><span><GiReturnArrow /></span> <b>14 days</b> return available</p>
          <p><span><TbTruckDelivery /></span> Delivery by <b>{deliverydate}</b></p>


        </div>
        <p className='movwish' onClick={carttowish} >Move to Wishlist</p>
      </div>
    </Wrapper>
  )
}


const Wrapper = styled.section`

.cartcard{
  box-shadow: 0px 0px 7px -7px black;
  border-radius: 4px;
    width:100%;
    display: flex;
    border: 1px solid rgb(230, 230, 230);
    margin: 5px 0px;
    padding: 10px 10px;
    position: relative;
  }

  .image{
    width:120px;
    position: relative;
  }

  .image img{
    width:100%;
  }

  .image input{
    position: absolute;
    top: 5px;
    left: 5px;
  }

  .prodetails{
    margin-left:14px;
    position: relative;
  }

  .crossdel
  {
    font-size: 20px;
    position: absolute;
    right: 10px
  }

  .crossdel :hover
  {
    cursor: pointer;
  }

  .prodetails > :nth-child(1)
  {
    font-weight: 14px;
    font-weight: bold;
  }

  .prodetails > :nth-child(2)
  {
    margin-top: 1px;
    font-size: 13px;
    width: 146px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .prodetails > :nth-child(3)
  {
    color: #939090;
    margin-top: 2px;
    font-size: 12px;
    margin-bottom: 5px;
  }

  .colorsize{
    display: flex;
    align-items: center;
  }


.color{
  width:13px;
  height:13px;
  border-radius: 20px;
}

  .qty select{
    background:none;
    border:none;
    font-weight:bold;
  }

  .qty{
    border-radius: 2px;
    font-weight: 600;
    font-size: 13px;
    margin-left: 10px;
    padding: 4px 6px;
    background-color:rgb(242, 242, 242);
  }

  .size{
    color: black;
    margin-left: 13px;
  }

  .size span{
    font-size: 13px;
  }

  .price{
    display:flex;
    align-items: center;
    margin-top: 13px;
  }

  .price > :nth-child(1){
    font-size: 14px;
    font-weight: 600;
  }

  .price > :nth-child(2){
    text-decoration: line-through;
    margin: 0px 7px;
    font-size: 14px;
    color: #9a9a9a;
    
  }

  .price > :nth-child(3){
    color: #4c822a;
    font-size: 14px;
    margin-bottom: 0px;
    font-weight: 300;
  }

  .prodetails > :nth-child(6) span{
    margin-right: 2px;
  }


  .prodetails > :nth-child(6){
    margin-top: 11px;
    font-size: 12px;

  }


  .prodetails > :nth-child(7){
    display:flex;
    align-items:center;
    margin-top: 3px;
    font-size: 12px;    
  }

  .prodetails > :nth-child(7) span{
    margin-bottom: -2px;
    margin-right: 3px;
    font-size: 16px;
  }

  .movwish{
    font-weight:600;
    color: #ff0013;
    font-size: 12px;
    position: absolute;
    bottom: 4px;
    right: 8px;
  }

  .movwish:hover{
    cursor: pointer;
  }






  @media (max-width: 378px ){

    .cartcard{
      padding: 4px;
    }

    .crossdel{
      font-size: 16px;
      right: 2px;
    }

    .image{
      width: 97px;
    }

    .prodetails{
      margin-left: 11px;
      padding: 2px 0px;
    }


    .prodetails > :nth-child(1) {
      font-size: 13px;
    }

    .prodetails > :nth-child(2) {
      font-size: 10px;
    }

    .prodetails > :nth-child(3) {
      font-size: 9px;
    }

    .qty{
      font-size: 11px;
      margin-left: 7px;
      padding: 1px 4px;
    }

    .qty select{
      font-size: 11px;
    }

    .price{
      margin-top: 10px;
    }

    .prodetails > :nth-child(6){
      margin-top: 10px;
      font-size: 10px;
    }

    .prodetails > :nth-child(7){
      margin-top: 1px;
      font-size: 10px;
    }

    .prodetails > :nth-child(7) span{
      font-size: 14px;
    }

    .size{
      margin-left: 10px;
      font-size: 13px;
    }

    .wishlist{
      margin: 20px 0px;
      padding: 12px 8px 6px;
    }

    .wishlist > p{
      font-size: 13px;
    }

    .wishlist > p > span{
      margin-right: 4px;
      font-size: 16px;
    }

    .wishlist > span{
      font-size: 11px;
    }

    
    






  }








`

export default CartCard