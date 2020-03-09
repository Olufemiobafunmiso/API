

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");
console.log(process.env.SENDGRID_API_KEY, "|| ", sgMail)

sgMail.send({
    to: 'olufemiobafunmiso@gmail.com',
    from: 'test@example.com',
    subject: 'Password reset',
    html: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
    'http://localhost:3000/validate-password/' + '\n\n' +
    'If you did not request this, please ignore this email and your password will remain unchanged.\n',
    
  }).then(data => console.log(data)).catch(error => console.log("Exception caught: ", error))    ;