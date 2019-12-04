const nodeMailer = require("nodemailer");
const path = require('path');
const Email = require('email-templates');
const keys = require('../config/keys');

const transporter = nodeMailer.createTransport({
    host: keys.MAILER_HOST,
    port: 2525,
    auth: {
        user: keys.MAILER_USERNAME,
        pass: keys.MAILER_PASSWORD
    }
});


const template = new Email({
    views:{
        options: {
            extension: "ejs"
        }
    }
});


const sendItemMail = (destination, userName, item) => {
    template.render(path.join(__dirname, 'templates', 'Item-Info', 'html'), {
        name: userName,
        item: item
    },).then(   (html) => {
        const message = {
            from: 'ecommerce@resonance.com', // Sender address
            to: [destination, 'moisesynfa@gmail.com'],         // List of recipients
            subject: item.name +' | Resonance Catalog', // Subject line
            html
        };
        transporter.sendMail(message, (err, info) => {
            
            if (err) {
              console.error(err)
            } else {
              console.log(info);
            }
        });
    }).catch( (err) => {
        console.error(err);
    })
   
}
module.exports = {
    sendItemMail
}
