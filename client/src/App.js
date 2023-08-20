import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ContactUs from "./ContactUs";
import Saree from "./Saree";
import Lehanga from "./Lehanga";
import Blouse from "./Blouse";
import SingleProductSaree from "./SingleProductSaree";
import SingleProductBlouse from "./SingleProductBlouse";
import Cart from "./Cart";
import Signin from "./Signin";
import Login from "./Login";
import Error from "./Error";
import { GlobalStyle } from "./GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import Header from "./component/Header";
import Addadress from "./Addadress";
import Order from "./Order";
import Wishlist from "./Wishlist";
import SavedAddress from "./SavedAddress";
import Changeaddress from "./Changeaddress";
import SingleProductLehanga from "./SingleProductLehanga";
import SearchProduct from "./SearchProduct";
import Profile from "./Profile";
import Message from "./component/Message";


function App() {




  return (
    <>
      <Wrapper>
          <BrowserRouter>
            <GlobalStyle />
            <div className="headersticky">
              <Header />
            </div>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/saree" element={<Saree />} />
              <Route path="/blouse" element={<Blouse />} />
              <Route path="/lehanga" element={<Lehanga />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Signin" element={<Signin />} />
              <Route path="/saree/:id/:index" element={<SingleProductSaree />} />
              <Route path="/blouse/:id/:index" element={<SingleProductBlouse />} />
              <Route path="/lehanga/:id/:index" element={<SingleProductLehanga />} />
              <Route path="/search" element={<SearchProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/addaddress" element={<Addadress />} />
              <Route path="/order" element={<Order />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/savedaddress" element={<SavedAddress />} />
              <Route path="/ca" element={<Changeaddress />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/message" element={<Message />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>

      </Wrapper>


    </>
  );
}


const Wrapper = styled.section`

.headersticky{
  position:sticky;
  top: 0px;
  z-index: 999;
}


`

export default App;
