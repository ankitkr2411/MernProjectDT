const filterReducer = (state, action) => {

    switch (action.type) {



        //Setting filter product
        case "FILTER_DATA":
            {
                return {
                    ...state,
                    filter_saree: action.saree,
                    filter_blouse: action.blouse,
                    filter_lehanga: action.lehanga
                }
            }

            break;


        case "Product_Search":

            let temppro = [];

            let value = action.value.toLowerCase();
            let word = action.value.split(" ");

            


            const sareefunc = () => {

                let saree  = [...action.saree];
                

                let tempsaree;
                saree.map((currElem) => {

                    for (let i = 0; i < currElem.colors.length; i++) {
                        let desc = "";
                        let descword = currElem.colors[i].description.toLowerCase().split(" ");
                        for (let w of word) {
                            if (w != "saree" && w != "blouse" && w != "lehanga" && w != "") {

                                let isAvail = false;
                                for(let dw of descword)
                                {
                                    if(dw === w)
                                    {
                                        isAvail = true;
                                        break;
                                    }
                                }

                                if (isAvail && (currElem.colors[i].description.toLowerCase()) != desc) {

                                    desc = currElem.colors[i].description.toLowerCase();
                                    tempsaree = [{
                                        product: currElem,
                                        category: "Saree",
                                        index: i
                                    }]
                                    temppro = temppro.concat(tempsaree);

                                }
                            }

                        }

                    }
                })




            }

            const blousefunc = () => {
                let  blouse  = [...action.blouse];

                let tempblouse;
                blouse.map((currElem) => {

                    for (let i = 0; i < currElem.colors.length; i++) {
                        let desc = "";
                        let descword = currElem.colors[i].description.toLowerCase().split(" ");
                        for (let w of word) {
                            if (w != "saree" && w != "blouse" && w != "lehanga" && w != "") {

                                let isAvail = false;
                                for(let dw of descword)
                                {
                                    if(dw === w)
                                    {
                                        isAvail = true;
                                        break;
                                    }
                                }

                                if (isAvail && (currElem.colors[i].description.toLowerCase()) != desc) {
                                    desc = currElem.colors[i].description.toLowerCase();
                                    tempblouse = [{
                                        product: currElem,
                                        category: "Blouse",
                                        index: i
                                    }]
                                    temppro = temppro.concat(tempblouse);

                                }
                            }

                        }

                    }
                })



            }

            const lehangafunc = () => {
                let lehanga = [...action.lehanga];

                let templehanga;
                lehanga.map((currElem) => {

                    for (let i = 0; i < currElem.colors.length; i++) {
                        let desc = "";
                        let descword = currElem.colors[i].description.toLowerCase().split(" ");
                        for (let w of word) {
                            if (w != "saree" && w != "blouse" && w != "lehanga" && w != "") {

                                let isAvail = false;
                                for(let dw of descword)
                                {
                                    if(dw === w)
                                    {
                                        isAvail = true;
                                        break;
                                    }
                                }

                                if (isAvail && (currElem.colors[i].description.toLowerCase()) != desc) {

                                    desc = currElem.colors[i].description.toLowerCase();
                                    templehanga = [{
                                        product: currElem,
                                        category: "Lehanga",
                                        index: i
                                    }]
                                    temppro = temppro.concat(templehanga);

                                }
                            }

                        }

                    }
                })


            }

            if (value.includes("saree") && value != "saree") {
                sareefunc();

            }

            if (value.includes("blouse") && value != "blouse") {
                blousefunc();
            }

            if (value.includes("lehanga") && value != "lehanga") {
                lehangafunc();

            }

            if (!value.includes("saree") && !value.includes("blouse") && !value.includes("lehanga")) {
                sareefunc();
                blousefunc();
                lehangafunc();

            }


            if (value === "saree") {
                let filtsaree = [...action.saree];
                let tempsaree;
                filtsaree.map((currElem) => {
                    tempsaree = [{
                        product: currElem,
                        category: "Saree",
                        index: 0
                    }]
                    temppro = temppro.concat(tempsaree);
                })
            }

            if (value === "blouse") {
                let filtblouse = [...action.blouse]
                let tempblouse;
                filtblouse.map((currElem) => {
                    tempblouse = [{
                        product: currElem,
                        category: "Blouse",
                        index: 0
                    }]
                    temppro = temppro.concat(tempblouse);
                })
            }

            if (value === "lehanga") {
                let filtlehanga = [...action.lehanga]
                let templehanga;
                filtlehanga.map((currElem) => {
                    templehanga = [{
                        product: currElem,
                        category: "Saree",
                        index: 0
                    }]
                    temppro = temppro.concat(templehanga);
                })
            }

            temppro = temppro.sort(() => Math.random() - 0.5);

            return {
                ...state,
                filter_search: temppro,
                search: temppro,
            }


        //Setting filter data at a time
        case "Set-Filter":

        //If filtername is sort then its value get assign to sort variable
            if (action.filtername === "sort") {

                let filter = {
                    ...state.filter,
                    category: action.category,
                    [action.filtername]: action.value
                }


                return {
                    ...state,

                    filter: filter,
                }

            }


            //If filtername is anything else then its value get concated to their respective aaray
            else {

                
                if (action.filtername === "price") {
                    let arr = state.filter.price.concat(action.value)



                    let filter = {
                        ...state.filter,
                        category: action.category,
                        price: arr
                    }


                    return {
                        ...state,
                        filter: filter,
                    }

                }

                if (action.filtername === "size") {
                    let arr = state.filter.size.concat(action.value)




                    let filter = {
                        ...state.filter,
                        category: action.category,
                        size: arr
                    }


                    return {
                        ...state,
                        filter: filter,
                    }

                }

                else {

                    let arr = state.filter.color.concat(action.value)

                    let filter = {
                        ...state.filter,
                        category: action.category,
                        color: arr
                    }


                    return {
                        ...state,
                        filter: filter,
                    }

                }

            }

            return {
                ...state,
            }


        //Remove a filter at a time
        case "Remove-Filter":


            if (action.filtername === "price") {

                //Assigning price array to arr
                let arr = state.filter.price;

                //Deleting the value of filter from its array
                //finding index of the value from array and deleting it
                delete arr[state.filter.price.indexOf(action.value)];




                let filter = {
                    ...state.filter,
                    category: action.category,
                    price: arr
                }


                return {
                    ...state,
                    filter: filter,
                }

            }

            if (action.filtername === "size") {
                let arr = state.filter.size;


                delete arr[state.filter.size.indexOf(action.value)];


                let filter = {
                    ...state.filter,
                    category: action.category,
                    size: arr
                }


                return {
                    ...state,
                    filter: filter,
                }

            }

            else {

                let arr = state.filter.color;


                delete arr[state.filter.color.indexOf(action.value)];

                let filter = {
                    ...state.filter,
                    category: action.category,
                    color: arr
                }


                return {
                    ...state,
                    filter: filter,
                }

            }



            return {
                ...state,
            }


        //Filtering Data according to filter
        case "Filter-Products":

            //Final filtered data will be assined here
            let newfilterData = [];

            //Temporary variable for all product
            let tempfilterProduct = [];

            //It is to check if none of the filter is applied,\.
            //It is to solve the problem if filtered product is empty then only assign the empty array Otherwise not
            let checkdata = false;


            //Adding product to temporary variable according to category
            if (state.filter.category == "saree") {
                let { saree } = action;
                tempfilterProduct = [...saree];

            }

            if (state.filter.category == "blouse") {
                let { blouse } = action;
                tempfilterProduct = [...blouse];

            }

            if (state.filter.category == "lehanga") {
                let { lehanga } = action;
                tempfilterProduct = [...lehanga];

            }

            if (state.filter.category == "search") {

                let { search } = state;
                tempfilterProduct = [...search];

            }

            

            //This function filter according to color passed
            const filtercolor = (color) => {

                //As search product element has three field (i)product object (ii)product category (iii)index of searched colour
                //Other product element only has product object inside it therefore to acces product in search product is different 
                if(state.filter.category === "search")
                {
                    return tempfilterProduct.filter((prod) => {

                        //Traversing color array inside product object
                        for (let i = 0; i < prod.product.colors.length; i++) {

                            //Getting color name of current index
                            let currElem = prod.product.colors[i];

                            //checking if any index color matched
                            if (currElem.color.toLowerCase() === color.toLowerCase()) {

                                //Creating or updating new key in product object index which tells the index of color so that same colour
                                //photo will be shown on list
                                prod.index = i;
                                //returning true so that this product can be filtered
                                return true;


                            }
                            
                        }
                    })

                }

                else{
                    //Filtering out each product according to color and return
                    return tempfilterProduct.filter((prod) => {

                        //Traversing color array
                        for (let i = 0; i < prod.colors.length; i++) {

                            //Getting color name of current index
                            let currElem = prod.colors[i];

                            //checking if any index color matched
                            if (currElem.color.toLowerCase() === color.toLowerCase()) {

                                //Creating new key in product object index which tells the index of color so that same colour
                                //photo will be shown on list
                                prod.index = i;
                                //returning true so that this product can be filtered
                                return true;


                            }
                            
                        }
                    })
                }

            }

            const filtersize = (size, productdata) => {

                if(state.filter.category === "search"){
                    return productdata.map((prod) => {

                            //Saree object doesn't have any size field so whenever any product comes with saree category will
                            //be added to search product for all size cases in else
                            if(prod.category !== "Saree")
                            {
                                //Here doesn't requirement of checking each index.
                                //Index already saved in searched product data for which user has searched.
                                //So we check only for requested color index.
                                for (let currElem of prod.product.colors[prod.index].sizes) {
    
                                    if (currElem.size.toLowerCase() == size.toLowerCase() && currElem.stock > 0) {
                                        
                                        
                                        return prod.product._id;
        
        
                                    }
        
                                }

                            }
                            else{
                                return prod.product._id;

                            }
                            
                    })
                }

                else{
                    return productdata.map((prod) => {

                        for (let i = 0; i < prod.colors.length; i++) {
                            for (let currElem of prod.colors[i].sizes) {
    
                                if (currElem.size.toLowerCase() == size.toLowerCase() && currElem.stock > 0) {
    
                                    prod.index = i;
                                    return prod._id;
    
    
                                }
    
                            }
    
                        }
                    })
                }

                
                
            }

            const filterprice = (minprice, maxprice, productdata) => {

                if(state.filter.category === "search"){
                    return productdata.filter((prod) => {
                     
                            let currElem = prod.product.colors[prod.index];
    
    
                            if (currElem.price >= minprice && currElem.price < maxprice) {
    
           
                                return true;  
                            }
    
                        
                    })

                }

                else{
                    return productdata.filter((prod) => {
                        for (let i = 0; i < prod.colors.length; i++) {
                            let currElem = prod.colors[i];
    
    
                            if (currElem.price >= minprice && currElem.price < maxprice) {
    
                                prod.index = i;
                                return true;
    
    
                            }
    
    
    
                        }
                    })
                }

                

            }



            //Traversing filter object and checking each filtername and applying filter according to values in their array
            for (let elem in state.filter) {
                if (elem === "category") {
                    continue;
                }

                if (elem === "color") {

                    //This array will concat product filtererd out for each value in color array
                    let tempcolor = [];

                    //this is to check if none of the filter is applied for each filter
                    let checkcol = false;


                    //Traversing each value in array and filtering product
                    for (let j in state.filter.color) {

                        //Getting element of array for each index
                        let col = state.filter.color[j];

                        if (col === "red") {

                            //If any of the value matched means user requested filter so make both true to add them in newfilterproduct
                            //Even if filtered product is empty 
                            checkdata = true;
                            checkcol = true;



                             //Filtering out each product according to color
                            let tempcat = filtercolor("red");


                            // Concating with already pre-requested filtered color
                            tempcolor = tempcolor.concat(tempcat)

                        }

                        if (col === "pink") {
                            checkdata = true;
                            checkcol = true;
                           
                            let tempcat = filtercolor("pink");

                            tempcolor = tempcolor.concat(tempcat)

                        }

                        if (col === "yellow") {
                            checkdata = true;
                            checkcol = true;
                            let tempcat = filtercolor("yellow");

                            tempcolor = tempcolor.concat(tempcat)

                        }

                        if (col === "green") {
                            checkdata = true;
                            checkcol = true;

                            let tempcat = filtercolor("green");

                            tempcolor = tempcolor.concat(tempcat)

                        }

                        if (col === "white") {
                            checkdata = true;
                            checkcol = true;

                            let tempcat = filtercolor("white");

                            tempcolor = tempcolor.concat(tempcat)

                        }

                    }


                    //if its is false means none of the filter us applied so doesn't assign
                    if (checkcol) {
                        newfilterData = tempcolor;

                    }




                }

                if (elem === "size") {

                    let tempsize = [];
                    let checksize = false;


                    //if any of the filter is applied then product is filtered out from new filter data
                    //Above in color we have not used it because color is first filter so initially new filterdata variable will be always empty
                    if (checkdata) {
                        for (let j in state.filter.size) {

                            let el = state.filter.size[j];

                            if (el === "S") {
                                checksize = true;

                                //here product is filtered out from new filtered data
                                let tempcat = filtersize(el,newfilterData);

                                tempsize = tempsize.concat(tempcat)

                            }

                            if (el === "M") {
                                checksize = true;

                                let tempcat = filtersize(el,newfilterData);
                                tempsize = tempsize.concat(tempcat)

                            }

                            if (el === "L") {
                                checksize = true;
                                let tempcat = filtersize(el,newfilterData);

                                tempsize = tempsize.concat(tempcat)

                            }

                            if (el === "XL") {
                                checksize = true;
                                let tempcat = filtersize(el,newfilterData);

                                tempsize = tempsize.concat(tempcat)

                            }





                        }

                    }


                    //if none of the filter is applied yet then product is filtered out from all product
                    else {
                        for (let j in state.filter.size) {

                            let el = state.filter.size[j];

                            if (el === "S") {
                                checkdata = true;
                                checksize = true;

                                //Here product is filtered from all product
                                let tempcat = filtersize(el,tempfilterProduct);

                                tempsize = tempsize.concat(tempcat)

                            }

                            if (el === "M") {
                                checkdata = true;
                                checksize = true;

                                let tempcat = filtersize(el,tempfilterProduct);

                                tempsize = tempsize.concat(tempcat)

                            }

                            if (el === "L") {
                                checkdata = true;
                                checksize = true;
                                let tempcat = filtersize(el,tempfilterProduct);

                                tempsize = tempsize.concat(tempcat)

                            }

                            if (el === "XL") {
                                checkdata = true;
                                checksize = true;
                                let tempcat = filtersize(el,tempfilterProduct);

                                tempsize = tempsize.concat(tempcat)

                            }

                        }

                    }


                    //If size filter applied
                    if (checksize) {

                        //As there may be same product available after sort for different size such as S and M two product with 
                        //same Id so show them in list only one
                        //Getting unique product Id
                        let uniquecat = [...new Set(tempsize)]

                        if(state.filter.category === "search")
                        {
                            //Filtering product from unique product id
                            newfilterData = tempfilterProduct.filter((currElem) => {
                                for (let i = 0; i < uniquecat.length; i++) {
                                    if (currElem.product._id === uniquecat[i]) {
                                        return true;
                                    }
                                }
                            })

                        }
                        else{
                            newfilterData = tempfilterProduct.filter((currElem) => {
                                for (let i = 0; i < uniquecat.length; i++) {
                                    if (currElem._id === uniquecat[i]) {
                                        return true;
                                    }
                                }
                            })
    

                        }
                        
                        


                    }



                }

                if (elem === "price") {


                    let tempprice = [];
                    let checkprice = false;

                    if (checkdata) {
                        for (let j in state.filter.price) {

                            let el = state.filter.price[j];

                            if (el === "<500") {
                                checkprice = true;

                                let tempcat = filterprice(0,500,newfilterData);

                                tempprice = tempprice.concat(tempcat)

                            }

                            if (el === "500-1500") {
                                checkprice = true;

                                let tempcat = filterprice(500,1500,newfilterData);

                                tempprice = tempprice.concat(tempcat)

                            }

                            if (el === "1500-3000") {
                                checkprice = true;

                                let tempcat = filterprice(1500,3000,newfilterData);

                                tempprice = tempprice.concat(tempcat)

                            }

                            if (el === "3000-5000") {
                                checkprice = true;

                                let tempcat = filterprice(3000,5000,newfilterData);

                                tempprice = tempprice.concat(tempcat)

                            }

                            if (el === ">5000") {
                                checkprice = true;

                                let tempcat = filterprice(5000,500000,newfilterData);

                                tempprice = tempprice.concat(tempcat)

                            }







                        }

                    }

                    else {
                        for (let j in state.filter.price) {

                            let el = state.filter.price[j];

                            if (el === "<500") {
                                checkdata = true;
                                checkprice = true;

                                let tempcat = filterprice(0,500,tempfilterProduct);

                                tempprice = tempprice.concat(tempcat)

                            }

                            if (el === "500-1500") {
                                checkdata = true;
                                checkprice = true;

                                let tempcat = filterprice(500,1500,tempfilterProduct);

                                tempprice = tempprice.concat(tempcat)

                            }

                            if (el === "1500-3000") {
                                checkdata = true;
                                checkprice = true;

                                let tempcat = filterprice(1500,3000,tempfilterProduct);

                                tempprice = tempprice.concat(tempcat)

                            }

                            if (el === "3000-5000") {
                                checkdata = true;
                                checkprice = true;

                                let tempcat = filterprice(3000,5000,tempfilterProduct);

                                tempprice = tempprice.concat(tempcat)

                            }

                            if (el === ">5000") {
                                checkdata = true;
                                checkprice = true;

                                let tempcat = filterprice(5000,500000,tempfilterProduct);

                                tempprice = tempprice.concat(tempcat)

                            }






                        }

                    }



                    if (checkprice) {
                        newfilterData = tempprice;

                    }





                }

                if (elem === "sort") {

                    //If sort is "" then user not requested anything
                    if (state.filter.sort != "") {


                        const sortingProducts = (a, b) => {

                            if(state.filter.category === "search")
                            {
                                if (state.filter.sort === "none") {
                                    return a.product._id.localeCompare(b.product._id)
                                }
    
                                if (state.filter.sort === "lh") {
                                    return a.product.colors[0].price - b.product.colors[0].price;
                                }
    
                                if (state.filter.sort === "hl") {
                                    return b.product.colors[0].price - a.product.colors[0].price;
                                }
    
                                if (state.filter.sort === "az") {
                                    return a.product.name.localeCompare(b.product.name)
                                }
    
                                if (state.filter.sort === "za") {
                                    return b.product.name.localeCompare(a.product.name)
                                }

                            }

                            else{
                                if (state.filter.sort === "none") {
                                    return a._id.localeCompare(b._id)
                                }
    
                                if (state.filter.sort === "lh") {
                                    return a.colors[0].price - b.colors[0].price;
                                }
    
                                if (state.filter.sort === "hl") {
                                    return b.colors[0].price - a.colors[0].price;
                                }
    
                                if (state.filter.sort === "az") {
                                    return a.name.localeCompare(b.name)
                                }
    
                                if (state.filter.sort === "za") {
                                    return b.name.localeCompare(a.name)
                                }
                            }

                            
                        }


                        //If yet product is not filtered then we will filter product from all products
                        if (!checkdata) {

                        
                                newfilterData = tempfilterProduct.sort(sortingProducts);
                        }


                        else {

                                newfilterData = newfilterData.sort(sortingProducts);

                            
                        }

                    }



                }


            }



            //If not any filtered applied or suppose filter object reset or page loads then assign all product
            if (!checkdata) {
                newfilterData = tempfilterProduct;
            }



            if (state.filter.category == "saree") {
                return {
                    ...state,
                    filter_saree: newfilterData,
                }

            }

            if (state.filter.category == "blouse") {
                return {
                    ...state,
                    filter_blouse: newfilterData,
                }

            }

            if (state.filter.category == "lehanga") {

                return {
                    ...state,
                    filter_lehanga: newfilterData,
                }

            }

            if (state.filter.category == "search") {

                return {
                    ...state,
                    filter_search: newfilterData,
                }

            }

            return {
                ...state
            }



        case "Reset-Filter":


            let filter = {
                ...state.filter,
                color: [],
                size: [],
                price: [],
                sort: ""

            }

            return {
                ...state,
                filter: filter,
            }



        default:
            return state;
    }



}


export default filterReducer;