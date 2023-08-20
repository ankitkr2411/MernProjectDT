import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import emptywish from "../image/emptywish.jpg"

const Emptywishlist = () => {
  return (
    <Wrapper>
    <div className='container'>

<div className='image'>
<img src={emptywish} />
</div>

<p className='head'>Your wishlist is empty!</p>
<p className='desc'>Explore more and shortlist some items.</p>
<NavLink className="wish" to="/" >START SHOPPING</NavLink>


</div>
</Wrapper>
  )
}


const Wrapper = styled.section`

.container{
    width: 100%;
    position: absolute;
    top: 0px;
    height: 100vh;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.image{
    width: 18%;
    margin-bottom: 21px;
}

img{
    opacity: 0.5;
    width: 100%;
}


.head{
    word-spacing: 1px;
    letter-spacing: 1px;
    font-weight: 600;
    font-size:22px;
    color: #3e3d3d;
    margin-bottom: 5px;
}


.desc{
    word-spacing: 1px;
    letter-spacing: 2px;
    font-size:15px;
    font-weight: 300;
    color:#908686;
}

.wish{
    background-color:#ff005e;
    text-align: center;
    width: 210px;
    border-radius:4px;
    font-size:13px;
    font-weight: 600;
    color: white;
    padding: 12px;
    margin-top: 24px;
    border: 1px solid #ff005c;
}



.wish:hover{
    color:white;
    background-color:rgb(163,0,60);
}

.wish:active{
    color:white;
    background-color:rgb(100,0,37);
}

`

export default Emptywishlist