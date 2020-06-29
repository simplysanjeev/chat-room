const passport = require('passport');
const bcyrpt = require('bcryptjs');
const User = require('../models/User');
module.exports.getLogin =  function(request, response){
    response.render('login');
}

module.exports.postLogin = function(request, response, next){
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(request, response, next);
}

module.exports.getRegister = function(request, response){
    response.render('register');
}

module.exports.postRegister = function(request, response){
    const {name, email, password, password2} = request.body;
    let errors = [];
    // Check required fields
    if(!name || !email ||  !password || !password2){
        errors.push({msg:"Please fill in all fields"});
    }
    //Check password match
    if(password !== password2){
        errors.push({msg:"Password do not match"});
    }
    //Check pass length
    if(password.length < 6){
        errors.push({msg:"Password should be at least 6 characters"});
    }

    if(errors.length > 0){
        response.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        User.findOne({email:email})
        .then(function(user){
            if(user){
                errors.push({msg: 'Email is already registered'});
                response.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });
                //Hash Password
                bcyrpt.genSalt(10, function(error, salt){
                    bcyrpt.hash(newUser.password, salt, function(error, hash){
                        if(error) throw error;
                        //Set password to hash
                        newUser.password = hash;
                        newUser.save()
                        .then(function(user){
                            request.flash('success_msg', 'You are now registered and can log in');
                            response.redirect('/users/login');
                        })
                        .catch(function(error){
                            console.log(error);
                        });
                    })
                });
            }
        });
    }
}


module.exports.postRegisterGoogle = function(request, response){
    response.render('dashboard',{
        name: request.user.name
    });
}

module.exports.logout = function(request, response){
    request.logout();
    request.flash('success_msg', 'You are logged out');
    response.redirect('/users/login');
}

module.exports.getChangePassword = function(request, response){
    console.log(request.body);
    console.log(request.user);
    response.render('change-password', {
        user: request.user
    });
}

module.exports.postChangePassword = function(request, response){
    console.log(request.body);
    const {name, email, password, password2, password3} = request.body;
    let errors = [];
    // Check required fields
    if(!name || !email ||  !password || !password2 || !password3){
        errors.push({msg:"Please fill in all fields"});
    }
    //Check password match
    if(password2 !== password3){
        errors.push({msg:"Password do not match"});
    }
    //Check pass length
    if(password2.length < 6){
        errors.push({msg:"Password should be at least 6 characters"});
    }

    if(errors.length > 0){
        response.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        User.findOne({email:email})
        .then(function(user){
            if(user){
                errors.push({msg: 'Email is already registered'});
                response.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });
                //Hash Password
                bcyrpt.genSalt(10, function(error, salt){
                    bcyrpt.hash(newUser.password, salt, function(error, hash){
                        if(error) throw error;
                        //Set password to hash
                        newUser.password = hash;
                        newUser.save()
                        .then(function(user){
                            request.flash('success_msg', 'You are now registered and can log in');
                            response.redirect('/users/login');
                        })
                        .catch(function(error){
                            console.log(error);
                        });
                    })
                });
            }
        });
    }
}