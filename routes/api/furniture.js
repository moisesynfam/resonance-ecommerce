const express = require('express');
const router = express.Router();
const db = require('../../config/airtable');
const passport = require('passport');
const { formatItemForMail } = require('../../utils');
const mailer = require('../../mailer');
const _ = require('lodash');

router.get('/', (req, res) => {

    const { page, perPage, type, setting, material } = req.query;
    const itemsPerPage = perPage? parseInt(perPage) : 10;
    let pageNumber = page? parseInt(page) : 1;
    let totalRecords = [];
    db('Furniture').select({
    
    }).eachPage( (records, fetchNextPage) => {
       totalRecords = [...totalRecords, ...records];
       fetchNextPage();

    }, (err ) => {
        if(err) throw err;
        totalRecords = totalRecords.filter(( record => {
            if(!!!record.get('Picture')) return false;
            let typeMatched = true;
            let settingMatched = true;
            let materialMatched = true;
           
            if(type) typeMatched = record.get('Type') === type ; 
            if(setting) settingMatched = _.indexOf(record.get('Settings'), setting) >= 0;
            if(material) materialMatched = _.indexOf(record.get('Materials and Finishes'), material) >= 0;
            return typeMatched && settingMatched && materialMatched;
            
        }));

        //Pagination logic
        const numberOfItems = totalRecords.length;
        const numberOfPages = Math.ceil( numberOfItems / itemsPerPage);
        pageNumber = pageNumber > numberOfPages? numberOfPages : pageNumber;
        const pageFirstIndex = (pageNumber - 1) * itemsPerPage;
        const pageLastIndex = pageFirstIndex + itemsPerPage;
        const items = totalRecords.slice(pageFirstIndex, pageLastIndex).map((record) => (record._rawJson))

        res.json({ 
            success: true, 
            pagination: {
                totalItems: numberOfItems,
                totalPages: numberOfPages,
                currentPage: pageNumber,
                itemsPerPage: itemsPerPage
            },
            furniture: items,
           
           
        });
    })

});

router.get('/emailItem', passport.authenticate('jwt', { session: false}), (req, res) => {
    if(!req.query.itemId) return res.status(400).json({ success: false, message: 'Missing item ID.'});
    db('Furniture').find( req.query.itemId, (err, record) => {
        if(err){
            console.error(err)
            return res.status(500).send();
        } 
        const user = req.user;
        mailer.sendItemMail(user.email, user.firstName, formatItemForMail(record._rawJson));
        res.json({success: 'true', message: 'E-mail sent!'})
    })
})

router.get('/:id', (req, res) => {

    const { id } = req.params;
    db('Furniture').find(id, (err, record) => {
        if(err) throw err;
        res.json({ success: true, item: record._rawJson});

    })
})


module.exports = router;