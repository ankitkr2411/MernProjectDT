import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { NavLink } from 'react-router-dom';
import { useFilterContext } from '../context/filtercontext';
import { useAccountContext } from '../context/accountcontext';

const Ordercard = (props) => {

  const {cancelord} = useAccountContext();

  let link;


  const cancelorder = async (orderid, id, color, size) => {
    let obj = {
      orderid,
      id,
      color,
      size
    }

    const res = await fetch("http://localhost:5000/cancelorder", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      withCredentials: true,
      body: JSON.stringify(obj)
    });

    const data = await res.json();

    if (res.status == 401) {
      // navigate("/login");
    }

    else if (res.status == 200) {
       cancelord(data);

    }

    else {
      alert("Somethong wnt wrong")
    }
  }

  return (
    <div className='order'>

      <div className='odidtxnid' >
        <p>Order Id: {props.order.orderId}</p>
        <p>Txt Id: {props.order.txtId}</p>
      </div>


      {props.order.products.map((currElem) => {

        switch (currElem.category) {
          case "saree":
            {
              link = `/saree/${currElem.id}/0`;
              break;
            }

          case "blouse":
            {
              link = `/blouse/${currElem.id}/0`;
              break;
            }

          case "lehanga":
            {
              link = `/lehanga/${currElem.id}/0`;
              break;
            }
        }

        return <>
          <div className='deliverydetail'>
          {currElem.status == "Cancelled"?<p className='cancelled' >Cancelled</p>:<p><TbTruckDelivery /> <b>Delivered By:</b> {currElem.deliverydate}</p>}
            
            <p><b>{props.order.address.name},</b> {props.order.address.pincode}</p>
          </div>
          <NavLink className='product' to={`${link}`}>
            <div className='proddetails'>
              <div className='image'>
                <img src={currElem.image} />
              </div>

              <div className='prodname'>
                <p><b>{currElem.name}</b></p>
                <p>{currElem.description}</p>
                <span>Colors: {currElem.colors}</span>
                <span>Quantity: {currElem.quantity}</span>
                {currElem.size === "none" ? "" : <span>Size: {currElem.size}</span>}

                <p><b>&#8377;{currElem.price}</b></p>
              </div>

            </div>
          </NavLink>

          <div className='canceldiv'>
          {currElem.status == "Cancelled"?"":<span className='cancel' onClick={() => { cancelorder(props.order.orderId, currElem.id, currElem.colors, currElem.size) }} >Cancel</span>}
          </div>

          
        </>

      })



      }

    </div>
  )
}

export default Ordercard