import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from './context/filtercontext';

import Ordercard from './component/Ordercard';
import Loading  from "./component/Loading";
import { useAccountContext } from './context/accountcontext';

const Order = () => {

  const { user_Data } = useAccountContext();



  let order;

  window.scrollTo({ top: 0, left: 0 });

  if(Object.keys(user_Data).length != 0)
  {
    order = [...user_Data.order].reverse();
    return (
      <Wrapper>
        <div className='container' >
        
  
          <div className='filterdiv'>
            <div className='filtertxt'>Filter</div>
            <div className='statustxt'>ORDER STATUS</div>
            <ul>
              <li><input type='checkbox' /> On the way</li>
              <li><input type='checkbox' /> Delivered</li>
              <li><input type='checkbox' /> Cancelled</li>
              <li><input type='checkbox' /> Returned</li>
            </ul>
  
            <div className='timetxt'>ORDER TIME</div>
            <ul>
              <li><input type='checkbox' /> Last 30 days</li>
              <li><input type='checkbox' /> 2022</li>
              <li><input type='checkbox' /> 2021</li>
              <li><input type='checkbox' /> 2020</li>
              <li><input type='checkbox' /> 2019</li>
              <li><input type='checkbox' /> Older</li>
            </ul>
   
  
          </div>
  
          <div className='productdiv'>
  
            <input className='search' type='text' placeholder='Serch your orders here' />
  
            {
              order.map((currElem) =>{
               return <Ordercard order = {currElem} />
              })
            }
  
          </div>
        </div>
      </Wrapper>
    )

  }

  else{
    return <Loading />
  }

 




  
}

const Wrapper = styled.section`

.container{
  display: flex;
  padding-top:30px;
  justify-content:center;
  width:100%;
}

.filterdiv{
  position: fixed;
  left:6%;
  display:flex;
  flex-direction:column;
  background-color: white;
  width: 14%;
  padding: 10px 0px 10px 10px;
  border-right:1px solid rgb(230,230,230);
}

.filtertxt{
  color: #ff004e;
  font-weight: 500;
  font-size: 21px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom:1px solid rgb(230,230,230);
}

.statustxt{
  font-size: 14px;
  font-weight: 400;
  padding: 5px 0px 5px 0px;
}

ul{
  padding-bottom: 7px;
  border-bottom: 1px solid rgb(230,230,230);
}

li{
  font-size:13px;
  font-weight:300;
  display:flex;
  align-items: center;
  padding:10px 0px 10px 10px;
}

input{
  width: 14px;
  height: 14px;
  margin-right: 5px;
}


.timetxt{
  font-size: 14px;
  font-weight: 400;
  padding: 20px 0px 5px 0px;

}

.productdiv{
  display: flex;
  flex-direction: column;
  padding:0px 20px;
  width:60%;
  margin-left:10px;
}

.search{
  border-radius: 11px;
  box-shadow: 0px 0px 7px -5px black;
  background-colour:white;
  border:none;
  font-size: 17px;
  width:100%;
  height:39px;
  padding: 0px 17px;
  margin-bottom: 10px;
}

.order{
  broder-radius: 9px;
  box-shadow: 0px 0px 7px -4px black;
  display:flex;
  flex-direction:column;
  margin: 10px 0px;
  padding: 10px 10px;
  background-color:rgb(255 0 155 / 5%);
  margin-bottom: 40px;
}

.cancelled{
  color: red;
  font-weight: bold;
  font-size: 17px;
}

.odidtxnid{
  font-size:15px;
  padding: 7px 0px;
  display:flex;
  color: #a6a6a6;
}

.odidtxnid :nth-child(2){
  margin-left: auto;
}

.product{
  background-color: white;
  display: flex;
  flex-direction: column;
  padding:5px;

}

.deliverydetail{
  border-top: 25px solid white;
  padding: 0px 13px;
  padding-top: 6px;
  display:flex;
  margin-bottom:4px;
  font-size: 14px;
}

.deliverydetail > :nth-child(1){
  display: flex;
  align-items: center;

}

.deliverydetail > :nth-child(1) > :nth-child(1){
  font-size: 21px;
  margin-right: 5px;
}

.deliverydetail > :nth-child(1) > :nth-child(2){
  color:#9e5454;
  margin-right: 5px;
}

.deliverydetail > :nth-child(2){
    margin-left: auto;

}

.proddetails{
  border-radius:9px;
  background-color:rgb(255,244,252);
  display:flex;
  padding:10px;
}



.image{
  width:80px;
}

.image img{
  width: 100%;
}

.prodname{
  margin-left:5px;
  padding: 5px;
}

.prodname :nth-child(2)
{
  margin: -1px 0px;
  font-size: 14px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.prodname span{
  margin-right: 10px;
  margin-bottom: 5px;
  font-size: 13px;
}

.prodname :nth-child(6){
  font-size: 17px;
  margin: 3px 0px;
}

.canceldiv{
  margin: 5px 10px;
  margin-bottom: 20px;
  display:flex;
}

.cancel{
  font-size: 13px;
  padding: 4px 8px;
  background-color: #ff8989;
  color: white;
  margin-left: auto;
  border-radius: 20px;
  box-shadow: 3px 2px 10px -4px white inset; 
}

.cancel:hover{
  cursor: pointer;
  background-color: rgb(255, 94, 94);
}

.cancel:active{
  background-color: #ff8989;
}

@media (max-width: 1024px)
{
  .filterdiv{
    width: 21%;
  }

  .productdiv{
    margin-left: 123px;
  }

  .prodname :nth-child(2){
    width:310px;
  }







}


@media (max-width: 768px ){

  .container{
    flex-direction: column;
    padding-top: 0px;
  }

  .filterdiv{
    position: initial;
    width: 100%;  

  }

  .productdiv{
    width: 100%;
    margin: 0px;
    padding: 0px 5px;
  }

  .order{
    padding: 5px;
  }

  .odidtxnid{
    font-size:11px;
  }

  .deliverydetail{
    border-top: 15px solid white;
    padding: 6px 9px 0px;
    font-size: 11px;
  }

  .cancelled{
    font-size: 13px;
  }

  .product{
    padding: 2px;
  }

  .proddetails{
    padding: 5px;
  }

  .prodname{
    padding: 0px;
  }

  .prodname :nth-child(2){
    width: 240px;
    font-size: 12px;
  }

  .prodname span{
    margin-bottom: 10px;
  }





}









`

export default Order