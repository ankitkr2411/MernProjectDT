import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProductContextProvider } from './context/productcontext';
import { FilterContextProvider } from './context/filtercontext';
import { AccountProvider } from './context/accountcontext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ProductContextProvider>
        <FilterContextProvider>
            <AccountProvider>
                <App />
            </AccountProvider>
        </FilterContextProvider>
    </ProductContextProvider>

);


