const express = require('express');
const router = express.Router();
const db = require('../../config/airtable');


router.get('/', (req, res) => {

    db('Vendors').select({
        fields: ["Name", "Logo", "Vendor Phone Number", "Closest Showroom Address", "Catalog Link"]
    }).firstPage( (err, records) => {
        if(err) throw err;

        res.json({ success: true, vendors: records.map( record => record._rawJson ) });

    });

});

router.get('/:id', (req, res) => {

    const { id } = req.params;
    db('Vendors').find(id, (err, record) => {
        if(err) throw err;

        res.json({ success: true, vendor: record._rawJson});

    })
})

module.exports = router;