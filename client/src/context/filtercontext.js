import { createContext, useContext, useEffect, useReducer, useState } from "react";
import reducer from "../reducer/filter_reducer";
import { useProductContext } from "./productcontext";


const FilterContext = createContext();

const initialState = {
    filter_saree: [],
    filter_blouse: [],
    filter_lehanga: [],
    //To store initial search product without filter
    search: [],
    //To store searched product after filter
    filter_search: [],  
    //Here every filtername have array so that multiple request can be stored and then product get filtered by traversing each filter array
    //As Sort can have only one request at a time so no array required
    filter: {
        category: "",
        color: [],
        size: [],
        price: [],
        sort: ""
    }
}

export const FilterContextProvider = ({ children }) => {

    //Getting fetched database product data from product context
    const {saree, blouse, lehanga} = useProductContext();

    //reducer for filtered data
    const [state, dispatch] = useReducer(reducer, initialState);

    //When first time page load it add product data to filter data
    //Whenever data changes in any product data then this effect trigger
    useEffect(()=>{

        //To assign intially Product data to filter product data
        dispatch({type:"FILTER_DATA", saree,blouse,lehanga})
    },[saree,blouse,lehanga]);




    const productsearch = (value) => {
        dispatch({type: "Product_Search", value: value,saree,blouse,lehanga})
    }


    //This will set filter value user request
    //Taking filtername user request, its value and category
    //This will be called each time any new request made my user
    const setFilter = (value,category,filtername) => {

        dispatch({ type: "Set-Filter", value,category,filtername });
    }

    

     //This is render whenever there is change in filter value
     useEffect(() => {
        dispatch({ type: "Filter-Products", saree,lehanga,blouse });

    }, [state.filter]);



    //This will take value category filtername to be removed
    const remfilter = (value,category,filtername) => {
        dispatch({ type: "Remove-Filter", value,category,filtername });
    }


    //This will set all values of filter as initial
    const resfilter = () => {
        dispatch({ type: "Reset-Filter"});
    }


   



    return (
        <FilterContext.Provider value={{
            ...state, setFilter, remfilter, resfilter,  productsearch,
        }}>
            {children}
        </FilterContext.Provider>
    )
}


export const useFilterContext = () => {
    return useContext(FilterContext);
}