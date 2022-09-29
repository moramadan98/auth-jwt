const router = require('express').Router();
const userControler = require('../controllers/user.controler');
const auth = require('../middleware/auth');

router.post('/register' ,userControler.userRegister );


router.post('/login' , userControler.userLogin);

router.get('/me' , auth, userControler.me);


module.exports = router ;