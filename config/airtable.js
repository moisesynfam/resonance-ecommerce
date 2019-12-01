const Airtable = require('airtable');
const keys = require('./keys');

Airtable.configure({
    apiKey: keys.AIRTABLE_API_KEY
});

module.exports = base = Airtable.base('appzeUDpZOqRjLPaJ');
