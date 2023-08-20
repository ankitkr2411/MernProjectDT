import React, { useEffect, useMemo, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useFilterContext } from './context/filtercontext'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BsHeart } from "react-icons/bs";
import {IoIosArrowDown} from "react-icons/io"
import { BiDetail } from "react-icons/bi"
import {AiOutlineInfoCircle,AiOutlineUser} from "react-icons/ai"
import {HiArrowsRightLeft} from "react-icons/hi2"
import { GoVerified } from "react-icons/go";
import Loading  from "./component/Loading";
import Login from './Login';
import Signin from './Signin';
import Message from './component/Message';
import { useAccountContext } from './context/accountcontext';
import { useProductContext } from './context/productcontext';

const SingleProductBlouse = () => {
  const navigate = useNavigate();

  
  //Extracted id and index value from URL. Id is productId and Index is current colour index of product 
  const { id,index } = useParams();

  let { user_Data, setCart,addwish, is_Login } = useAccountContext();

  let {single_Product, singleProduct} = useProductContext();
  
  let colour;

  //According to this variable login window pop up
  const [login,setlogin] = useState(false);

  //According to this variable register window pop up
  const [register,setregister] = useState(false);

  //This store index of particular colour of Product data, so page renders whenever user want another colour to see
  const [ind,setind] = useState(index);

  //This store index of image to be shown on main.
  const [imgind,setimgind] = useState(0);

  //This store size selected by user
  const [size,setsize] = useState("");

  //According to its value message window pop up on screen
  const [mess,setmess] = useState(false);

  //This store message to be shown on screen 
  const [message, setmessage] = useState("");


  //This will send id and category of product whenever page loads
  useEffect(() => {

      singleProduct(id,"Blouse");
    
  }, []);


  //This will send product to be added to database
   const cartdatabase = async () => {

    //Data to be saved in user cart field in database
    let cardprod = {

      id: id,
      colors: colour,
      index: ind,
      size: size,
      category: "blouse"

    };


    const res = await fetch("http://localhost:5000/addcart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      withCredentials: true,
      body: JSON.stringify(cardprod)
    })

    const data = await res.json();

    //If 401 then user not authenticated or login expired
    if (res.status == 401 || !data) {
      //set login to true, login window pop up 
      setlogin(true);
    }

    else if (res.status == 200) {

      //Data recieved from server are sent to be saved in user_Data key
      setCart(data);
      setmessage("Added to Cart");
      setmess(true);
    }

    else {
      alert("Something Went Wrong")
    }


  }



  const addtocart = () => {
    //If no colour selected message pop up
    if(colour == "")
    {
      setmessage("Select Colour");
      setmess(true);
    }

    else if(size == "")
    {
      setmessage("Select Size");
      setmess(true);
    }

    else{
       cartdatabase();

    }
  }



  const addwishlist = async () => {

    if(colour == "")
    {
      setmessage("Select Colour");
      setmess(true);
    }

    else if(size == "")
    {
      setmessage("Select Size");
      setmess(true);
    }

    else{


        let wishprod = {

          id: id,
          color: colour,
          index: ind,
          size: size,
          category: "blouse"

        };
    
    
        const res = await fetch("http://localhost:5000/addtowishlist", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include",
          withCredentials: true,
          body: JSON.stringify(wishprod)
        })
    
        const data = await res.json();
    
        if (res.status == 401 || !data) {
          setlogin(true);
        }
    
        else if (res.status == 200) {
           addwish(data.wishlist);
           setmessage("Wishlisted");
      setmess(true);
        }
    
        else {
          alert("Something Went Wrong")
        }
    
    
      
      

    }
    
  }

  



//If Single Product data still not loaded then return Loading.

  if (single_Product.length == 0) {
    return (<Loading />);
  }

  const { name, description, mrp, colors } = single_Product[0];

colour = colors[ind].color;


  let wish = false;

  //if user logged all data laoded then only run this
  //This is to check if the current product is wishlisted or not
  if(is_Login) {  

  if(user_Data.wishlist.length != 0)
  {
    //Checking if there any product of same id,color and size in wishlist
    const wishcheck = user_Data.wishlist.filter((currElem) => {
      return currElem.id == id && currElem.color == colour && currElem.size == size
    })

    if(wishcheck.length > 0)
    {
      wish = true;
    }

  }
}

window.scrollTo({ top: 0, left: 0 });


let discount = Math.ceil(((mrp - colors[ind].price)/mrp)*100);


    return (
      
      <>
        <Login show = {login} setlogin = {setlogin} setregister = {setregister} />
        <Signin show = {register} setlogin = {setlogin} setregister = {setregister} />
        {mess?<Message message={message} setmess={setmess} />:""}

        <Wrapper border={ind} image={imgind} size={size} >
          <div className="content" >
            <div className="productimage" >
              <div className="differentimages">
               
              {colors[ind].image.map((currElem,index) => { 
                  return <img id={`i${index}`}  src={currElem} onClick={()=>{setimgind(index)}} />
                })}
              </div>

              <div className="mainimage" >

               <img src={colors[ind].image[imgind]} />
                
              </div>
            </div>

            <div className="productdetails" >
              <p className="name" >{name}</p>

              <p className="desc" >{colors[ind].description}</p>

              <p className='ratingbox' ><span className='rating'
              >3.7 &#9733;</span>
                <span className='ratingbased' >Based on 111 Rating</span>
              </p>

              <p><span className='price' >&#8377;{colors[ind].price}</span> {discount === 0?"":<><span className='discount'>{discount}% off</span></>}</p>

              <p className='mrpbox' >MRP
              {discount === 0?<span className='mrp'>&#8377;{mrp}</span>:<span className='mrp' style={{textDecoration:"line-through"}}>&#8377;{mrp}</span>} <span className='mrptxt'
                >Inclusive all of taxes</span>
              </p>

              <div className='selectcol'>Select Color</div>
              <div className='colortxt'>{colors[ind].color}</div>

              <div className='colourbox'>

                {colors.map((curElem,index) => {
                  return <div className="singlecolordiv" onClick={()=>{setind(index)}} >
                  <div id={`a${index}`} className='cross'><GoVerified /></div>
                    <img src={curElem.image[0]}/>
                  </div>
                })}

              </div>

              <div className='colourbox'>
              
                {!colors[ind].sizes?"":colors[ind].sizes.map((curElem,index) => {
                  return <div id={`s${curElem.size}`} className="singlesizediv" onClick={()=>{setsize(curElem.size)}} >
                    <div>{curElem.size}</div>
                  </div>
                })}
                

              </div>

              <div className='wishbuy' >

              { wish ? <div className="wishlisted">
                  <div>
                    <span>Wishlisted</span>
                  </div>
                </div> : 
                
                <div className="wishlist" onClick={() => { addwishlist() }}>
                  <div>
                    <span><BsHeart /></span>
                    <span>Add to Wishlist</span>
                  </div>
                </div>
              }

                <NavLink className="buynow" href="" onClick={() => { addtocart() }} >
                  <div>
                  Add to Cart
                  </div>
                </NavLink>

              </div>

              <div className='service'
              >

                <div className="serviconbox" >
                  <img className='serviconimg'
                    src="https://images-static.nykaa.com/nykdesignstudio-images/pub/media/wysiwyg/COD.png" alt=""
                  />
                  <p className='servtxt codtxt'  >COD <b>available</b></p>
                  <p className='servfoot' >Know More</p>
                </div>

                <div className="serviconbox"
                >
                  <img className='serviconimg'
                    src="https://images-static.nykaa.com/nykdesignstudio-images/pub/media/wysiwyg/Return.png" alt=""
                  />
                  <p className='servtxt' ><b>7 days</b> return and exchange</p>

                  <p className='servfoot' >Know More</p>
                </div>

                <div className="serviconbox"
                >
                  <img className='serviconimg'
                    src="https://images-static.nykaa.com/nykdesignstudio-images/pub/media/wysiwyg/Free_Delivery.png"
                    alt="" />
                  <p className='servtxt' >Usually ships <br /> in <b>1 day</b></p>
                  <p className='servfoot' >Know More</p>
                </div>

              </div>

              <div className='infobox' >
                <p className='infotxt' >Product Information</p>
                <ul>
                  <li className='infolist' >
                    <div>
                      <p className='listhead' ><span><BiDetail/></span>Product Deatils</p>
                      <p className='listfoot' >Care instruction, Pack contains</p>
                    </div>
                    <div className='infodrop' >
                      <IoIosArrowDown />
                    </div>
                  </li>

                  <li className='infolist' >
                    <div>
                      <p className='listhead' ><span><AiOutlineInfoCircle /></span>Know your product</p>
                      <p className='listfoot' >Description</p>
                    </div>
                    <div className='infodrop' >
                    <IoIosArrowDown />
                    </div>
                  </li>

                  <li className='infolist' >
                    <div>
                      <p className='listhead' ><span><AiOutlineUser/></span>Vendor Details</p>
                      <p className='listfoot' >Manufacturer details, Country of origin</p>
                    </div>
                    <div className='infodrop' >
                      <IoIosArrowDown />
                    </div>
                  </li>

                  <li className='infolist' >
                    <div>
                      <p className='listhead' ><span><HiArrowsRightLeft/></span>Return and exchange policy</p>
                      <p className='listfoot' >Know more about return and exchange</p>
                    </div>
                    <div className='infodrop' >
                      <IoIosArrowDown />
                    </div>
                  </li>

                  
                </ul>
              </div>

              <p className='reviewhead' >Costumer Review</p>
              <p className='star' >&#9733; &#9733; &#9733; <i
                className="fa fa-star-half-full"></i> &#9734;</p>
              <p className='ratingtxt' ><span>3.7</span><span className='ratingtxt5' >/5</span></p>
              <p className='basedontxt' >Based on 111 ratings</p>
              <p className='mostreviewhead' >Most Useful Review</p>
              <p className='readallrev' >
                Read all reviews </p>

              <div className='aboutbox' >
                <p className='abouthead' >About HOUSE OF BEGUM</p>
                <div className='aboutimgbox' >
                  <img className='aboutimg' src="https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/category/tr:w-176,/House_of_Begum.jpg"
                    alt="" />

                  <p className='abouttxt' >House of Begum’s is proud to be a
                    handwoven brand that puts India together under one roof.
                    HOB saree embodies diverse aspects of beauty, craftsmanship, and consciousness.</p>
                </div>
              </div>


            </div>
          </div>
        </Wrapper>
      </>
    )


  


}



const Wrapper = styled.section`



.content {
    display: flex;
    padding: 30px 10% 0px 10%;
    width: 100%;
}


.productimage {
    display: flex;
    align-self: flex-start;
    position: sticky;
    top: 105px;
}

.differentimages {
  height: 80vh;
  overflow-y: auto;
  width: 24%;
    display: flex;
    flex-direction: column;
}

.differentimages img{
  margin-bottom: 10px;
   width: 100%;
}

#${(props) => "i"+props.image} {
  border-radius: 4px;
  padding-bottom: 3px;
  border-bottom: 4px solid #cc0000;
}



.smallimage {
    width: 80px;
    margin-bottom: 10px;
}

.mainimage {
    margin-left: 10px;
}

.mainimage img {
    width: 100%;
}

.productdetails {
    padding-left: 50px;
    padding-top: 10px;
}

.name {
    font-weight: bold;
    font-size: 25px;
}

.desc {
  letter-spacing: 2px;
  font-weight: 400;
    margin: 3px 0px 18px 0px;
    font-size: 15px;
}

.ratingbox {
    margin-bottom: 35px;
}

.rating {
    border: 1px solid rgb(209, 209, 209);
    font-size: 17px;
    font-weight: bold;
    padding: 5px 9px;
}

.ratingbased {
    margin-left: 14px;
    font-size: 17px;
    font-weight: 400;
    color: rgb(137, 137, 137);
}

.price {
    font-weight: 500;
    font-size: 25px;
}

.discount {
    margin-left: 5px;
    font-size: 20px;
    color: rgb(70, 123, 41);
}

.mrpbox {
    margin: 5px 0px 10px 0px;
    font-weight: 300;
    font-size: 17px;
    color: rgb(124,123,123);
}

.mrp {
  margin-left:5px;
    text-decoration: line-through;
}

.mrptxt {
    margin-left: 9px;
    font-size: 16px;
}

.selectcol{
  margin: 20px 0px 2px 0px;
  border-top: 1px solid rgb(109,109,109);
  padding-top: 10px;
  font-weight: 500;
  font-size: 21px;
}

.colortxt{
  font-weight: 400;
  font-size: 16px;
}

.colourbox{
  padding: 20px 0px;
  border-bottom: 1px solid rgb(109,109,109);
  display:flex;
}

.singlecolordiv{
  width:73px;
  margin-right:10px;
  position: relative;
}

.singlecolordiv img{
  width: 100%;
}

.cross{
  color: white;
  right:2px;
  top:3px;
  position: absolute;
  display:none;
}


#${(props) => "a"+props.border} {
  display:block;
}



.color{
  width:100%;
  height:100%;
  border-radius: 50%;
}

.singlecolordiv:hover{
  cursor: pointer;
  border-bottom: 2px solid black;
}

.singlesizediv{
  text-align: center;
  padding: 10px;
  border-radius: 30px;
  border: 1px solid black;
  width:42px;
  margin-right:17px;
  position: relative;
}

#${(props) => "s"+props.size} {
    background-color: black;
  color: white;
}

.singlesizediv:hover{
  cursor: pointer;
  background-color: black;
  color: white;
}

.wishbuy {
    margin-top: 40px;
    display: flex;
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 40px;
    border-bottom: 1px solid rgb(211,204,204);
}

.buynow {
  display: flex;
  justify-content: center;
  align-items: center;
    border: 1px solid rgb(159, 159, 159);
    font-weight: 500;
    width: 70%;
    margin-left: 10px;
    padding: 10px 0px;
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
}

.buynow:hover {
    background-color: rgb(255, 0, 0);
    color: rgb(255, 255, 255);
}

.buynow:active {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
}

.wishlist {
    border: 1px solid rgb(159, 159, 159);
    text-align: center;
    width: 43%;
    padding: 10px 0px;
    background-color: white;
    color: black;
}

.wishlist:hover {
  cursor:pointer;
    background-color: rgb(255, 0, 0);
    color: white;
}

.wishlist:active {
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
}


.wishlisted {
  letter-spacing: 1px;
    border: 1px solid rgb(159, 159, 159);
    text-align: center;
    width: 43%;
    padding: 10px 0px;
    background-color: red;
    color: white;
}

.wishlist > div{
  font-size: 17px;
  letter-spacing: 1px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wishlist > div :nth-child(1){
  margin-top: 3px;
    margin-right: 5px;
    font-size: 20px;
}


.service {
    display: flex;
    margin: 20px 0px 0px 0px;
    padding-bottom: 30px;
    border-bottom: 1px solid rgb(211,204,204);
}

.serviconbox {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 25%;
}

.serviconimg {
    width: 44px;
    display: block;
}

.servtxt {
  font-weight: 300;
    margin-bottom: 30px;
}

.codtxt{
  margin-bottom: 50px;
}

.servfoot {
  font-weight: 500;
    color: #ff5353;
}

.infobox {
    margin: 30px 0px 0px 0px;
}


.infotxt {
    font-weight: 500;
    font-size: 22px;
}

.infolist {
    display: flex;
    justify-content: space-between;
    padding: 20px 0px 15px 10px;
    border-bottom: 1px solid rgb(208, 208, 208);
}

.listhead {
  display: flex;
  align-items: center;
    font-size: 17px;
    font-weight: 500;

}

.listhead > span{
  margin-top: 3px;
  margin-right: 10px;
  font-size: 25px;
}

.listfoot {
  margin-left: 33px;
  font-weight: 300;
    font-size: 17px;
}

.infodrop{
  font-size: 21px;
  display: flex;
  align-items:center;
}

.reviewhead {
    margin-top: 30px;
    font-size: 25px;
    font-weight: 500;
}

.star {
    margin: 4px 0px 5px 0px;
    font-size: 25px;
}

.ratingtxt {
  font-weight: 500;
    font-size: 30px;
}

.ratingtxt5 {
    color: #9b9b9b;
}

.basedontxt {
    margin: 5px 0px 20px 0px;
    color: #585858;
}

.mostreviewhead {
    font-size: 23px;
    font-weight: 500;
}

.readallrev {
    margin-top: 50px;
    margin-bottom: 40px;
    border: 1px solid rgb(168, 168, 168);
    font-size: 19px;
    padding: 8px 15px;
    font-weight: 500;
    background-color: black;
    color: white;
}

.aboutbox {
    margin-top: 30px;
    border-top: 1px solid rgb(149, 149, 149);
    padding: 30px 0px 10px 0px;
}

.abouthead {
    font-size: 20px;
    font-weight: bold;
}


.aboutimgbox {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
}

.aboutimg {
    width: 20%;
    border: 1px solid rgb(160, 160, 160);
}

.abouttxt {
    margin-left: 20px;
    font-size: 15px;
    line-height: 25px;
}

@media (max-width: 1024px){
  .name{
  font-size: 15px;
}

.desc{
  font-size: 10px;
}

.ratingbox{
  margin-bottom: 22px;
}

.rating{
  font-size: 12px;
  padding: 3px 7px;
}

.ratingbased{
  font-size: 13px;
}

.price{
  font-size: 21px;
}

.discount{
  font-size: 18px;
}

.mrpbox{
  font-size: 14px;
}

.colourbox{
  padding: 10px 0px;
}

.singlesizediv{
  padding: 4px;
  width: 43px;
}

.wishbuy{
  margin-top: 24px;
  padding-bottom: 28px;
  flex-direction: column;

}

.wishlist{
  width: 100%;
  padding: 5px 0px;
  margin-bottom: 10px;
}

.wishlisted{
  width: 100%;
}

.buynow{
  margin: 0px;
  width: 100%;
}

.service{
  font-size: 11px;
  justify-content: space-around;
  padding-bottom: 14px;
}

.serviconbox{
  width: 26%;
}

.codtxt{
  margin-bottom: 27px;
}

.servtxt{
  margin-bottom: 14px;
}

.infobox{
  margin: 17px 0px 0px;
}

.infotxt{
  font-size: 20px;
}

.infolist{
  padding: 13px 0px 15px 4px;
}

.listhead{
  font-size: 17px;
}

.listhead > span{
  font-size: 22px;
}

.listfoot{
  font-size: 13px;
}

.reviewhead{
  margin-top: 21px;
  font-size: 19px;
}

.star{
  margin: 0px;
  font-size: 20px;
}

.basedontxt{
  font-size: 14px;
}

.mostreviewhead{
  font-size: 18px;
}

.readallrev{
  font-size: 16px;
  padding: 7px 10px;
  margin-top: 45px;
  margin-bottom: 18px;
}

.aboutbox{
  margin: 0px;
  padding-top: 21px;
}

.abouthead{
  font-size: 17px;
}

.aboutimgbox{
  margin-top: 13px;
}

.abouttxt{
  margin-left: 16px;
  font-size: 13px;
  line-height: 17px;
}
}


@media (max-width: 768px)
{
  .content{
  padding: 0px;
  flex-direction: column;
}

.productimage{
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  position: initial;
}

.differentimages{
  height: initial;
  width: 100%;
  justify-content: center;
  flex-direction: row;
  padding-bottom: 10px;
}

.differentimages img{
  margin-bottom: 0px;
  width: 13%;
  margin: 5px;

}


#${(props) => "i" + props.image} {
  border-radius: 2px;
  padding-bottom: 3px;
  border-bottom: 2px solid rgb(204, 0, 0);
}

.mainimage{
  margin: 0px;
}

.productdetails{
  padding: 10px 10px;
}


.wishbuy{
  justify-content: center;
  align-items: center;
}

.wishlist{
  width: 80%;
}

.buynow{
  width: 80%;
}

.aboutimg{
  width: 10%;
}



}





@media (max-width: 378px ){

.content{
  padding: 0px;
  flex-direction: column;
}

.productimage{
  flex-direction: column-reverse;
  position: initial;
}

.differentimages{
  height: initial;
  width: 100%;
  justify-content: center;
  flex-direction: row;
  padding-bottom:10px;
}

.differentimages img{
  margin-bottom: 0px;
  width: 13%;
  margin: 5px;
}


#${(props) => "i" + props.image} {
  border-radius: 2px;
  padding-bottom: 3px;
  border-bottom: 2px solid rgb(204, 0, 0);
}

.mainimage{
  margin: 0px;
  width: 100%;
}

.productdetails{
  padding: 10px 10px;
}

.name{
  font-size: 15px;
}

.desc{
  font-size: 10px;
}

.ratingbox{
  margin-bottom: 22px;
}

.rating{
  font-size: 12px;
  padding: 3px 7px;
}

.ratingbased{
  font-size: 13px;
}

.price{
  font-size: 21px;
}

.discount{
  font-size: 18px;
}

.mrpbox{
  font-size: 14px;
}

.colourbox{
  padding: 10px 0px;
}

.singlesizediv{
  padding: 4px;
  width: 43px;
}

.wishbuy{
  margin-top: 24px;
  padding-bottom: 28px;
  flex-direction: column;

}

.wishlist{
  width: 100%;
  padding: 5px 0px;
  margin-bottom: 10px;
}

.wishlisted{
  width: 100%;
}

.buynow{
  margin: 0px;
  width: 100%;
}

.service{
  font-size: 11px;
  justify-content: space-around;
  padding-bottom: 14px;
}

.serviconbox{
  width: 26%;
}

.codtxt{
  margin-bottom: 27px;
}

.servtxt{
  margin-bottom: 14px;
}

.infobox{
  margin: 17px 0px 0px;
}

.infotxt{
  font-size: 20px;
}

.infolist{
  padding: 13px 0px 15px 4px;
}

.listhead{
  font-size: 17px;
}

.listhead > span{
  font-size: 22px;
}

.listfoot{
  font-size: 13px;
}

.reviewhead{
  margin-top: 21px;
  font-size: 19px;
}

.star{
  margin: 0px;
  font-size: 20px;
}

.basedontxt{
  font-size: 14px;
}

.mostreviewhead{
  font-size: 18px;
}

.readallrev{
  font-size: 16px;
  padding: 7px 10px;
  margin-top: 45px;
  margin-bottom: 18px;
}

.aboutbox{
  margin: 0px;
  padding-top: 21px;
}

.abouthead{
  font-size: 17px;
}

.aboutimgbox{
  margin-top: 13px;
}

.abouttxt{
  margin-left: 16px;
  font-size: 13px;
  line-height: 17px;
}




}

`;

export default SingleProductBlouse