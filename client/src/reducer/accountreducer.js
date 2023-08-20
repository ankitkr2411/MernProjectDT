export const accountreducer = (state, action) => {


    switch (action.type) {

        case "CHECK_LOGIN":

            return {
                ...state,
                is_Login: action.check
            }


            break;

        case "ADD_USER":

            return {
                ...state,
                user_Data: action.data
            }

            break;

        case "DELETE_USERDATA":

            return {
                ...state,
                cart_Items: [],
                user_Data: {},
                wishlist_Items: [],
            }

            break;

        case "addtocart":

            state.user_Data.carts = action.data.carts;


            return {
                ...state,
                // user_Data: action.data,
                cart_Items: action.data.carts
            }

            break;

        case "cart":



            //     let  cproducts  = state.saree;
            //  let tempcartproduct = [...cproducts];
            let tempcartproduct = [];
            let cart = [];


            let tempcart = [];


            if (Object.keys(state.user_Data).length != 0) {

                let index;


                for (let i = 0; i < state.user_Data.carts.length; i++) {

                    if (state.user_Data.carts[i].category === "saree") {
                        tempcartproduct = [...action.saree];
                    }

                    else if (state.user_Data.carts[i].category === "blouse") {
                        tempcartproduct = [...action.blouse];
                    }

                    else {
                        tempcartproduct = [...action.lehanga];
                    }

                    tempcartproduct.map((currElem) => {
                        if (currElem._id == state.user_Data.carts[i].id) {
                            index = state.user_Data.carts[i].index;
                            tempcart = [{
                                id: currElem._id,
                                name: currElem.name,
                                description: currElem.colors[index].description,
                                image: currElem.colors[index].image[0],
                                price: currElem.colors[index].price,
                                mrp: currElem.mrp,
                                colors: currElem.colors[index].color,
                                size: state.user_Data.carts[i].size,
                                index: index,
                                quantity: state.user_Data.carts[i].quantity,
                                category: state.user_Data.carts[i].category
                            }]
                            cart = cart.concat(tempcart);
                        }
                    })

                }
            }



            return {
                ...state,
                cart_Items: cart
            }

            break;

            case "carttowish":
                {
                    return{
                        ...state,
                        user_Data: action.data
                    }
                }






        case "updatequantity":

            return {
                ...state,
                user_Data: action.data,
                cart_Items: action.data.carts
            }

            case "delcartitem":

            return {
                ...state,
                user_Data: action.data,
                cart_Items: action.data.carts
            }


        case "addorder":

            return {
                ...state,
                user_Data: action.data,
                cart_Items: action.data.carts
            }


        case "wish":

            state.user_Data.wishlist = action.wishlist;
            return {
                ...state

            }


        case "wishlist":


            let tempproduct = [];

            let wish = [];


            let tempwish = [];

            if (Object.keys(state.user_Data).length != 0) {

                let index;
                for (let i = 0; i < state.user_Data.wishlist.length; i++) {
                    if (state.user_Data.wishlist[i].category === "saree") {
                        tempproduct = [...action.saree];
                    }

                    else if (state.user_Data.wishlist[i].category === "blouse") {
                        tempproduct = [...action.blouse];
                    }

                    else {
                        tempproduct = [...action.lehanga];
                    }
                    tempproduct.map((currElem) => {
                        if (currElem._id == state.user_Data.wishlist[i].id) {
                            index = state.user_Data.wishlist[i].index;
                            tempwish = [{
                                id: currElem._id,
                                name: currElem.name,
                                description: currElem.colors[index].description,
                                image: currElem.colors[index].image[0],
                                price: currElem.colors[index].price,
                                mrp: currElem.mrp,
                                color: currElem.colors[index].color,
                                index: index,
                                category: state.user_Data.wishlist[i].category,
                                size: state.user_Data.wishlist[i].size
                            }]
                            wish = wish.concat(tempwish);
                        }
                    })

                }
            }

            return {
                ...state,
                wishlist_Items: wish
            }


        case "delwishlist":

            return {
                ...state,
                user_Data: action.data,
                wishlist_Items: action.data.wishlist
            }

            case "addaddress":

            state.user_Data.address = action.address;

            return {
                ...state,

            }



        case "deladd":

            state.user_Data.address = action.address;

            return {
                ...state
            }

        case "cancel_Order":
            state.user_Data.order = action.order;
            return {
                ...state
            }


        default:
            return state
    }




}