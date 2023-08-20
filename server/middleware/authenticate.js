const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const authenticate = async (req, res, next) => {
    try {

        const token = req.cookies.jwtoken;
     
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

        if (!rootUser) { res.status(401).send({"Unauthorized": "No token provided"}); }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        //this next means when cursor reaches here then go next i.e. go to cart page
        next();

    }
    catch (err) {
        res.status(401).send({"Unauthorized": "No token provided"});
   
    }

}

module.exports = authenticate;