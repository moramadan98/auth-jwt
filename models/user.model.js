const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name : {
        type : String ,
        minleangth: 5,
        maxleangth :50,
        required : true,
        trim : true
    },
    email : {
        type : String ,
        minleangth: 5,
        maxleangth :50,
        required : true,
        trim : true,
        unique : true
    },
    password : {
        type : String ,
        minleangth: 8,
        maxleangth :50,
        required : true,
        trim : true
    }
});

function validateUser(user){
    const schema = Joi.object({
        name : Joi.string().min(5).max(50).required(),
        email : Joi.string().min(5).max(50).email().required(),
        password : Joi.string().min(5).max(50).required(),
    })

    return schema.validate(user);
}


userSchema.methods.genrateUserToken = function(){
    return jwt.sign({_id : this._id , name : this.name} , config.get( 'jwtPrivateKey'))
}



const User = mongoose.model('user' , userSchema);


module.exports = { User , validateUser}