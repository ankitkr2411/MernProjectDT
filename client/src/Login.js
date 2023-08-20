import React, { useState } from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import logowhite from"./logo/logowhite.png"
import Loading from './component/Loading';
import Message from './component/Message';
import { useAccountContext } from './context/accountcontext';

const Login = (props) => {

  const navigate = useNavigate();

  const { isLogin, addUser } = useAccountContext();

   const [loading, setloading] = useState(false);
   const [mess,setmess] = useState(false);
   const [message, setmessage] = useState("");
 

 


  const [login,setLogin] = useState({
    email:"",
    password:""
  });

  let name,value;

  const valueUpdate = (e) =>
  {
    
    name = e.target.name;
    value = e.target.value;

    setLogin({...login, [name]:value});

  }

  const postData = async (e) =>{
    e.preventDefault();
    setloading(true);



    const { email, password } = login;

    const res = await fetch("http://localhost:5000/login",
    {
        method:"POST",
        credentials: 'include', 
        withCredentials: true,
        headers: {
          "Content-Type":"application/json"      
        },
        body: JSON.stringify({
          email, password
        }),

    });

    

    const data = await res.json();

    if(res.status === 401 || !data)
    {
      setloading(false);
      setmessage("Fill All Data");
      setmess(true);
    } 

    else if(res.status === 400 || !data)
    {
      setloading(false);
      setmessage("Invalid Credentials");
      setmess(true);
    }

    else if(res.status === 200 || !data)
    {
      setloading(false);
      isLogin(true);
      addUser(data);
      props.setlogin(false);

      
    }

    else
    {
      setloading(false);
      setmessage("Something Went Wrong");
      setmess(true);
    }




  }

  




  return (props.show) ?  (
    <Wrapper>
    {loading?<Loading />:""}
    {mess?<Message message={message} setmess={setmess} />:""}
    <div className='container'>
    <div className='mainlog'>
    <div className='image'>
        <img src={logowhite} />
      </div>

      <div className='secbox'>
      <div className='crosslog' onClick={()=>{props.setlogin(false)}} ><RxCross2 /></div>
        <div className='logtxt'>Log in</div>

        <form method='POST' action="">
        <div className='form' >
            <label for="">Email:</label>
            <input className="name" type="text" name='email'  value={login.email} onChange={valueUpdate}/>

            <label for="">Password:</label>
            <input className="name" type="password" name='password' value={login.password} onChange={valueUpdate}/>


            <input className='submit' type="submit" value="Log in" onClick={postData}/>
        </div>
        </form>

        <div className='register'>
          Don't have account? <span onClick={() => { props.setlogin(false); props.setregister(true); }   }>Register Now</span>
        </div>
      </div>

    </div>
    </div>
                

    </Wrapper> ) : "";

  
}

const Wrapper = styled.section`

.loadimg{
  width: 25%;
}


.container{
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

}

.mainlog{
  box-shadow: 0px 0px 15px -7px black;
  height: 53%;
    justify-content: center;
    display: flex;
    align-items: flex-start;

}


.image{
  align-items: center;
    justify-content: center;
    display: flex;
    /* text-align: center; */
    height: 100%;
    width: 58%;
    background-color: #ff006f;

}


img{
  width:65%;
}

.secbox{
  background-color:white;
  position:relative;
  width: 72%;
  height: 100%;
}

.crosslog{
  color: white;
  position: absolute;
    font-size: 29px;
    right: -32px;

}

.crosslog{
  cursor: pointer;
}

.logtxt{
  color: white;
  background-color: #b22069;
  border-bottom: 1px solid rgb(230,230,230);
  font-weight: 500;
    font-size: 23px;
    padding: 10px 20px;
    margin-bottom: 27px;

}

.form{
  padding: 0px 20px;
  display: flex;
    flex-direction: column;
}

label{
  font-weight: 400;
  font-size: 13px;
}

input{
  font-size: 15px;
  border:none;
  border-bottom: 1px solid #b0b0b0;
  margin: 6px 0px 18px 0px;
}

input:focus{
  outline:none;
}


.submit{
  border-radius: 4px;
    margin: 7px auto 20px auto;
    background-color: #b22069;
    color: white;
    font-size: 17px;
    font-weight: 500;
    width: 78px;
    padding: 5px 8px;
}

.submit:hover{
  cursor:pointer;
  background-color:rgb(133,40,81);
}

.register{
  margin-left:20px;
  font-weight: 500;
  font-size: 12px;
  color: #363636;
}

.register span{
  color: #ff006a;
  font-size: 13px;
}

.register span:hover{
  cursor:pointer;
  text-decoration: underline;
}

@media (max-width: 768px)
{
  .mainlog{
    width: 95%;
  }

  .crosslog{
    right: 0px;
    top: -33px;
  }

}





@media (max-width: 378px ){

  .container{
    padding: 0px 10px;
  }

  .mainlog{
    height: 38%;
  }

  .crosslog{
    right: 1px;
    top: -30px;
  }

  .image{
    width: 33%;
  }

  .logtxt{
    font-size: 20px;
    padding: 7px 9px;
    margin-bottom: 14px;
  }

  .form{
    padding: 0px 8px;
  }

  label{
    font-size: 12px;
  }

  input{
    font-size: 12px;
    margin: 3px 0px 14px;
  }

  .submit{
    font-size: 14px;
    width: 73px;
  }

  .register{
    margin-top: 12px;
    margin-left: 10px;
    font-size: 10px;
  }

  .register span{
    font-size: 11px;
  }



}












`

export default Login