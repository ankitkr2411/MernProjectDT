import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FiShoppingCart } from "react-icons/fi";
import { RiAccountCircleLine } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { CgMenu, CgClose } from "react-icons/cg";
import styled from 'styled-components';
import { useFilterContext } from '../context/filtercontext';
import { useNavigate } from 'react-router-dom';
import Login from '../Login';
import logowhite from "../logo/logowhite.png"
import Signin from '../Signin';
import Loading from './Loading';
import { useAccountContext } from '../context/accountcontext';


const Header = () => {

    const navigate = useNavigate();
    const [loading,setloading] = useState(false);


    const [crossdisplay, setcrossdisplay] = useState("none");
    const [normdisplay, setnormdisplay] = useState("inline-block");
    const [menuleft, setmenuleft] = useState(-100);
    const [login, setlogin] = useState(false);
    const [register, setregister] = useState(false);



    const {is_Login,isLogin,delUserData,user_Data,cart_Items} = useAccountContext();
    const {  deletealldata, productsearch } = useFilterContext();



    const norm = () => {

        setmenuleft(0);
        setnormdisplay("hidden");
        setcrossdisplay("inline-block");

    }

    const cross = () => {

        setmenuleft(-100);
        setcrossdisplay("none");
        setnormdisplay("inline-block");

    }



    const search = (e) => {

        if (e.key == "Enter") {
            if (e.target.value != null || !e.target.value.isEmpty() || !e.target.value.trim().isEmpty()) {
                productsearch(e.target.value);
                navigate("/search")
                e.target.value = "";
            }
        }
    }





    const logout = async () => {

        // useEffect(() => {
        //     logg();

        // }, []);
        setloading(true);

        const res = await fetch("http://localhost:5000/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            withCredentials: true,
        })

        const data = await res.json();

        if (res.status === 200 || !data) {
            setloading(false);
            delUserData();
            isLogin(false);
            navigate("/");
        }

    }





    const ShowAccountLogin = () => {

        if (is_Login) {

            let cartcount = 0;


            for (let i = 0; i < cart_Items.length; i++) {

                cartcount = cartcount + cart_Items[i].quantity;
            }


            let name = user_Data.name;
            name = name.substring(0, (name.indexOf(" ")));

            return (
                <div className="sideheader">
                    <ul>
                        <li className='accountli rightlist'>
                            <NavLink className="nav account">

                                <RiAccountCircleLine className="icon accicon" /> <span className='sidetxt' >{name}</span>
                            </NavLink>

                            <div className='accountbox'>
                                <NavLink to="/profile" className="accountmenu">Profile</NavLink>
                                <NavLink to="/order" className="accountmenu" >Order</NavLink>

                                <NavLink to="/savedaddress" className="accountmenu" >Saved Address</NavLink>

                                <NavLink to="/wishlist" className="accountmenu" >Wishlist</NavLink>

                                <NavLink to="/cart" className="accountmenu"  >cart</NavLink>

                                <NavLink className="accountmenu" onClick={logout}>Logout</NavLink>
                            </div>
                        </li>

                        <li className='rightlist'>
                            <NavLink to="/wishlist" className="nav">
                                <AiOutlineHeart className="icon" /> <span className='sidetxt'>Wishlist</span></NavLink>
                        </li>

                        <li className='rightlist'>
                            <NavLink to="/cart" className="nav">
                                <span className="spcart">
                                    <FiShoppingCart className="icon carticon" />
                                    <span className="count">{cartcount}</span>

                                </span>
                                <span className='sidetxt'>Cart</span></NavLink>
                        </li>



                    </ul>
                </div>

            )
        }

        else {
            return (
                <>
                    <div className='loginsign'>
                        <NavLink className='logsbtn' onClick={() => { setlogin(true) }}>Log in</NavLink>
                        <NavLink className='logsbtn' onClick={() => { setregister(true) }}>Register</NavLink>
                    </div>
                    <Login show={login} setlogin={setlogin} setregister={setregister} />
                    <Signin show={register} setregister={setregister} setlogin={setlogin} />
                </>
            )
        }


    }



    return (
        <>
            <Wrapper crossdisplay={crossdisplay} normdisplay={normdisplay} menuleft={menuleft} >
            {loading?<Loading />:""}
                <div id="header">


                    <div className='sidemenu'>
                        <CgMenu className="burg norm" onClick={(norm)} />
                        <CgClose className="burg cross" onClick={(cross)} />
                    </div>

                    <div className="logo">
                        <NavLink to="/">
                            <img src={logowhite} alt="" />
                        </NavLink>
                    </div>

                    <div className="menu">
                        <ul>
                            <li className='menuli'>
                                <NavLink to="/" onClick={(cross)} >Home</NavLink>
                            </li>

                            <li className='menuli'>
                                <NavLink to="/saree" onClick={(cross)} >Saree</NavLink>
                            </li>

                            <li className='menuli'>
                                <NavLink to="/blouse" onClick={(cross)} >Blouse</NavLink>
                            </li>

                            <li className='menuli'>
                                <NavLink to="/lehanga" onClick={(cross)} >Lehanga</NavLink>
                            </li>

                            <li className='menuli'>
                                <NavLink to="/contactus" onClick={(cross)}>Contact Us</NavLink>
                            </li>

                        </ul>
                    </div>

                    <div className="search">
                        <input type="text" name="" placeholder="Search" onKeyPress={(e) => search(e)} />
                    </div>

                    <ShowAccountLogin />


                </div>

            </Wrapper>
        </>
    )
}


const Wrapper = styled.section`

        #header{
            background-color: rgb(247, 247, 247);
            height: 74px;
            width: 100%;
            border: 1px solid rgb(210, 210, 210);
            display: flex;
            align-items: center;
        }

        
        #header ul{
            display: flex;
        }

        #header ul li{
            padding: 0px 10px;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .logo{
            background-color: #ff0065;
            width: 35px;
            padding: 3px;
            margin-left: 3%;
        }

        .logo img{
            width: 100%;
        }

        .menu{
            margin-left: 2%;
        }

        .menu li{
            font-size: 17px;
           
            
        }

        .menu li a{
            display: block;
            color: black;
            transition: all .2s;
            color: rgb(165, 35, 130);
            font-weight:600;

        }

        .menu li a:hover{
            color: #852266;
            border-bottom: 2px solid #852266;
            transform: scale(1.2);
        }

        .menu li a:focus{
            color: #852266;
            border-bottom: 2px solid #852266;
            transform: scale(1.07);
        }

        .sideheader{
            margin-left: 3%;
            margin-right: 3%;
        }

        .sideheader  li > a{
            padding: 14px 8px;
            color: rgb(177,14,121);
            display: flex;
            flex-direction:column;
            align-items:center;
            transition: all 0.1s;
        }

        .sideheader li a:hover{
            transform: scale(1.1);
            color:red;     
        }

        .sideheader li > a:focus{
            border-bottom:2px solid red;
            
        }

        .sidetxt{
            font-weight: 500;
            margin-top:1px;
            font-size:13px;
        }

        .nav{
            display: flex;
            align-items: center;

        }

        .spcart{
            font-size:0px;
            position:relative;
            margin-right:3px;
        }

        .icon{
            colour:#000000;
            font-size:21px;
        }



        .count{
            padding: 1px;
            border-radius: 20px;
            text-align:center;
            width: 16px;
            color:white;
            position:absolute;
            background-color:rgb(255, 0, 61);
            font-size:11px;
            left:11px;
            top:-5px;
        }

        .search{
            width: 20%;
            margin-left: auto;
        }

        .search input{
            width: 100%;
            height: 30px;
            border: none;
            padding-left: 40px;
            box-shadow: 0px 2px 6px -5px black;
            background-color: white;
            background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat 13px center;
            background-color: white;
            border-radius: 10px;
        }

        .search input:focus{
            outline:none;
        }

        .loginsign{
            margin-left: 3%;
            margin-right:3%;
        }

        .logsbtn{
            font-size: 16px;
            background-color: #ff0078;
            border-radius: 5px;
            color: white;
            box-shadow: 3px 3px 8px -2px rgb(255, 237, 237) inset;
            padding:4px 9px;
            margin-right: 10px;
        }

        .logsbtn:hover{
            background-color: rgb(255,37,140);

        }

        .logsbtn:active{
            background-color: rgb(255,107,177);

        }

        .burg{
            display:none;           
        }

        .account:hover{
            border-bottom: 1px solid red;
        }

       


        .accountbox{
            position: absolute;
            background-color: white;
            text-align: center;
            top:-150px;
            z-index: -1;
            padding: 5px 30px;
            box-shadow: 0px 0px 15px -11px black;
            transition: all 0.1s;
        }

        .account:hover + .accountbox{
            top:60px;
        }

        .accountbox:hover{
            top:60px;

        }

        .accountmenu{
            margin-top: 5px;
            display:block;
            width: 90px;
            font-size: 13px;
            padding: 4px 0px;
            
        } 


        .accountmenu:hover {
            border-bottom: 1px solid rgb(197, 178, 178);
        }














        ${'' /* mediaghgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggs */}




        @media (max-width: 1024px ){

            .menu{
                margin-left: 1%;
            }

            #header ul li{
                padding: 0px 5px;
            }

            .sideheader{
                margin-left: 1%;
                margin-right: 2%;
            }

        }

        @media (max-width: 768px ){
            #header{
                position: relative;
                height:50px;
                padding: 5px 0px 0px 0px;
                margin-bottom: 38px;
                
            }





            .burg{
                display:inline-block;
                font-size:25px;
            }

            .norm{
                visibility:${(props) => props.normdisplay};
            }


            .cross{
                position:absolute;
                left:0px;
                display:${(props) => props.crossdisplay};
            }

            
            .logo{
                width:25px;
            }

            .menu{
                background-color:white;
                box-shadow: 6px 0px 8px -6px black;
                padding: 0px 6px;
                width: 100px;
                position:fixed;
                margin:0px;
                top:94px;
                left:${(props) => props.menuleft}px;
                height:100vh;
                transition: all .1s;
            }

            .menu ul{
                flex-direction:column;
                
            }

            .menu ul li{
                font-size:14px;
                margin: 10px 0px;
                
            }



            .search{
                position: absolute;
                bottom: -46px;
                background-color: white;
                padding: 8px 11px;
                width: 100%;
            }

            .sidemenu{
                position:relative;
                margin-left:10px
                
            }

            

            .sideheader{
                margin-left:auto;
                margin-right:5px;
            }

            .rightlist{
                padding: 5px;
            }

            #header ul li {
                
                padding: 0px;
            }

            

            .menuli {
                border-bottom: 1px solid #e3e3e3;

            }

            .nav{
                font-size:10px;
                flex-direction:column;
            }

            .icon{
                font-size:15px
            }

            

            .count{
                font-size:8px;
                top:-4px;
                left:8px;
                width: 14px;
            }

            .loginsign{
                margin-left: 44%;
                margin-right: 0%;
            }

            .logsbtn{
                font-size: 11px;
            }

            .loginsign{
                position: absolute;
                right: 13px;
            }






        }


        @media (max-width: 378px ){

            #header{
                position: relative;
                height:50px;
                padding: 5px 0px 0px 0px;
                margin-bottom: 38px;
                
            }



            .burg{
                display:inline-block;
                font-size:25px;
            }

            .norm{
                visibility:${(props) => props.normdisplay};
            }


            .cross{
                position:absolute;
                left:0px;
                display:${(props) => props.crossdisplay};
            }

            
            .logo{
                width:25px;
            }

            .menu{
                background-color:white;
                box-shadow: 6px 0px 8px -6px black;
                padding: 0px 6px;
                width: 100px;
                position:fixed;
                margin:0px;
                top:94px;
                left:${(props) => props.menuleft}px;
                height:100vh;
                transition: all .1s;
            }

            .menu ul{
                flex-direction:column;
                
            }

            .menu ul li{
                font-size:14px;
                margin: 10px 0px;
                
            }



            .search{
                position: absolute;
                bottom: -46px;
                background-color: white;
                padding: 8px 11px;
                width: 100%;
            }

            .sidemenu{
                position:relative;
                margin-left:10px
                
            }

            

            .sideheader{
                margin-left:auto;
                margin-right:5px;
            }

            #header ul li {
                
                padding: 0px;
            }

            .menuli {
                border-bottom: 1px solid #e3e3e3;

            }

            .nav{
                font-size:10px;
                flex-direction:column;
            }

            .icon{
                font-size:15px
            }

            

            .count{
                font-size:8px;
                top:-4px;
                left:8px;
                width: 14px;
            }

            .loginsign{
                margin-left: 44%;
                margin-right: 0%;
            }

            .logsbtn{
                font-size: 11px;
            }




        }



  
 `;



export default Header