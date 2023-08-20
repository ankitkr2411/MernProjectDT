import React, { useState } from 'react'
import styled from 'styled-components'
import Addadress from './Addadress'
import { useFilterContext } from './context/filtercontext'
import Loading from './component/Loading'
import { useNavigate } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import Editaddress from './Editaddress'
import { useAccountContext } from './context/accountcontext'


const Changeaddress = (props) => {

    const [show, setshow] = useState(false);
    const [edit, setedit] = useState(false);
    const [add, setadd] = useState("");

    const { user_Data, is_Login} = useAccountContext();

    const navigate = useNavigate();
        

    if (is_Login) {

        return (props.show) ? (
    <Wrapper>
    
        <div className='container'>
        <Addadress show={show} setadd={setshow} />
        <div className='main'>
        <div className='cross' onClick={()=>{props.setshow(false)}}><RxCross2 /></div>
                        <div className='add' onClick={() => { setshow(true); }} >+ Add Address</div>
                        

                        <div className='cardcontainer'>

                            {user_Data.address.reverse().map((currElem) => {
                                return <div className='addcard' onClick={()=>{props.setaddress(currElem); props.setshow(false)}}>
                                    <p className='head' >{currElem.name}, {currElem.phone} {
                                        currElem.defaultvalue ?
                                            <span className='def'>default</span> :
                                            ""}
                                    </p>
                                    <p className='full' >{currElem.add}</p>
                                    <p className='foot' >{currElem.town},{currElem.pincode}</p>
                                </div>


                            })}



                        </div>



                    </div>
        </div>
    </Wrapper>
  ): "";
                        }
}

const Wrapper = styled.section`

.container{
  z-index:10000;
  position: absolute;
  top:0;
  left:0;
  width:100%;
  height: 100vh;
  background-color: rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main{
    box-shadow: 0px 0px 8px -6px black;
    border-radius: 10px;
    padding: 20px;
    width: 40%;
    height:72%;
    display:flex;
    flex-direction: column;
    background-color: white;
    position: relative;
}

.cross{
    position: absolute;
    color:white;
    font-size:25px;
    background-color: #00000069;
    border-radius: 20px;
    right: -38px;
    top: 5px;
    padding: 3px;
}

.cross:hover{
    cursor:pointer;
}

.add{
    color: #ed0094;
    padding:20px 10px;
    border: 1px solid rgb(230,230,230);
    font-weight:500;
    font-size: 18px;
}


.add:hover{
    cursor:pointer;
    background-color:#fff4fa;
}



.cardcontainer{
    margin: 10px 0px;
    overflow-y:auto;
}


.addcard{
    padding: 10px;
    border: 1px solid rgb(230,230,230);
    display: flex;
    flex-direction: column;
    margin: 20px 0px;
}

.addcard:hover{
    cursor:pointer;
    background-color:#f5f5f5;

}

.head{
    font-weight: 500;
    padding:2px 0px;
}

.def{
    border-radius: 9px;
    font-weight:500;
    font-size:11px;
    margin-left:10px;
    color: rgb(124,124,124);
    background-color:#d0d0d0;
    padding:2px 4px;
}

.full{
    font-weight: 300;
    font-size:13px;
}

.foot{
    font-weight:500;
    padding: 10px 0px;
}

.btnbox{
    display:flex;
    margin-top: 10px;
}



.btn{
    text-align:center;
    font-size:14px;
    font-weight: 500;
    width: 50%;
    color: #ff00a0;
}

.edit{
    border-right: 1px solid rgb(203,203,203);
}

.edit:hover{
    cursor:pointer;
    color:rgb(192, 0, 120);
}

.delete{
    color: #ff00a0;
}

.delete:hover{
    cursor:pointer;
    color:rgb(192, 0, 120);
}

@media (max-width: 1024px ){

    .main{
        width: 90%;
        padding: 10px;
    }

    .cross{
        height: 23px;
        font-size: 17px;
        right: 3px;
        top: -28px;
    }

    .add{
        padding: 10px 10px;
        font-size: 14px;

    }

    .cardcontainer{
        margin: 0px;
    }

    .addcard{
        padding: 4px 10px;
        margin: 11px 0px;
    }

    .head{
        font-size: 12px;
    }

    .full{
        font-size: 10px;
    }

    .foot{
        font-size: 12px;
        padding: 4px 0px;
    }
    



}



`




export default Changeaddress