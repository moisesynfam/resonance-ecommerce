require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('./config/passport');
const path = require('path');
const helmet = require('helmet');
// const mailer = require('./mailer');

// mailer.sendTest();
const app = express();

//middleware
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'frontend/build')))
//passport config;
passportConfig(passport);

//Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/furniture', require('./routes/api/furniture'));
app.use('/api/vendors', require('./routes/api/vendors'));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
});
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log( `App running succesfully on port ${port}`);
})