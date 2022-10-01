const {User , validateUser} = require('../models/user.model')
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');






const userRegister = async (req , res)=>{

    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    let user = await User.findOne({email : req.body.email});
    if(user) return res.status(400).send("user already registerd");

    user = new User(_.pick(req.body , ['name', 'email','password']));
    salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(user.password , salt);
    user.password = hashedPassword ;
    user = await user.save()
    
    const token = user.genrateUserToken();
    res.header('x-auth-token' , token)  .send(user.name);
}


const userLogin = async (req , res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send("invaled email");

        
    const validPassword = await bcrypt.compare(req.body.password , user.password)
    if(!validPassword) return res.status(400).send("invaled password");

    const token = user.genrateUserToken();
    res.header('x-auth-token' , token).send(user.name);
    
}



const me = (req,res)=>{
     let user = req.user
     res.send(user.name)
}




function validate(req){
    const schema = Joi.object({
        email : Joi.string().min(5).max(50).email().required(),
        password : Joi.string().min(5).max(50).required(),
    })

    return schema.validate(req);
}




module.exports = {
    userLogin,
    userRegister,
    me
}