require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('./config/passport');


const UserRoutes = require('./routes/api/users');
const FurnitureRoutes = require('./routes/api/furniture');

const app = express();

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());

//passport config;
passportConfig(passport);

//Routes
app.use('/api/users', UserRoutes);
app.use('/api/furniture', FurnitureRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log( `App running succesfully on port ${port}`);
})