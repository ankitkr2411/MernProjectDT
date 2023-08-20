import React, { useState } from 'react'
import styled from 'styled-components'


const Message = (props) => {





    return (
        <Wrapper>
            <div className='containerbox'>
                <div className='mainbox'>

                    <div className='box'>
                            <p>{props.message}</p>
                            <input className='submit' type="submit" value="Close" onClick={()=>{props.setmess(false)}} />

                    </div>

                </div>
            </div>


        </Wrapper>)


}

const Wrapper = styled.section`


.containerbox{
background-color: #0000004a;
  display: flex;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0px;
    left:0px;
    z-index:10000;
    align-items: center;
    justify-content: center;
    z-index: 999999;

}

.mainbox{
  box-shadow: 0px 0px 15px -7px black;
  height: 16%;
    justify-content: center;
    display: flex;
    align-items: center;
    background-color: white;
    width: 20%;
    border: 6px solid rgb(178, 32, 105);
    border-radius: 20px;

}


.box{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    
}

p{
    font-size: 17px;
    color: rgb(178,32,105);
    font-weight: 500;
}


.submit{
  border-radius: 4px;
    margin: 20px auto 0px auto;
    background-color: #b22069;
    color: white;
    font-size: 17px;
    font-weight: 500;
    padding: 2px 7px;
}

.submit:hover{
  cursor:pointer;
  background-color:rgb(133,40,81);
}



@media (max-width: 720px ){

    .mainbox{
        width: 70%;
    }

 

}












`

export default Message