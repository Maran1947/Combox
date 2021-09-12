const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, 'combox secret', (err, decodedToken)=> {
            if(err) {
                console.log(err.message);
                req.redirect('/login');
            } else {
                // console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}

// check current user
const checkUser = (req,res,next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, 'combox secret', async (err, decodedToken)=> {
            if(err) {
                console.log(err.message);
                next();
            } else {
                // console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };