const express = require('express');
const router = express.Router();
const db = require('../../config/airtable');

router.get('/', (req, res) => {

    db('Furniture').select({

    }).firstPage( (err, records) => {
        
        if(err) throw err;

        res.json({ success: true, furniture: records.map( (record) => (record._rawJson)) });

    })

});

module.exports = router;