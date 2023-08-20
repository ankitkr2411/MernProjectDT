import React from 'react'
import { NavLink } from 'react-router-dom'
import emptycart from"../image/emptycart.png"
import styled from 'styled-components'

const Emptycart = () => {
  return (
    <Wrapper>
        <div className='container'>

<div className='image'>
    <img src={emptycart} />
</div>

<p className='head'>Hey, it feels so light!</p>
<p className='desc'>There is nothing in you bag.Let's add some items.</p>
<NavLink className="wish" to="/wishlist" >ADD ITEMS FROM WISHLIST</NavLink>


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
    width: 24%;
    margin-bottom: 21px;
}

img{
    opacity: 0.5;
    width: 100%;
}


.head{
    font-weight: 600;
    font-size:22px;
    color: #3e3d3d;
    margin-bottom: 5px;
}


.desc{
    font-size:13px;
    font-weight: 300;
    color:#908686;
}

.wish{
    border-radius:4px;
    font-size:13px;
    font-weight: 600;
    color: #ff005e;
    padding: 12px;
    margin-top: 24px;
    border: 1px solid #ff005c;
}



.wish:hover{
    color:white;
    background-color:#ff005e;
}

.wish:active{
    color:white;
    background-color:rgb(163,0,60);
}





`

export default Emptycart