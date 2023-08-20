const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    phone: {
        type: Number,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    cpassword: {
        type: String,
        required: true,
    },

    address: [
        {
            name: {
                type: String
            },

            phone: {
                type: String
            },

            pincode: {
                type: Number
            },

            state: {
                type: String
            },

            add: {
                type: String,
            },

            town: {
                type: String
            },

            district: {
                type: String
            },

            defaultvalue: {
                type: Boolean,
            }


        }
    ],

    carts: [
        {
            //object 
            id: {
                type: String,

            },

            colors: {
                type: String,

            },

            index: {
                type: Number,

            },

            size:
            {
                type: String,
            },

            quantity: {
                type: Number,
            },

            category: {
                type: String,
            }
        }
    ],

    wishlist: [
        {
            id: {
                type: String,
            },

            color: {
                type: String,
            },

            index: {
                type: Number,

            },

            size: {
                type: String,
            },
            category: {
                type: String,
            }

        }
    ],

    order: [
        {
            orderId: {
                type: String,
            },

            txtId: {
                type: String,
            },

            totalprice: {
                type: Number,
            },

            address:
            {
                name: {
                    type: String
                },

                phone: {
                    type: String
                },

                pincode: {
                    type: Number
                },

                state: {
                    type: String
                },

                add: {
                    type: String,
                },

                town: {
                    type: String
                },

                district: {
                    type: String
                }
            },

            products: [
                {
                    id: {
                        type: String,

                    },

                    name: {
                        type: String,

                    },

                    description: {
                        type: String,

                    },

                    price: {
                        type: Number,

                    },

                    mrp: {
                        type: Number,

                    },

                    discount: {
                        type: String,

                    },

                    image: {
                        type: String,

                    },

                    colors: {
                        type: String,

                    },

                    size:
                    {
                        type: String,
                    }
                    ,

                    quantity: {
                        type: Number,
                    },

                    category: {
                        type: String,
                    },

                    deliverydate: {
                        type: String
                    },

                    status: {
                        type: String
                    }






                }
            ]


        }
    ],

    tokens: [
        {
            token: {
                type: String,
            }
        }
    ]


})

//Doing bycrypt. Here it will always runs whenever a row is created
//and before 'save' function as pre is used. Whenever it runs whole row data is
//passed here therefore this keyword is used.
//Here is Modified is used as whenever row contains password or password modified
//then only perform tha task as because may row doesnt contain password say updating cart then 
//without any reason it shows error as password is not present in row.

userSchema.pre('save', async function (next) {

    if (this.isModified('password')) {



        //assigning cryptedpassword value to itself
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }

    next();

})

//Generating token
//here with userSchema we are creating a function which can we called by its row
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);

        //assigning/updating token value to itself
        this.tokens = this.tokens.concat({ token: token });
        await this.save();

        return token;

    } catch (err) {
        console.log(err);

    }
}

userSchema.methods.addcartItem = async function (item) {
    try {
        //to change single field of object
        // this.carts = this.carts.concat({cart : name});

        // const usercart = await User.findOne({ carts: {$elemMatch:{id: item.id, colors: item.colors }} });

        let cart = [...this.carts];



        const checkitem = cart.filter((currElem) => {
            return currElem.id === item.id && currElem.colors === item.colors && currElem.size === item.size;
        });




        if (checkitem.length > 0) {

            for (let i = 0; i < cart.length; i++) {
                if (this.carts[i].id === item.id && this.carts[i].colors === item.colors && this.carts[i].size === item.size) {

                    this.carts[i].quantity = this.carts[i].quantity + 1;
                    break;
                }
            }
            // const quantupdate = await User.updateOne({ carts: {$elemMatch: {id:item.id, colors:item.colors}}  }, {$set: {"carts.$.quantity": 2 }});
        }

        else {
    
            item.quantity = 1;
            this.carts = this.carts.concat(item);
        }

        await this.save();

        return this;
    } catch (err) {
        console.log(err);

    }
}


userSchema.methods.delcartitem = async function (item) {
    try {
        let tempcart = [];
        let j = 0;

        for (let i = 0; i < this.carts.length; i++) {
            if (this.carts[i].id == item.id && this.carts[i].colors == item.color && this.carts[i].size == item.size) {
 

            }

            else {
                tempcart[j] = this.carts[i];
                j++;
            }
        }

        this.carts = tempcart;
        await this.save();

        return this;
    }
    catch (err) {

    }
}





userSchema.methods.updatequant = async function (item) {

    try {
        for (let i = 0; i < this.carts.length; i++) {
            if (this.carts[i].colors == item.colors && this.carts[i].id == item.id && this.carts[i].size == item.size ) {

                this.carts[i].quantity = item.quantity;
                break;

            }
        }

        await this.save();

        return this;
    } catch (err) {
        console.log(err);

    }
}


userSchema.methods.addadress = async function (address) {
    try {

        if (this.address.length == 0) {
            address.defaultvalue = true;
        }

        else if (address.defaultvalue == true) {
            for (let i = 0; i < this.address.length; i++) {
                if (this.address[i].defaultvalue == true) {
                    this.address[i].defaultvalue = false;
                    break;
                }

            }
        }


        this.address = this.address.concat(address);
        await this.save();

        return this;

    } catch (err) {

        console.log(err);

    }
}


userSchema.methods.addorder = async function (order) {
    try {

        let temporder = [order];

        this.carts = [];
        this.order = this.order.concat(temporder);
        await this.save();

        return this;
    } catch (error) {
        console.log(error);

    }
}


userSchema.methods.addwishlist = async function (item) {
    try {
        let tempwish = [];
        let j = 0;

        for (let i = 0; i < this.wishlist.length; i++) {
            if (this.wishlist[i].id == item.id && this.wishlist[i].color == item.color && this.wishlist[i].size == item.size) {
 

            }

            else {
                tempwish[j] = this.wishlist[i];
                j++;
            }
        }

        this.wishlist = tempwish;
        this.wishlist = this.wishlist.concat(item);
        await this.save();
        return this;

    }
    catch (err) {
        console.log(err);
    }
}


userSchema.methods.delwish = async function (item) {
    try {
        let tempwish = [];
        let j = 0;

        for (let i = 0; i < this.wishlist.length; i++) {
            if (this.wishlist[i].id == item.id && this.wishlist[i].color == item.colors && this.wishlist[i].size == item.size) {
    

            }

            else {
                tempwish[j] = this.wishlist[i];
                j++;
            }
        }

        this.wishlist = tempwish;
        await this.save();

        return this;
    }
    catch (err) {
        console.log(err);
    }
}


userSchema.methods.deladd = async function (id) {

    try {
        let tempadd = [];
        let j = 0;

        for (let i = 0; i < this.address.length; i++) {
            if (this.address[i]._id == id.id) {

            }

            else {
                tempadd[j] = this.address[i];
                j++;
            }
        }

        this.address = tempadd;
        await this.save();

        return this;
    }
    catch (err) {
        console.log(err);
    }

}



userSchema.methods.upadd = async function (address) {
    try {


        let { name, phone, pincode, state, add, town, district, defaultvalue } = address;

        if (address.defaultvalue == true) {
            for (let i = 0; i < this.address.length; i++) {
                if (this.address[i].defaultvalue == true) {
                    this.address[i].defaultvalue = false;

                    break;
                }

            }
        }


        for (let i = 0; i < this.address.length; i++) {
            if (this.address[i]._id == address.id) {
                this.address[i] = { name, phone, pincode, state, add, town, district, defaultvalue };
                break;
            }

        }


        await this.save();

        return this;

    } catch (err) {

        console.log(err);

    }
}

userSchema.methods.cancelorder = async function (item) {
    try {
       
        let check = 0;

        for(let i=0;i<this.order.length;i++)
        {
            
            if(this.order[i].orderId == item.orderid)
            {
                
                
                for(let j=0;j<this.order[i].products.length;j++)
                {
                    
                    if(this.order[i].products[j].id == item.id && this.order[i].products[j].colors == item.color && this.order[i].products[j].size == item.size)
                    {
                        this.order[i].products[j].status = "Cancelled";
                        check = 1;
                        break;
                    }
                }
            }

            if(check == 1)
            {
                break;
            }
        }


        await this.save();

        return this.order;
    }
    catch (err) {
        console.log(err);
    }
}








//created collection name SAREE and we can access it through Saree
const User = mongoose.model('USER', userSchema);

module.exports = User;


