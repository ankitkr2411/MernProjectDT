import React from 'react'
import styled from 'styled-components'

const ContactUs = () => {
  return (
    <Wrapper>
      <h2 className = "heading">Feel Free to Contact us</h2>
      <iframe className='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.625018866114!2d85.15479089999998!3d25.617373800000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58f0de04bb2b%3A0xfee4b38d819ae93!2sG.P%20Market!5e0!3m2!1sen!2sin!4v1692492245587!5m2!1sen!2sin" width="100%" height="300" style={{border:0}} allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

      <div className='container'>
        <div className='formconta'>
          <form action="#" method="POST" className='form'>
            <label for="">Name:</label>
            <input className="name" type="text" name='email'/>

            <label for="">Email:</label>
            <input className="name" type="email" name='password'/>

            <textarea className='mess' name="message" cols="30" rows="6" placeholder='Type Here' autoComplete="off" required></textarea>

            <input className='submit' type="submit" value="send"/>
          </form>
        </div>
      </div>
    
    
    
    </Wrapper>
  )
}

const Wrapper = styled.section`



.heading{
  width: 100%;
  text-align:center;
  margin: 35px 0px;
}

.container {
  background-color:#f7f2f2;
  padding: 30px 0px;
}

.formconta{
  width: 40%;
    margin: auto;
    padding: 30px 20px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0px 0px 17px -9px black;
}

.form{
  display:flex;
  flex-direction: column;
}

label{
  forn-size:15px;
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
    margin: 20px auto 20px auto;
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


@media (max-width: 840px)
{
    .formconta{
      width: 70%;
    }

    .heading{
      margin-top: 70px;
    }

    .map{
      height: 200px;
    }
}

`;

export default ContactUs