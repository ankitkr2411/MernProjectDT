
//Reducer function for useReducer in productcontext
const productReducer = (state, action) => {

    //Switching type key of action of dispatch
    switch (action.type) {

        //Adding Saree Product
        case "ADD_SAREE":

        //if there is data in payload then only it can assigned to state saree
            if (action.payload) {

                action.payload.map((currElem) => {
                    return currElem.index = "0";
                })


                return {
                    ...state,
                    saree: action.payload,
                }

            }

            break;

        case "ADD_BLOUSE":


            if (action.payload) {

                action.payload.map((currElem) => {
                    return currElem.index = "0";
                })



                return {
                    ...state,
                    blouse: action.payload,
                }

            }

            break;

        case "ADD_LEHANGA":


            if (action.payload) {
                return {
                    ...state,
                    lehanga: action.payload,
                }

            }

            break;

            dafault:
        return{
            ...state,
            products: action.payload,
        }


        //Assigning Single Product data to single_Product key
        case "GET_SINGLE_PRODUCT":

            //Assigning all product data temporarily
            let tempsingleProduct = [];

            //As there are three categories so product is filter out from there respective category only
            //It is recognised by category sent from SingleProductPage.
            if (action.pro.product == "Saree") {
                tempsingleProduct = [...state.saree];

            }

            else if (action.pro.product == "Blouse") {

                tempsingleProduct = [...state.blouse];

            }

            else {
                tempsingleProduct = [...state.lehanga];

            }



            //Matching the id of Single Product from all product and filtered out it.
            const singleProduct = tempsingleProduct.filter((currElem) => {
                return currElem._id === action.pro.id;
            });


            //Assigning the filtered out data to single_Product Key
            return {
                ...state,
                single_Product: singleProduct,
            }




    }

};


export default productReducer;