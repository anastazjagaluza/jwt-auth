const nodemailer = require('nodemailer');

// Generate SMTP service account from ethereal.email
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "bb7c90797aa8d8",
          pass: "151b4ebb7c3252"
        }});

    // Message object
    let message = {
        // Comma separated list of recipients
        to: 'nastiah@vp.pl',
        from: "me",
        // Subject of the message
        subject: 'Nodemailer is unicode friendly ✔',

        // plaintext body
        text: 'Hello to myself!',

    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return process.exit(1);
        }

        console.log('Message sent successfully!');
        console.log(nodemailer.getTestMessageUrl(info));

        // only needed when using pooled connections
        transporter.close();
    });