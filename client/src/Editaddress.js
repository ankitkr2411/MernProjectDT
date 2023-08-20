import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useFilterContext } from './context/filtercontext';
import Loading from './component/Loading';
import { useAccountContext } from './context/accountcontext';
import Message from './component/Message';

const Editaddress = (props) => {
  const { addad } = useAccountContext();
  const [loading,setloading] = useState(false);

  const [mess,setmess] = useState(false);
  const [message, setmessage] = useState("");


  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    phone: "",
    pincode: "",
    state: "",
    add: "",
    town: "",
    district: "",
  })

  const [val, setval] = useState("update");


  if (props.show) {

    if (val == "update") {
      setUser({
        name: props.address.name,
        phone: props.address.phone,
        pincode: props.address.pincode,
        state: props.address.state,
        add: props.address.add,
        town: props.address.town,
        district: props.address.district,
      });
      setval("notupdate")
    }


    let name, value;
    const handleInputs = (e) => {

      name = e.target.name;
      value = e.target.value;

      //[name] means the value of name as suppose email is targeted
      //then its name value will be email then here same as email:value

      setUser({ ...user, [name]: value });
    }

    let defaultvalue = false;

    if (props.address.defaultvalue) {
      defaultvalue = true;

    }

    const setdefault = (e) => {
      if (e.target.checked) {
        defaultvalue = true;
      }

      else {
        defaultvalue = false;
      }

    }

    const UpdateData = async (e) => {
      e.preventDefault();
      setloading(true);
      let { name, phone, pincode, state, add, town, district } = user;
      pincode = Number(pincode);
      let id = props.address._id;


      const res = await fetch("http://localhost:5000/updateadress",
        {
          method: "POST",
          headers: {
            Application: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include",
          withCredentials: true,
          body: JSON.stringify({

            //here passing name value in sencond name and puting it in name
            //name:name, email:name

            //if key and value both are same then we can simple write only key
            //it is same as above
            id, name, phone, pincode, state, add, town, district, defaultvalue

          })


        });


      const data = await res.json();

      if (res.status == 401) {
        setloading(false);
        navigate("/login");
      }

      else if (res.status == 200) {
        setloading(false);
        // const address = {...user};
        // address.defaultvalue = defaultvalue;
        addad(data.address);
        props.setadd(false);


      }

      else {
        setloading(false);
        setmessage("Something Went Wrong");
        setmess(true);
      }
    }

    return (
      <Wrapper>
      {loading?<Loading />:""}
      {mess?<Message message={message} setmess={setmess} />:""}
        <form method="POST" >
          <div className='container' >
            <div className='formcontainer'>
              <div className='addtxt'>ADD NEW ADDRESS</div>

              <div className='inp'>
                <input className="name" type="text" name='name' value={user.name} placeholder="Name*"
                  onChange={handleInputs} required
                />

                <input className="phone" type="tel" pattern="[0-9]{3}-[0-9]{2}" name='phone' value={user.phone} placeholder="Mobile*"
                  onChange={handleInputs} required
                />

                <input className="pincode" type="text" name='pincode' value={user.pincode}
                  onChange={handleInputs} required placeholder="Pincode*"
                />

                <input className="state" type="text" name='state' value={user.state}
                  onChange={handleInputs} required placeholder="State*"
                />

                <input className="address" name='add' value={user.add}
                  onChange={handleInputs} required placeholder="Address (House No,Building,Street,Area)*"
                />

                <input className="town" type="text" name='town' value={user.town}
                  onChange={handleInputs} required placeholder="Locality/Town*"
                />


                <input className="district" type="text" name='district' value={user.district}
                  onChange={handleInputs} required placeholder="City/District*"
                />

                <div className='defaultbox'>
                  {props.address.defaultvalue ? <input className="default" checked editable="false" type="checkbox" name='default'
                    onChange={() => {
                      setmessage("This is default address. Make other address default to remove it");
                      setmess(true); }}
                  /> :
                    <input className="default" type="checkbox" name='default' onChange={setdefault} />}

                  Make this as my default address

                </div>
              </div>



              <div className='button'>
                <input type='button' className='cancel butt' value="CANCEL" onClick={() => { props.setadd(false) }} />
                <input className='save butt' type="submit" value="UPDATE" onClick={UpdateData} />
              </div>
            </div>

          </div>
        </form>


      </Wrapper>)
  }

  else {
    if (val == "notupdate") {
      setval("update")
    }

    return "";

  }

}



const Wrapper = styled.section`
.loadimg{
  width: 25%;
}

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

.formcontainer{
background-color: white;
${'' /* border-radius: 10%;
padding: 20px; */}
display: flex;
flex-direction: column;
box-shadow: 0px 0px 12px -7px black;
width: 400px;
}

.addtxt{
color: #525252;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid #c1c1c1;
  margin-bottom: 10px;
  padding: 13px;
}

.inp{
display: flex;
  flex-direction: column;
  height: 400px;
  overflow-y: auto;
}

input{
border: none;
  border-bottom: 1px solid silver;
  margin: 20px 10px;
  padding-bottom: 6px;
  font-size: 14px;
}

input:focus{
outline:none;
}




.defaultbox{
color: #909090;
font-weight: 300;
  align-items: center;
  display: flex;
  font-size: 14px;

}

.default{

margin-left: 18px;
  margin-top: 3px;
  margin: 6px 5px 5px 18px;
  width: 18px;
  height: 18px;

}


.button{

margin-top: 20px;
  border-top: 1px solid #c7c7c7;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

}


.butt{
font-weight:600;
margin: 0;
  padding: 0;
  background: none;
  padding: 20px 0px;
  text-align: center;
  width: 50%;
}

.save{
color: white;
  background-color: #ff0055;
}

.save:hover{
cursor:pointer;
background-color: rgb(211,0,70);
}

.cancel:hover{
cursor:pointer;
background-color: rgb(219,219,219);

}


`

export default Editaddress