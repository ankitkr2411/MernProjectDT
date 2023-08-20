import React, { useState } from 'react'
import styled from 'styled-components'
import Addadress from './Addadress'
import { useFilterContext } from './context/filtercontext'
import Loading from './component/Loading'
import { useNavigate } from 'react-router-dom'
import Editaddress from './Editaddress'
import { useAccountContext } from './context/accountcontext'
import Message from './component/Message'

const SavedAddress = () => {

    const [show, setshow] = useState(false);
    const [edit, setedit] = useState(false);
    const [add, setadd] = useState("");

    const { user_Data, is_Login, deladd } = useAccountContext();

    const [mess,setmess] = useState(false);
    const [message, setmessage] = useState("");


    const navigate = useNavigate();


    if (is_Login) {
        


        const delad = async (id, defaultvalue) => {


            
            if (defaultvalue) {
                setmessage("This is default address. Make Other address default");
                setmess(true);
            }

            else {



                const res = await fetch("http://localhost:5000/deladd", {
                    method: "POST",
                    headers: {
                        Application: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    withCredentials: true,
                    body: JSON.stringify({ id: id })
                })

                const data = await res.json();

                if (res.status == 401) {
                    navigate("/login");
                }

                else if (res.status == 200) {
                    deladd(data.address);


                }

                else {
                    setmessage("Something Went Wrong");
                    setmess(true);
                }



            }


        }






        window.scrollTo({ top: 0, left: 0 });

        return (
            <Wrapper>
                <Editaddress show={edit} setadd={setedit} address={{ ...add }} />
                {mess?<Message message={message} setmess={setmess} />:""}
                <div className='container'>
                
                    <div className='main'>
                        <div className='add' onClick={() => { setshow(true); }} >+ Add Address</div>
                        <Addadress show={show} setadd={setshow} />

                        <div className='cardcontainer'>

                            {user_Data.address.map((currElem) => {
                                return <div className='addcard'>
                                    <p className='head' >{currElem.name}, {currElem.phone} {
                                        currElem.defaultvalue ?
                                            <span className='def'>default</span> :
                                            ""}
                                    </p>
                                    <p className='full' >{currElem.add}</p>
                                    <p className='foot' >{currElem.town},{currElem.pincode}</p>
                                    <div className='btnbox'>
                                        <div className='btn edit' onClick={() => { setedit(true); setadd({ ...currElem }) }} >EDIT</div>
                                        <div className='btn delete' onClick={() => { delad(currElem._id, currElem.defaultvalue) }}>DELETE</div>
                                    </div>
                                </div>


                            })}



                        </div>



                    </div>
                </div>
            </Wrapper>
        )

    }

    else {
        return <Loading />
    }
}


const Wrapper = styled.section`

.container{
    height: 85vh;
    display:flex;
    justify-content:center;
    align-items:center;
}

.main{
    box-shadow: 0px 0px 8px -6px black;
    border-radius: 10px;
    padding: 20px;
    width: 60%;
    height:93%;
    display:flex;
    flex-direction: column;
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

@media (max-width: 768px ){

    .main{
        width: 96%;
        padding: 10px;
    }


}






`





export default SavedAddress