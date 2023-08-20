import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components'
import { RxCross2 } from "react-icons/rx";
import logowhite from"./logo/logowhite.png"
import Loading from './component/Loading';
import Message from './component/Message';



const Signin = (props) => {

    const navigate = useNavigate();

    const [loading, setloading] = useState(false);
    const [mess,setmess] = useState(false);
    const [message, setmessage] = useState("");

    const [user, setUser] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        cpassword: "",
    });

    let name, value;
    const handleInputs = (e) => {

        name = e.target.name;
        value = e.target.value;

        if(name === "phone")
        {
          if(!isNaN(value))
          {
            setUser({ ...user, [name]: value });

          }
        }
        else{
          setUser({ ...user, [name]: value });

        }

        //[name] means the value of name as suppose email is targeted
        //then its name value will be email then here same as email:value

        
    }

    const PostData = async (e) =>{
        e.preventDefault();
        setloading(true);

        
      
        const { name, phone, email, password, cpassword } = user;

        if(phone.length != 10 && (!email.includes('@') || !email.includes('.')))
        {
          setloading(false);
          setmessage("Check Your Phone Number and Email");
          setmess(true);
          return;

        }

        if(phone.length != 10)
        {
          setloading(false);
          setmessage("Check Your Phone Number");
          setmess(true);
          return;
        }

        if(!email.includes('@') || !email.includes('.'))
        {
          setloading(false);
          setmessage("Enter Valid Email");
          setmess(true);
          return;

        }


        const res = await fetch("http://localhost:5000/signin", 
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:  JSON.stringify({

                //here passing name value in sencond name and puting it in name
                //name:name, email:name

                //if key and value both are same then we can simple write only key
                //it is same as above
                name, phone, email, password, cpassword

            })
            
            
        });

        


        const data= await res.json();

        if(res.status === 420 || !data){
          setloading(false);
          setmessage("Fill All Details");
          setmess(true);
        }

        else if(res.status === 421 || !data){
          setloading(false);
          setmessage("Email Allready Registered");
          setmess(true);
        }

        else if(res.status === 422 || !data){
          setloading(false);
          setmessage("Password Not Same");
          setmess(true);
        }

        else if(res.status === 501 || !data){
          setloading(false);
            window.alert("Something went Wrong");
        }

        else {
          setloading(false);
          setmessage("Registration Successfull");
          setmess(true);
            props.setregister(false);
            props.setlogin(true);
        }
    }



  



    return (props.show) ? (
        <Wrapper>
        {loading?<Loading />:""}
        {mess?<Message message={message} setmess={setmess} />:""}
            <div className='container'>

            <div className='mainlog'>
    <div className='image'>
        <img src={logowhite} />
      </div>

      <div className='secbox'>
      <div className='crosslog' onClick={()=>{props.setregister(false)}} ><RxCross2 /></div>
        <div className='logtxt'>Register</div>

                <form method="POST" >
                <div className='form' >
                    <label htmlFor="">Name:</label>
                    <input className="name" type="text" name='name' value={user.name}
                        onChange={handleInputs} required
                    />

                    <label htmlFor="">Phone:</label>
                    <input className="phone" type="tel" name='phone' value={user.phone}
                        onChange={handleInputs} required
                    />

                    <label htmlFor="">Email:</label>
                    <input className="email" type="email" name='email' value={user.email}
                        onChange={handleInputs} required
                    />

                    <label htmlFor="">Password:</label>
                    <input className="password" type="password" name='password' value={user.password}
                        onChange={handleInputs} required
                    />

                    <label htmlFor="">Confirm Password:</label>
                    <input className="cpassword" type="password" name='cpassword' value={user.cpassword}
                        onChange={handleInputs} required
                    />

                    <input className='submit' type="submit" value="Register" onClick={PostData} />
               </div>
                </form>

                <div className='register'>
          Already a User? <span onClick={() => { props.setregister(false); props.setlogin(true);   }} >Login</span>
        </div>

            </div>

                </div>

            </div>


        </Wrapper>) : "";
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
  height: 66%;
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
    height: 60%;
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

export default Signin