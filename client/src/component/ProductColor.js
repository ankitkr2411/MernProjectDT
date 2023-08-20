import React, { useState } from 'react'
import styled from 'styled-components';



const ProductColor = (props) => {

    const [colour, setColour] = useState("");
    const [colorborder, setcolorborder] = useState("none");




    return (
        <Wrapper  border={colorborder}>
            <div className='singlecolordiv' onClick={() => { setColour(props.color); setcolorborder("2px solid black") }}>
                <div className='color' style={{ backgroundColor: `${props.color}` }} ></div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`

.singlecolordiv{
  padding:1px;
  width:20px;
  height:20px;
  margin-right:5px;
  border-radius:50%;
  border: ${(props) => props.border};
}

.color{
  width:100%x;
  height:100%;
  border-radius: 50%;
}

.singlecolordiv:hover{
  cursor: pointer;
  border: 2px solid black;
}


`

export default ProductColor