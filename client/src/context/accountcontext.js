import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react"
import { accountreducer } from "../reducer/accountreducer";
import { useEffect } from "react";
import { useState } from "react";
import { useProductContext } from "./productcontext";



const initialState = {
    is_Login: false,
    user_Data: {},
    cart_Items: [],
    wishlist_Items: []
}

const AccountContext = createContext();

export const AccountProvider = ({children}) => {

    const [state,dispatch] = useReducer(accountreducer,initialState);
    const {saree,blouse,lehanga} = useProductContext();

    //As in userData cart only product id size and color is there
    //So whenever cart page loads its value get change and useEffect will run
    const [cartc,setcartc] = useState(0);

    //Same applies for wishlist
    const [wishc,setwishc] = useState(0);





    //This function will change the login value true or false
    const isLogin = (check) => {
        dispatch({type:"CHECK_LOGIN", check})
    }


    //Whenever user login its data is stored in user_Data key
    const addUser = (data) => {
        dispatch({type:"ADD_USER", data})
    }


    //Whenever user logout its all data get deleted from user_Data key
    const delUserData = () => {
        dispatch({type:"DELETE_USERDATA"})
    }


    //Whenever user Click add to cart on product, the essential data only get stored on user Data
    const setCart = (data) => {

        dispatch({ type: "addtocart", data:data });

    }


    //Whenever cart page load its value get changed
    const cart = () => {
        setcartc(cartc+1);
    }


    //It add detail about product in cart_Items key
    //or if page reload then whenever product data fetched cart page reload again from updated data
    useEffect(()=>{

            dispatch({ type: "cart",saree,blouse,lehanga});

        

    },[state.user_Data,cartc,blouse,saree,lehanga])

    //This called when product removed from cart
    //It update cart_Items with data sent from server after item deleted from cart
    const delcartitem = (data) => {

        dispatch({ type: "delcartitem", data:data })

    }


    //This called when remove product from cart and added to wishlist
    //It update wish_Items with data sent from server
    const cartwish = (data) => {

        dispatch({type: "carttowish", data})

    }

    
    //This called when quantity of product in cart changed
    //It update cart_Items with data sent from server
    const upquant = (data) => {
            dispatch({type:"updatequantity", data:data});
     
    }


     //Whenever user Click Wishlist on product, the essential data only get stored on user Data
    const addwish = (wishlist) => {
        dispatch({type: "wish", wishlist:wishlist});
    }

    //Whenever wwishlist page load its value get changed
    const wishlist = () => {
        setwishc(wishc+1);
        
    }


    //It add detail about product in wishlist_Items key
    //or if page reload then whenever product data fetched wishlist page reload again from updated data
    useEffect(()=>{
        dispatch({type:"wishlist",saree,blouse,lehanga})

    },[state.user_Data,wishc,blouse,saree,lehanga])


     //This called when product removed from cwishlist
    //It update wishlist_Items with data sent from server after item deleted from wishlist
    const delwishlist = (data) => {

        dispatch({ type: "delwishlist", data:data })

    }


    
    


    //This called when new address is added
    //It update user.addredd field with new data sent
    const addad = (address) => {
        dispatch({type:"addaddress", address:address});

    }

    
     //This called when address is deleted
    //It update user.addredd field with new data sent
    const deladd = (address) => {
        dispatch({type: "deladd",address:address})
    }


    //This called when order placed
    //It update user.order field with new data sent
    const addorder = (data) => {
        dispatch({type: "addorder", data:data});
    }


     //This called when order is cancelled
    //It update user.order field with new data sent
    const cancelord = (data) => {
        dispatch({type:"cancel_Order", order:data})
    }



    //Whenever Page loads first time, It checks if any user logged in according to saved cookie in browser
    const checkloggedin = async () => {

        //It connect with backed server serve to /loggedin
        const res = await fetch("http://localhost:5000/loggedin", {
          //As we want data from server we used GET method
          method: "GET",

          headers: {
            //Tells server json file is sent
            Accept: "application/json",
            //It tells we sending Json file in body
            "Content-Type": "application/json"
          },

          //These are used for access of cookie in server
          credentials: "include",
          withCredentials: true,
        })
    
        //Here it accepting the data sent from server and converting it to object
        const data = await res.json();
    
    
        //If server responded with 200 status code means no cookie is saved
        if (res.status != 200) {
          //Setting login to false so that 
          isLogin(false);
    
        }
        
        //Cookie saved token get matched and user data sent from server
        else {
          //Adding user Data  
          addUser(data);

          //Setting login as true
          isLogin(true);    
    
        }
    
    
      }


      //Whenever first time page reloads it checks for token saved in cookie to check if user logged in before
      useEffect(()=>{
        checkloggedin();
      },[])




    return <AccountContext.Provider value={{...state,isLogin,addUser,delUserData,delcartitem,
     upquant, addad, addorder, addwish, wishlist, cart, cartwish,
      delwishlist, deladd, cancelord,setCart}}>{children}</AccountContext.Provider>
}


export const useAccountContext = () => {
    return useContext(AccountContext);
}