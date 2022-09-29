const express = require('express');
const mongoose = require('mongoose');
const config = require('config');


const app = express();
app.use(express.json())


if(!config.get('jwtPrivateKey')){
    console.log('jwtPrivateKey is not defined');
    process.exit(1)
}

app.use('/user',require('./routes/user.route'));



const port = process.env.PORT || 3000 ;
app.listen(port , ()=>{console.log(`listening to port ${port}`);})



mongoose.connect('mongodb+srv://geka98:geka98@cluster0.tltvs.mongodb.net/auth-jwt?retryWrites=true&w=majority' , {useNewUrlParser: true})
.then(()=> console.log("connected to mongodb ....."))
.catch(err => console.error("Could not connect")) 