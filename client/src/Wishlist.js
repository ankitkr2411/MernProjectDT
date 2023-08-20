import React, { useEffect } from 'react'
import { useFilterContext } from './context/filtercontext';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import Loading from './component/Loading';
import Emptywishlist from './component/Emptywishlist';
import { useState } from 'react';
import { useAccountContext } from './context/accountcontext';


const Wishlist = () => {

    const { wishlist, wishlist_Items, user_Data, delwishlist, setCart } = useAccountContext();
    const [loading,setloading] = useState(false);


    useEffect(() => {
      
        wishlist();
    }, [])

    const navigate = useNavigate(); 


    const delwish = async (id,colors,size) => {

      setloading(true);

        const res = await fetch("http://localhost:5000/delwish", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      withCredentials: true,
      body: JSON.stringify({
        "id": id,
        "colors": colors,
        "size": size
      })
    });

    const data = await res.json();

    if (res.status == 401) {
      setloading(false);
      navigate("/login");
    }

    else if (res.status == 200) {
      setloading(false);
      delwishlist(data);

    }

    else {
      setloading(false);
      alert("Something Went Wrong")
    }

}


const cartdatabase = async (id,colour,index,category,size) => {
  setloading(true);


    let cardprod = {

      id: id,
      colors: colour,
      index:index,
      size:size,
      category: category

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

    if (res.status == 401 || !data) {
      setloading(false);
      navigate("/login");
    }

    else if (res.status == 200) {
      setloading(false);
      setCart(data);
      delwish(id,colour,size);
    }

    else {
      setloading(false);
      alert("Something Went Wrong")
    }


  }




  if(wishlist_Items.length == 0)
  {
    return (
        <Emptywishlist />

    )
  }

  let link;


  let wishlistrev = [...wishlist_Items].reverse();

  window.scrollTo({ top: 0, left: 0 });

  let discount;
    return (
        <Wrapper>
        {loading?<Loading />:""}
        <div className='title'><span>My Wishlist</span> {wishlist_Items.length} items</div>
            <div className="productcount">
                {wishlistrev.map((currElem) => {
                  currElem.category === "saree"?link = `/saree/${currElem.id}/${currElem.index}`: currElem.category === "blouse"?link = `/blouse/${currElem.id}/${currElem.index}`:
                  link = `/lehanga/${currElem.id}/${currElem.index}`;
                  discount = Math.ceil(((currElem.mrp - currElem.price)/currElem.mrp)*100);
                    return (
                        <div className="productdiv">
                        <div className='cross' onClick={() => {delwish(currElem.id,currElem.color,currElem.size)}} ><RxCross2 /></div>
                            <NavLink className="product" to={`${link}`}>
                                <div><img src={currElem.image} alt="" />
                                </div>
                                <p className='name' >{currElem.name}</p>
                                <p className='desc' >{currElem.description}</p>
                                <p className='price' >
                                    <span>&#8377;</span>{currElem.price}
                                    {discount === 0?"":<><span>&#8377;<span>{currElem.mrp}</span>
                                    </span>
                                    <span> {discount}%</span></>}
                                    <span className='color' style={{backgroundColor:`${currElem.color}`}}></span>
                                    {currElem.category == "blouse" || currElem.category == "lehanga"?<span>Size: {currElem.size}</span>:""}
                                </p>
                            </NavLink>

                            <NavLink className='cart' onClick={()=>{ cartdatabase(currElem.id,currElem.color,currElem.index,currElem.category,currElem.size) }}>Add To Cart</NavLink>
                </div>
                    )                   
                })
                }
            </div>
            </Wrapper>

    )
}

const Wrapper = styled.section`

.title{
  font-weight: 300;
  margin-left: 42px;
  font-size: 18px;
  margin-top: 32px;
}

.title > span{
  color: #272727;
  font-weight: 600;
}

.productcount{
    padding: 29px 43px;
          margin-top:20px;
            width: 100%;
            display: grid;
            grid-template-columns:repeat(5,1fr);
            justify-content: space-around;
            grid-gap: 50px 40px;
        }

.productdiv{
    width: 90%;
            background-color: white;
            transition: all .1s;
            position:relative;
            overflow:hidden;
        }

        .productdiv:hover{
            box-shadow: 0px 0px 30px 1px rgba(0,0,0,0.3);
        }

        .cross{
            padding: 5px;
            height: 25px;
            border-radius: 20px;
            background-color: #ffffff73;
            font-size:15px;
            position:absolute;
            top:10px;
            right: 10px;
        }

        .cross:hover{
            cursor: pointer;
            background-color: white;

        }

       

        .product img{
            width: 100%;
        }

        .name
        { 
          color:#262b7c;
            font-weight: bold;
            padding: 5px 0px 0px 5px;
            margin-left: 5px;
        }

        .desc
        {
            padding-left: 5px;
            font-size: 12px;
            color: #886cb6;
            margin: -1px 0px 4px 5px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .price
        {
            padding-left: 5px;
            color: #000000;
            padding-top: 0px;
            margin-left: 5px;
            margin-bottom: 5px;
        }

        .price :nth-child(2)
        {
            font-weight:100;
            font-size: 14px;
            text-decoration: line-through;
            color: #a4a4a4;
            margin-left: 3px;
        }

        .price :nth-child(3)
        {
           
            font-size: 15px;
            color: #6da800;
        }

        .color{
            margin-left: 10px;
            border-radius: 20px;
            display: inline-block;
            width: 13px;
            height: 13px;
        }

        .price :nth-child(5)
        {
           margin-left: 6px;
            font-size: 14px;
            color: rgb(45,45,45);
        }

        .cart{
            display: block;
            border-radius: 5px;
            margin: 10px;
    font-weight: 500;
    font-size: 17px;
    padding: 10px 0px;
    text-align: center;
    color: white;
    background-color: #252525;
        }

        @media (max-width: 1024px)
        {
          .cross{
            top: 3px;
          }
          .productcount{
            padding:29px 5px;
            grid-template-columns: repeat(4,1fr);
          }

        }

        @media (max-width: 768px)
        {
          .productcount{
            grid-template-columns: repeat(3,1fr);
          }
        }

        @media (max-width: 578px ){
          .title{
            margin-left: 12px;
            margin-top: 54px;
            font-size: 16px;
          }

          .productcount{
            padding: 0px 5px;
            grid-template-columns: repeat(2,1fr);
            gap: 25px 6px;
          }

          .productdiv{
            width: 100%;
          }

          .cross{
            padding: 4px;
            height: 21px;
            top: 6px;
            right: 5px;
            font-size: 13px;
          }

          .name{
            padding: 0px;
            font-size: 14px;
          }

          .desc{
            padding-left: 0px;
            font-size: 10px;
          }

          .price{
            padding-left: 0px;
            font-size: 14px;
          }

          .price :nth-child(2){
            font-size: 12px;
          }

          .price :nth-child(3){
            font-size: 13px;
          }

          .cart{
            padding: 6px 0px;
            margin: 9px 6px;
          }






        }



`;

export default Wishlist