const jwtToken = require('jsonwebtoken');
const {secretKey} = require('../config/config');

const authenticate = async (req,res,next)=>{
    const bearerToken = req.headers.authorization.split(' ')[1];
    // console.log(bearerToken)
    if(!bearerToken){
        return res.status(401).json({message:'unauthorized'})
    }else{
        try{
            const verified = jwtToken.verify(bearerToken,secretKey);
            
            req.user = verified;
            next();
        }catch(error){
            res.status(400).json({error:'Invalid Token'})
        }
    }
}

module.exports = authenticate;