const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req ,res ,next){
    const token = req.header('x-auth-token');
    if(!token) res.status(401).send("access denied");

    try {
        payload = jwt.verify(token , config.get( 'jwtPrivateKey'));
        req.user = payload ;
        next()
    } catch (error) {
        res.status(400).send('invalid token')
    }

    

}



module.exports = auth ;