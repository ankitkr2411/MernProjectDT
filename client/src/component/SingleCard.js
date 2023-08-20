import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'

const SingleCard = (props) => {

    let ind = props.index;
    const { _id } = props;

    if(ind > -1)
    {
    let discount = Math.ceil(((props.mrp - props.colors[ind].price) / props.mrp) * 100);
    

    let link;

    switch (props.product) {
        case "Saree":
            {
                link = `/saree/${_id}/${ind}`;
                break;
            }

            case "Blouse":
                {
                    link = `/blouse/${_id}/${ind}`;
                    break;
                }

                case "Lehanga":
            {
                link = `/lehanga/${_id}/${ind}`;
                break;
            }
    }

    return (
        <>
            <Wrapper>
                <div className="productdiv">

                    <NavLink className="product" to={`${link}`}>

                        {props.hover ? <div className='prohover'></div> : ""}

                        <div><img src={props.colors[ind].image[0]} alt="" />
                        </div>
                        <p className='name' >{props.name}</p>
                        <p className='desc' >{props.colors[ind].description}</p>
                        <p className='price' >
                            <span>&#8377;</span>{props.colors[ind].price}
                            {discount == 0?"":<><span>&#8377;<span>{props.mrp}</span>
                            </span>
                            <span> {discount}%</span></>}
                        </p>

                    </NavLink>
                </div>

            </Wrapper>
        </>
    )
    }
}

const Wrapper = styled.section`

.productdiv{
            background-color: white;
            transition: all .1s;
            padding-bottom: 10px;
            position:relative;
            overflow:hidden;
        }

        .productdiv:hover{
            box-shadow: 0px 0px 30px 1px rgba(0,0,0,0.3);
        }

.prohover{
  width:100%;
  height:100%;
  background-color: rgb(53, 53, 53, 0.6);
  position: absolute;
  left:200px;
  transition: left 0.2s;
  
}

.productdiv:hover .prohover{
  filter: opacity(1);
  left:0px;
  

}



       

        .product img{
            width: 100%;
        }

        .name
        {   color:#262b7c;
            font-weight: bold;
            padding: 5px 0px 0px 0px;
            margin-left: 5px;
        }

        .desc
        {
            font-size: 12px;
            color: #886cb6;
            margin: -1px 0px 4px 5px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .price
        {
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



`;

export default SingleCard