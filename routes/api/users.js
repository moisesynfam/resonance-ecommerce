const express = require('express');
const router = express.Router();
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/airtable');
const keys = require('../../config/keys');
const isEmpty = require('is-empty');
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.get('/list', (req, res) => {
    db('Users').select({
        // Selecting the first 3 records in Grid view:
        // filterByFormula: `OR( email = "cesar@resonance.nycs", username = "")`,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
    
        return res.json(records[0].get("First Name"))
    
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return res.json(err); }
    });
});

router.post('/register', (req, res) => {
    console.log({body: req.body})
    const { errors, isValid } = validateRegisterInput(req.body);

    //check basic validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    //check if an User exists with these credentials.
    let usersFound = [];
    db('Users').select({
        // Selecting the first 3 records in Grid view:
        filterByFormula: `OR( email = "${req.body.email}", username = "${req.body.username}")`,
        view: "Grid view"
    }).firstPage( ( err,records) => {
              
        if (err) { console.error(err); return res.status(500).json(err); }
        if(!isEmpty(records)) 
            return res.status(400).json({ email: 'A user with this email already exists'});
        
        //Encrypt the password and store the new user
        bycrypt.genSalt(10, (err, salt) => {
            bycrypt.hash(req.body.password, salt, (err, hash) => {
                if(err) throw err;

                db('Users').create({
                    "Password": hash,
                    "First Name": req.body.firstName,
                    "Last Name": req.body.lastName,
                    "email": req.body.email,
                    "username": req.body.username
                }, (err, record) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json(err);
                    }

                    return res.json({ user: record})
                });                
                
            });
        });
    
    });
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) return res.status(400).json(errors);
    
    const { username, password } = req.body;

    db('Users').select({
        filterByFormula: `username = "${username}"`
    }).firstPage( (err, records) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        if(isEmpty(records))
            return res.status(400).json({ username: "Username not found"});
        const user = records[0];
        bycrypt.compare(password, user.get('Password'), (err, success) => {
            if(err) throw err;

            if(!success) return res.status(400).json({password: "Password incorrect"});

            const jwtPaylod = {
                username: user.get('username'),
                id: user.getId(),
                firstName: user.get('First Name'),
                lastName: user.get('Last Name')
            };
            jwt.sign( jwtPaylod, keys.JWT_SECRET_KEY,{
                expiresIn: 3600
            }, (err, token) => {
                if(err) throw err;

                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
            })
        })
        
    })
})

module.exports = router;