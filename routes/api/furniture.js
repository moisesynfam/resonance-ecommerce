const express = require('express');
const router = express.Router();
const db = require('../../config/airtable');


router.get('/', (req, res) => {

    const { page, perPage } = req.query;
    const itemsPerPage = perPage? parseInt(perPage) : 10;
    let pageNumber = page? parseInt(page) : 1;
    let totalRecords = [];
    db('Furniture').select({
    
    }).eachPage( (records, fetchNextPage) => {
       totalRecords = [...totalRecords, ...records];
       fetchNextPage();

    }, (err ) => {
        if(err) throw err;
        totalRecords = totalRecords.filter(( record => !!record.get('Picture')));

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

module.exports = router;