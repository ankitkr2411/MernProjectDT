import React from 'react'
import styled from 'styled-components'
import loading from "../image/loading.gif"

const Loading = () => {
  return (
    <Wrapper>
    <div className='conatiner' >
            <img className='loadimg' src={loading} />
    </div>

    </Wrapper>
  )
}



const Wrapper= styled.section`

.conatiner{
  z-index: 100000;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: rgb(0,0,0,0.11);
  height: 100%;
    display:flex;
    justify-content: center;
    align-items:center;
}

img{
  opacity: 0.5;
  width: 30%;
}



`

export default Loading