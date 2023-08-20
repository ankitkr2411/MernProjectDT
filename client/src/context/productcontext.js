import { createContext, useContext, useEffect, useReducer, useState } from "react";
import productReducer from "../reducer/productreducer";


//Object for managing Product Data
const initialState = {
  isLoading: false,
  saree: [],
  blouse: [],
  lehanga: [],
  single_Product: [],
}

//Creating Context for Products data
const ProductContext = createContext();


//Component for Context Provider and children is all component inside ProductContextProvider component used in index.js file
export const ProductContextProvider = ({ children }) => {

  //useReducer hook for Products data
  //productReducer function is defined in another file.
  const [state, dispatch] = useReducer(productReducer, initialState);

  //useState hook for storing id and category of single product
  const [singleId, setsingleId] = useState({ id: "", product: "" });


  //fetching data from backend and assigning them to variable
  const getProduct = async () => {


    let res = await fetch("http://localhost:5000/saree",
      {

        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      });



    let sareedata = await res.json();

    dispatch({ type: "ADD_SAREE", payload: sareedata })

    res = await fetch("http://localhost:5000/blouse",
      {

        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      });

    let blousedata = await res.json();

    dispatch({ type: "ADD_BLOUSE", payload: blousedata })


    res = await fetch("http://localhost:5000/lehanga",
      {

        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      });

    let lehangadata = await res.json();

    dispatch({ type: "ADD_LEHANGA", payload: lehangadata })
  }

  //useEffect hook trigger only when first time page render
  useEffect(() => {
    getProduct();
  }, [])


  //function for getting id and category of Single Product from SingleProduct page.
  //This invoke whenever user click on any Product from Product List
  const singleProduct = (id, s) => {

    //Setting id and category
    setsingleId({ id, product: s });

  }


  //Whenever singleId or any product data changes useEffect trigger
  //Whenever user click on any product from product list then its id and category set to singleId variable.
  //Whenever singleproductpage reload then singleId value set but till then if product data not fetched then Component return loading so whenever
  //data fetched from database then again it trigger.
  useEffect(() => {
    dispatch({ type: "GET_SINGLE_PRODUCT", pro: singleId });
  }, [singleId, state.blouse, state.saree, state.lehanga]);




  //Returning Provider with value
  //ProductConetxt data  is only accessible by children only
  return <ProductContext.Provider value={{ ...state, singleProduct }}>
    {children}</ProductContext.Provider>


};


//custom hooks so that whenever we use this context just we need to use this hook
export const useProductContext = () => {
  //returning ProductContext values
  return useContext(ProductContext);
};
