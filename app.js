const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const passportGoogle = require('./config/passport-google-outh2-strategy');
const app = express();
//For Css, javascripts
app.use(express.static('./assets'));

//EJS 
app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

// Bodyparser
app.use(express.urlencoded({extended:false}));

//Expess Session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
// Connect flash
app.use(flash());

//Global Vars
app.use(function(request, response, next){
    response.locals.success_msg = request.flash('success_msg');
    response.locals.error_msg = request.flash('error_msg');
    response.locals.error = request.flash('error');
    next();
})

//Routes
app.use('/', require('./routes'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, function(error){
    if(error){
        console.log(`Error in loading the server ${error}`);
        return;
    }
    console.log(`Server is up and running on port: ${PORT}`);
});