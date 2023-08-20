const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");
const authenticate = require("../middleware/authenticate");

app.use(cookieParser());


require('../DB/conn');
const User = require("../model/userSchema");
const Saree = require("../model/sareeSchema");
const Blouse = require("../model/blouseSchema");
const Lehanga = require("../model/lehangaSchema");



//to fetch all saree data
router.post('/saree', async (req, res) => {


    try {

        const sareeProduct = await Saree.find();

        if (sareeProduct) {

            res.send(sareeProduct);
        }

    }

    catch (err) {

        console.log(err);

    }




})



router.post('/blouse', async (req, res) => {


    try {
 
        const blouseProduct = await Blouse.find();

        if (blouseProduct) {
            res.send(blouseProduct);
        }

    }

    catch (err) {

        console.log(err);

    }
})

router.post('/lehanga', async (req, res) => {


    try {

        const lehangaProduct = await Lehanga.find();

        if (lehangaProduct) {
            res.send(lehangaProduct);
        }

    }

    catch (err) {

        console.log(err);

    }
})


//User registration
router.post('/signin', async (req, res) => {


    const { name, phone, email, password, cpassword } = req.body;

    if (!name || !phone || !email || !password || !cpassword) {
        return res.status(420).json({ error: "Fill all data" });
    }

    try {

        //it return a data or null
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(421).json({ error: "email already exist" });
        }

        else if (password != cpassword) {
            return res.status(422).json({ error: "Password not same" });

        }

        else {

            const user = new User({ name, phone, email, password, cpassword });




            const registered = await user.save();

            if (registered) {
                res.status(201).json({ message: "Registered Successfully" });
            }

            else {
                res.statusMessage(500).json({ error: "Something Went Wrong" });
            }

        }



    } catch (err) {

        console.log(err);

    }
})


//User Login
router.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(401).json({ error: "Fill all data" });
        }

        const userLogin = await User.findOne({ email: email });

   

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credential" });
            }

            else {
                const token = await userLogin.generateAuthToken();




                res.cookie('jwtoken', token,
                    {

                        expires: new Date(Date.now() + 25892000000),
                        httpOnly: true
                        //dafaulty it runs on https, as we are working with http not https

                    });



                const { name, phone, email, carts , order, wishlist, address } = userLogin;

                res.status(200);
                res.send({ name, phone, email, carts, order, wishlist, address });
            }


        }

        else {
            res.status(400).json({ error: "Invalid Credential" });
        }




    } catch (err) {
        console.log(err);


    }
})


//Cart authetication
router.get("/cart", authenticate, (req, res) => {
    res.send(req.rootUser);

});


router.get("/logout", (req, res) => {


    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).send({ "status": "User logout" });


})

router.get("/loggedin", authenticate, (req, res) => {
    let userobj = {
        name:req.rootUser.name, 
        phone:req.rootUser.phone, 
        email:req.rootUser.email, 
        carts:req.rootUser.carts, 
        order:req.rootUser.order, 
        wishlist:req.rootUser.wishlist, 
        address:req.rootUser.address
    }

    userobj = JSON.stringify(userobj);


    res.send(userobj);
})


router.post("/addcart", authenticate, async (req, res) => {
    const item = req.body;
    const user = req.rootUser;


    
     const data= await user.addcartItem(item);

     res.status(200).json(data);
})


router.post("/delcart", authenticate, async(req, res) => {
    const user = req.rootUser;
    

    const data= await user.delcartitem(req.body);


    res.status(200).json(data);
})

router.post("/carttowish", authenticate, async(req, res) => {
    const user = req.rootUser;
    
    let data = await user.addwishlist(req.body);
    data= await user.delcartitem(req.body);



    res.status(200).json(data);
})

router.post("/updatequant", authenticate, async(req, res) => {
    const user = req.rootUser;
    const data= await user.updatequant(req.body);

   res.status(200).json(data);
})

router.post("/addadress", authenticate, async(req, res)=>{

    const user = req.rootUser;
    const data= await user.addadress(req.body);
    res.status(200).json(data);

})

router.post("/addorder", authenticate, async(req,res)=>{
    const user = req.rootUser;
    const data = await user.addorder(req.body);

    res.status(200).json(data);
})

router.post("/addtowishlist", authenticate, async (req,res)=>{
    const user = req.rootUser;
    const data = await user.addwishlist(req.body);
 

    res.status(200).json(data);

} )


router.post("/delwish", authenticate,  async(req,res) =>{
    const user = req.rootUser;


    const data= await user.delwish(req.body);

    res.status(200).json(data);

})


router.post("/deladd", authenticate,  async(req,res) =>{
    const user = req.rootUser;

    const data= await user.deladd(req.body);

    res.status(200).json(data);

})

router.post("/updateadress", authenticate,  async(req,res) =>{
    const user = req.rootUser;

    const data= await user.upadd(req.body);

    res.status(200).json(data);

})

router.post("/cancelorder", authenticate,  async(req,res) =>{
    const user = req.rootUser;


    const data= await user.cancelorder(req.body);

    res.status(200).json(data);

})


module.exports = router;