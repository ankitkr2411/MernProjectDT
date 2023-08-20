import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useFilterContext } from './context/filtercontext';
import styled from 'styled-components';
import CartCard from './component/cartcard';
import Addadress from './Addadress';
import moment from 'moment';
import {MdLocalOffer,MdOutlineLocalOffer} from "react-icons/md"
import {SlArrowDown,SlArrowRight} from"react-icons/sl"
import {BsBookmark} from"react-icons/bs"
import Emptycart from './component/Emptycart';
import Changeaddress from './Changeaddress';
import Addaddresscart from './Addaddresscart';
import Loading from './component/Loading';
import Message from './component/Message';
import { useAccountContext } from './context/accountcontext';



const Cart = () => {

  const navigate = useNavigate(); 
  const [loading, setloading] = useState(false);

  const { cart_Items, user_Data, addorder, cart } = useAccountContext();

  


  let tprice = 0, tmrp = 0, discount=0;
  let commaprice,commamrp,commadiscount;

  const [add,setadd] = useState(false);
  const [change,setchange] = useState(false);
  const [address,setaddress]= useState("");
  const [temp,settemp] = useState("do");
  const [mess,setmess] = useState(false);
  const [message, setmessage] = useState("");
  

  useEffect(() => {
    cart();
}, [])


  let addres;
  

  const authenticate = async () => {
    try {
      const res = await fetch("http://localhost:5000/cart", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        withCredentials: true,
      })

      //Here it accepting the .send from server and converting it to object
      const data = await res.json();

      //dafault page is at 200
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }


    }

    catch (err) {

      navigate("/login");
    }
  }

  useEffect(() => {
    authenticate();
  }, [])

  




  const loadScript = (src) => {

    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;

      script.onload = () => {
        resolve(true)
      }

      script.onerror = () => {
        resolve(false)
      }


      document.body.appendChild(script);


    })

  }



  const payment = async () => {
    let email = user_Data.email;
    let contact = user_Data.phone;
    let totalprice = tprice;
    let orderId = Math.floor(10000000 + Math.random() * 90000000);
    orderId = "DTOID"+orderId;
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      setmessage("Check Your Connection");
      setmess(true);
      return
    }

    const options = {
      key: "rzp_test_dOQUl8HAAd6t5w",
      currency: "INR",
      amount: totalprice * 100,
      name: "Dinesh Textiles",
      description: "Thanks for Purchasing",
      image: "https://png.pngtree.com/png-clipart/20201208/original/pngtree-red-and-black-logo-png-image_5517319.jpg",
      handler: async function (response) {

        let txtId = response.razorpay_payment_id;
        let deliverydate = (moment().add(5, 'days')).format("Do MMM YY");
        let products = cart_Items;

        for(let i=0;i<products.length;i++)
        {
          products[i].status = "Delivery By";
          products[i].deliverydate = deliverydate;

        }
        
        

        const obj = { orderId, txtId, totalprice, address, products };




        const res = await fetch("http://localhost:5000/addorder",{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            withCredentials: true,
             body: JSON.stringify(obj)
        });


        let data = await res.json();

        if (res.status == 401) {
          navigate("/login");
        }
    
        else if (res.status == 200) {
          addorder(data);
          navigate("/order");
    
        }
    
        else {
          setmessage("Something Went Wrong");
      setmess(true);
        }

        
        



      },

      prefill: {
        name: "Dinesh Textile",
        email: email,
        contact: contact
      }



    };


    const paymentObject = new window.Razorpay(options);
    paymentObject.open();




  }


  const checkaddpayment = () =>{
    if(addres.length == 0)
    {
      setmessage("Add Address");
      setmess(true);
      return;
    }

    payment();
  }






if (cart_Items.length == 0) {
  return <Emptycart />
}


else {
  addres = user_Data.address.filter((currElem) => {
    return currElem.defaultvalue == true;

  })


  if(temp == "do")
  {
    setaddress(addres[0]);
    settemp("undo");

  }


  window.scrollTo({ top: 0, left: 0 });

  return (
    <Wrapper>
    {loading?<Loading />:""}
    {mess?<Message message={message} setmess={setmess} />:""}
      <div className="container">

        <div className='firstbox'>

          <div className='addressbox'>


            {

              user_Data.address.length == 0 ?<> <NavLink className="addchangeadress" onClick={()=>setadd(true)} >ADD ADDRESS</NavLink> 
              <Addaddresscart show = {add} setadd={setadd} setaddress = {setaddress}/> </> :
                <>
                  <div className='address'>
                    <p>Deliver to: <span><b>{address.name}, {address.pincode}</b></span></p>
                    <p>{address.add} </p>
                  </div>

                  <NavLink className="addchangeadress" onClick={()=>{setchange(true)}}>CHANGE ADDRESS</NavLink>
                  <Changeaddress show={change} setshow={setchange} setaddress={setaddress} setnewadd={setadd} />
                </>

            }


          </div>

          <div className='offer'>
            <p><span><MdLocalOffer /></span> Available Offers</p>
            <p>10% Instant Discount on ICICI Bank Credit and Debit Cards on a min spend of Rs 3,500.TCA </p>
            <p>Show More <span><SlArrowDown /></span></p>
          </div>

          <div className='itemselected'>
            {/* <input type='checkbox' /> */}
            <p><b>CART ITEMS</b></p>
            {/* <div className='remmov'>
              <div className='remove'>REMOVE</div>
              <div className='move' >MOVE TO WISHLIST</div>
            </div> */}

          </div>

          {cart_Items.map((curElem) => {
            tmrp = tmrp + (curElem.mrp * curElem.quantity);
            tprice = tprice + (curElem.price *  curElem.quantity);

            let id = curElem.colors + curElem.id;

            discount = tmrp - tprice;
            commaprice = tprice.toLocaleString();
            commamrp = tmrp.toLocaleString();
            commadiscount = discount.toLocaleString();

            return <CartCard key={id} {...curElem} setloading = {setloading} />;

          }) 
          }

          <NavLink to="/wishlist" className='wishlist' >
            <p><span><BsBookmark /></span>Add More From Wishlist</p>
            <span><SlArrowRight /></span>

          </NavLink>
          



        </div>


        <div className='secbox'>

          <div className='coupon'>
            <p>COUPONS</p>
            <div className='applyco'>
              <p><span><MdOutlineLocalOffer /></span> APPLY Coupons</p>
              <p>APPLY</p>
            </div>
          </div>

          <div className='pricedet'>
            <p>PRICE DETAILS ({cart_Items.length})</p>
            <div className='faredetails'>
              <p>Total MRP</p>
              <p>&#8377;{commamrp}</p>
            </div>

            <div className='faredetails'>
              <p>DISCOUNT on MRP</p>
              <p className='disc' >-{commadiscount}</p>
            </div>

            <div className='faredetails'>
              <p>Coupon Discount</p>
              <p className='coup' >Not Applied</p>
            </div>

            <div className='faredetails'>
              <p>Convenience Fee <NavLink className="knowmore">Know More</NavLink></p>
              <p>10</p>
            </div>

            <div className='faredetails finalmrp'>
              <p>Total Amount</p>
              <p>&#8377;{commaprice}</p>
            </div>

          </div>

          <NavLink className="pay" onClick={checkaddpayment} >PLACE ORDER</NavLink>

        </div>


        <div className='footer'>
          <div className='foticon' >

          <img src="https://constant.myntassets.com/checkout/assets/img/footer-bank-ssl.png" width="70" height="37" />
          <img src="https://constant.myntassets.com/checkout/assets/img/footer-bank-visa.png" width="60" height="37" />
          <img src="https://constant.myntassets.com/checkout/assets/img/footer-bank-mc.png" width="60" height="37" />
          <img src="https://constant.myntassets.com/checkout/assets/img/footer-bank-ae.png" width="60" height="37" />
          <img src="https://constant.myntassets.com/checkout/assets/img/footer-bank-dc.png" width="60" height="37" />
          <img src="https://constant.myntassets.com/checkout/assets/img/footer-bank-nb.png" width="60" height="37" />
          <img src="https://constant.myntassets.com/checkout/assets/img/footer-bank-cod.png" width="60" height="37" />
          <img src="https://constant.myntassets.com/checkout/assets/img/footer-bank-rupay.png" width="60" height="37" />
          <img src="https://constant.myntassets.com/checkout/assets/img/footer-bank-paypal.png" width="60" height="37" />
          <img src="https://constant.myntassets.com/checkout/assets/img/footer-bank-bhim.png" width="60" height="37" />
          </div>
          <NavLink to="/contactus" >Need Help ? Contact Us</NavLink>
          
        </div>
            

      </div>


    </Wrapper>

  )

}


}

const Wrapper = styled.section`


  .container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

  }

  .firstbox{
    width: 40%;
    display: flex;
    flex-direction: column;
    padding-top:20px;
  }

  .addressbox{
    border-radius: 4px;
    box-shadow: 0px 0px 7px -7px black;
    width:100%;
    display: flex;
    border: 1px solid rgb(231, 230, 230) ;
    margin: 5px 0px;
    padding: 22px;
  }



  .address{
    width:60%;
    margin-right: 10px;    
  }

  .address > :nth-child(1)
  {
    font-weight: 400;
    font-size: 13px;
    margin-bottom: 5px;
  }

  .address > :nth-child(2)
  {
    font-weight: 300;
    font-size: 11px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .addchangeadress{

    display: flex;
    align-items: center;
    color: #ff0052;
    border-radius: 3px;
    font-weight: 500;
    font-size: 12px;
    border: 1px solid #896363;
    padding:5px 10px;
    margin-left: auto;
  }

  .offer{
    border-radius: 4px;
    box-shadow: 0px 0px 7px -7px black;
    width:100%;
    border: 1px solid rgb(230, 230, 230) ;
    margin: 5px 0px;
    padding: 17px;

  }

  .offer > :nth-child(1)
  {
    display:flex;
    align-items: flex-start;
    fon-size: 14px;
    font-weight: 500;
  }

  .offer > :nth-child(1) span
  {
    font-size:18px;
    margin-right:10px;
  }

  .offer > :nth-child(2)
  {
    font-weight: 300;
    margin-top: 10px;
    margin-left:17px;
    font-size: 12px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .offer > :nth-child(3)
  {
    color:#ff0042;
    display:flex;
    align-items:center;
    margin-top: 10px;
    margin-left:19px;
    font-size: 13px;
    font-weight: bold;
  }

  .offer > :nth-child(3) span{
    margin-left: 3px;
    font-size: 9px;
  }

  .itemselected{
    width:100%;
    display: flex;
    margin: 5px 0px;
    padding: 10px 10px;

  }

  .itemselected input{
    width: 18px;
    margin-right: 10px;
  }

  .itemselected p{
    font-size: 15px;
    text-align:center;
    margin: 5px 0px;
  }

  .remmov{
    display: flex;
    margin-left: auto;

  }

  .remove, .move{
    font-weight:600;
    color: #ff0013;
    font-size: 11px;
    margin: 5px 0px;
    padding-left: 27px;
    display: flex;
    align-items:center;
  }

  .remove{
    border-right: 1px solid rgb(206,206,206);
    padding-right: 27px;
    color: #ff0013;
    font-weight: 600;
    font-size: 11px,
    border-right:1px solid rgb(177, 177, 177);
  }


  .wishlist{
    box-shadow: 0px 0px 7px -8px black;
    border-radius: 4px;
    margin: 25px 0px;
    padding: 17px 14px;
    padding-bottom: 9px;
    border: 1px solid rgb(230,230,230);
    justify-content:space-between;
    display: flex;
  }

  .wishlist > p{
    display: flex;
    font-weight: 500;
    font-size: 15px;
  }

  .wishlist > p > span{
    margin-right: 7px;
    margin-top: -1px; 
    font-size: 20px;
  }

  .wishlist > span{
    margin-top: 1px;
    font-size: 13px;
  }






  .secbox{
  width: 27%;
    margin-left: 20px;
    border-left:1px solid rgb(230, 230, 230);
    padding-left: 19px;
    padding-top: 15px;
  }

  .coupon > p{
    margin-bottom:13px;
    color: rgb(199, 0, 44);
    font-weight: 500;
    font-size: 12px;
  }
  
  .applyco{
    width: 100%;
    display:flex;
    justify-content: space-between;
    align-items: center;
  }

  .applyco > :nth-child(1){
    font-weight: 600;
    font-size: 14px;
    display:flex;
  }

  .applyco > :nth-child(1) span{
    margin-top: -3px;
    font-size: 21px;
    margin-right: 10px;
  }

  .applyco > :nth-child(2){
    color: #ec4c69;
    font-size: 12px;
    font-weight: 600;
    border-radius: 3px;
    border: 1px solid rgb(141, 60, 60);
    padding: 6px 15px;
  }

  .pricedet{
    margin-top: 20px;
    border-top: 1px solid rgb(230, 230, 230);
    padding-top: 20px;
  }

  .pricedet > p{
    font-weight: 600;
    color: #e20056;
    font-size: 11px;
    margin-bottom: 21px;
  }

  .faredetails{
    color: #534d4d;
    font-weight: 400;
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    font-size:13px;
  }

  .disc{
    color: #aaa5a5;
  }

  .coup{
    color: #90742e;

  }



  .knowmore{
    color: #ff0071;
    font-weight: bold;
    margin-left:5px;
  }

  .finalmrp{
    font-size: 14px;
    font-weight: bold;
    padding-top:14px;
    border-top: 1px solid rgb(230, 230, 230);

  }


  .pay{
    border-radius: 5px;
    margin-top: 20px;
    padding:10px 0px;
    display:flex;
    width : 100%;
    background-color: #ff006c;
    font-size: 14px;
    font-weight: bold;
    color: white;
    justify-content: space-around;

  }


  .pay:hover{
    background-color:rgb(203, 1, 87);
  }

  .pay:active{
    background-color:rgb(255, 82, 156);

  }


  .footer{
    position:sticky;
    bottom: 0px;
    background-color: white;
    font-size: 14px;
    font-weight: 500;
    align-items: center;
    border: 1px solid rgb(230,230,230);
    justify-content: space-evenly;
    width: 100%;
    display: flex;
    padding: 15px 0px;

  }

  .foticon{

    display: flex;
    justify-content: space-between;
    width: 42%;

  }

  @media(max-width: 1024px)
  {
    .container{
      flex-direction: column;
    }

    .firstbox{
      width: 100%;
      padding: 20px 5px 0px;
    }

    .addressbox{
      padding: 8px;
    }

    .address > :nth-child(1)
    {
      font-size: 10px;
      margin-bottom: 3px;
    }

    .address > :nth-child(2)
    {
      font-size: 8px;
    }

    .addchangeadress{
      font-size: 9px;
    }

    .offer{
      padding: 8px;
    }

    .offer > :nth-child(1)
    {
      font-size: 13px;
    }

    .offer > :nth-child(1) span
    {
      font-size: 15px;
      margin-right: 5px;
    }

    .offer > :nth-child(2)
    {
      margin-top: 3px;
      font-size: 9px;
    }

    .offer > :nth-child(3)
    {
      margin-top: 7px;
      font-size: 12px;
    }

    .itemselected{
      margin: 2px 0px;
      padding: 5px;
    }

    .itemselected input {
      width: 11px;
      margin-right: 6px;
    }

    .itemselected p{
      font-size: 10px;
      margin: 5px 0px;
    }

    .remove{
      font-size: 9px;
      padding-right: 6px;
    }

    .move{
      font-size: 9px;
      margin: 5px 0px;
      padding-left: 4px;
    }

    .secbox{
      width: 100%;
      margin-left: 0px;
      padding: 10px;
      padding-top: 15px;

    }

 
    .pay{
      margin: 0 auto;
      width: 50%;
    }





    .footer{
      padding: 0px;
      padding-bottom: 5px;
      flex-direction: column;
    }

    .foticon{
      width: 100%;
      padding: 5px 0px;
      justify-content: space-around;
    }

    .foticon img{
      height: 1%;
      width: 38px;
    }

    .footer a{
      font-size: 13px;
    }


  }

  }

  @media (max-width: 378px ){

    .container{
      flex-direction: column;
    }

    .firstbox{
      width: 100%;
      padding: 20px 5px 0px;
    }

    .addressbox{
      padding: 8px;
    }

    .address > :nth-child(1)
    {
      font-size: 10px;
      margin-bottom: 3px;
    }

    .address > :nth-child(2)
    {
      font-size: 8px;
    }

    .addchangeadress{
      font-size: 9px;
    }

    .offer{
      padding: 8px;
    }

    .offer > :nth-child(1)
    {
      font-size: 13px;
    }

    .offer > :nth-child(1) span
    {
      font-size: 15px;
      margin-right: 5px;
    }

    .offer > :nth-child(2)
    {
      margin-top: 3px;
      font-size: 9px;
    }

    .offer > :nth-child(3)
    {
      margin-top: 7px;
      font-size: 12px;
    }

    .itemselected{
      margin: 2px 0px;
      padding: 5px;
    }

    .itemselected input {
      width: 11px;
      margin-right: 6px;
    }

    .itemselected p{
      font-size: 10px;
      margin: 5px 0px;
    }

    .remove{
      font-size: 9px;
      padding-right: 6px;
    }

    .move{
      font-size: 9px;
      margin: 5px 0px;
      padding-left: 4px;
    }

    .secbox{
      width: 100%;
      margin-left: 0px;
      padding: 10px;
      padding-top: 15px;

    }

    .coupon > p{
      font-size: 10px;
      margin-bottom: 8px;
    }

    .applyco > :nth-child(1){
      font-size: 12px;
    }

    .applyco > :nth-child(1) span{
      font-size: 19px;
      margin-right: 5px;
    }

    .applyco > :nth-child(2){
      font-size:11px;
      padding: 4px 15px;
    }

    .pricedet{
      margin-top: 10px;
      padding-top: 14px;
    }

    .pricedet > p{
      margin-bottom: 13px;
    }

    .faredetails{
      padding: 0px 4px;
      margin-bottom: 10px;
      font-size: 11px;
    }

    .finalmrp{
      padding-top: 10px;
    }

    .pay{
      margin-top: 15px;
      margin-bottom: 10px;
    }





    .footer{
      padding: 0px;
      padding-bottom: 5px;
      flex-direction: column;
    }

    .foticon{
      width: 100%;
      padding: 5px 0px;
    }

    .foticon img{
      height: 10%;
      width: 10%;
    }

    .footer a{
      font-size: 13px;
    }


  }

 




  

  




`

export default Cart