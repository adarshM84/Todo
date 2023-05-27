const jwt = require('jsonwebtoken');

const JWT_SECRET = "dsfds$ffdd$sds$";


const fethuser = (req, res, next) => {
    //get data from jwt token and  id to req header
   
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send("Try using valid token");
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send("Try using valid token");
    }

}

module.exports = fethuser;